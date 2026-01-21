import type { Nil } from "~/support/types";
import type { Atom, AtomInternal } from "./Atom";
import { getLifecycle, onUnmounted, type LifecycleInternal } from "./Lifecycle";
import { link, unlink, type Dependency } from "./Dependency";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface ReactionBlock {
	(): (() => void) | void;
}

/** @internal */
export interface Reaction<T> {
	readonly $lifecycle: LifecycleInternal;
	readonly $block: () => T;
	readonly $react: (reaction: this, epoch: number) => void;
	$epoch: number;
	$willUnmount?: boolean;
	$deps?: WeakMap<Atom, ReactionDependency>;
	$resolve?: UpdateCallback<[ reaction: Reaction<T> ]>;
	$dispose?: Nil<() => void>;
}

/** @internal */
export type ReactionDependency = Dependency<[ reaction: Reaction<any>, epoch: number ]>;

/**
 * Creates a Reaction - a block of logic executed each time any of the Atoms accessed within it
 * change. The block is initially executed when the Reaction is created.
 *
 * If a teardown callback is returned, it will be run before the next reaction.
 */
export function reaction(block: ReactionBlock, lifecycle = getLifecycle()) {
	runReaction({
		$lifecycle: lifecycle as LifecycleInternal,
		$block: block,
		$react: scheduleReaction,
		$epoch: 1,
		$willUnmount: false,
	});
}

function scheduleReaction(this: ReactionDependency, reaction: Reaction<ReturnType<ReactionBlock>>, epoch: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the reaction.
	if (reaction.$epoch > epoch) {
		unlink(this);
		return;
	}

	// we're already within a scheduler tick; the reaction will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already scheduled updates and prevents
	// infinite loops when dependency cycles exist
	schedule(reaction.$lifecycle, reaction.$resolve ??= {
		$fn: runReaction,
		$a0: reaction,
	});
}

function runReaction(reaction: Reaction<ReturnType<ReactionBlock>>) {
	reaction.$dispose?.();
	reaction.$dispose = resolve(reaction) as Nil<() => void>;

	if (reaction.$dispose && !reaction.$willUnmount) {
		reaction.$willUnmount = true;
		onUnmounted(reaction.$lifecycle, {
			$fn: disposeReaction,
			$a0: reaction,
		});
	}
}

function disposeReaction(reaction: Reaction<ReturnType<ReactionBlock>>) {
	reaction.$dispose?.();
	reaction.$dispose = null;
}

let $currentReaction: Reaction<any> | null = null;

/**
 * Resolves a Reaction: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TReaction extends Reaction<any>>(reaction: TReaction): TReaction extends Reaction<infer T> ? T : never {
	reaction.$deps ??= new WeakMap();
	reaction.$epoch += 1;
	$currentReaction = reaction;

	try {
		return reaction.$block();
	}
	finally {
		$currentReaction = null;
	}
}

/**
 * Reports an Atom has been accessed. Does nothing if not within a Reaction.
 * @internal
 */
export function reportAccess(atom: AtomInternal<any>) {
	if (!$currentReaction) {
		return;
	}

	let dep = $currentReaction.$deps!.get(atom);
	if (dep) {
		// refresh dependency to the current epoch
		dep.$a1 = $currentReaction.$epoch;
	}
	else {
		link($currentReaction.$lifecycle, atom, dep = {
			$fn: $currentReaction.$react,
			$a0: $currentReaction,
			$a1: $currentReaction.$epoch,
		});

		$currentReaction.$deps!.set(atom, dep);
	}
}
