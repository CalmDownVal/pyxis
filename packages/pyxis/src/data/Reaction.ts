import type { Atom } from "./Atom";
import { getContext, type Context } from "./Context";
import { link, unlink, type Dependency } from "./Dependency";
import { schedule, type UpdateCallback } from "./Scheduler";

/** @internal */
export interface Reaction<T = void> {
	readonly context: Context;
	readonly block: () => T;
	readonly react: (reaction: this, epoch: number) => void;
	epoch: number;
	deps?: WeakMap<Atom, ReactionDependency>;
	resolve?: UpdateCallback<[ reaction: Reaction ]>; // & MountCallback<[ reaction: Reaction ]>;
}

/** @internal */
export type ReactionDependency = Dependency<[ reaction: Reaction, epoch: number ]>;

/**
 * Creates a Reaction - a block of logic executed each time any of the Atoms accessed within it
 * change. The block is initially executed when the Reaction is created.
 */
export function reaction(block: () => void): void;

/** @internal */
export function reaction(block: () => void, context: Context): void;

export function reaction(block: () => void, context = getContext()) {
	resolve({
		context: getContext(),
		block,
		react: scheduleReaction,
		epoch: 1,
	});

	// version that runs the initial reaction on mount instead of immediately
	// const reaction: Reaction = {
	// 	context,
	// 	block,
	// 	react: scheduleReaction,
	// 	epoch: 0,
	// };

	// onMounted(context, reaction.resolve = {
	// 	fn: resolve,
	// 	a0: reaction,
	// });
}

function scheduleReaction(this: ReactionDependency, reaction: Reaction, epoch: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip any reaction.
	if (reaction.epoch > epoch) {
		unlink(this);
		return;
	}

	schedule(reaction.context, reaction.resolve ??= {
		fn: resolve,
		a0: reaction,
	});
}

let currentReaction: Reaction | null = null;

/**
 * Resolves a Reaction: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TReaction extends Reaction<any>>(reaction: TReaction): TReaction extends Reaction<infer T> ? T : never {
	reaction.deps ??= new WeakMap();
	reaction.epoch += 1;
	currentReaction = reaction;

	try {
		return reaction.block();
	}
	finally {
		currentReaction = null;
	}
}

/**
 * Reports an Atom has been accessed. Does nothing if not within a Reaction.
 * @internal
 */
export function reportAccess(atom: Atom) {
	if (!currentReaction) {
		return;
	}

	let dep = currentReaction.deps!.get(atom);
	if (dep) {
		// refresh dependency to the current epoch
		dep.a1 = currentReaction.epoch;
	}
	else {
		link(currentReaction.context, atom, dep = {
			fn: currentReaction.react,
			a0: currentReaction,
			a1: currentReaction.epoch,
		});

		currentReaction.deps!.set(atom, dep);
	}
}
