import type { Nil } from "~/support/types";

import { getLifecycle, onUnmounted, type Lifecycle } from "./Lifecycle";
import { link, unlink, type Dependency, type DependencyList } from "./Dependency";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface EffectBlock {
	(): (() => void) | void;
}

export interface Effect<T> {
	/** @internal */
	readonly $lifecycle: Lifecycle;

	/** @internal */
	readonly $block: () => T;

	/** @internal */
	readonly $react: (effect: this, epoch: number) => void;

	/** @internal */
	$epoch: number;

	/** @internal */
	$willUnmount?: boolean;

	/** @internal */
	$deps?: WeakMap<DependencyList, EffectDependency>;

	/** @internal */
	$resolve?: UpdateCallback<[ effect: Effect<T> ]>;

	/** @internal */
	$dispose?: Nil<() => void>;
}

/** @internal */
export type EffectDependency = Dependency<[ effect: Effect<any>, epoch: number ]>;

/**
 * Creates an Effect - a block of logic executed each time any of the Atoms accessed within it
 * change. The block is initially executed when the Effect is created.
 *
 * If a teardown callback is returned, it will be run before the next effect run.
 */
export function effect(block: EffectBlock, lifecycle = getLifecycle()) {
	runEffect({
		$lifecycle: lifecycle,
		$block: block,
		$react: scheduleEffect,
		$epoch: 1,
	});
}

function scheduleEffect(this: EffectDependency, effect: Effect<ReturnType<EffectBlock>>, epoch: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the effect.
	if (effect.$epoch > epoch) {
		unlink(this);
		return;
	}

	// we're already within a scheduler tick; the effect will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already scheduled updates and prevents
	// infinite loops when dependency cycles exist
	schedule(effect.$lifecycle, effect.$resolve ??= {
		$fn: runEffect,
		$a0: effect,
	});
}

function runEffect(effect: Effect<ReturnType<EffectBlock>>) {
	effect.$dispose?.();
	effect.$dispose = resolve(effect) as Nil<() => void>;

	if (effect.$dispose && !effect.$willUnmount) {
		effect.$willUnmount = true;
		onUnmounted(effect.$lifecycle, {
			$fn: teardownEffect,
			$a0: effect,
		});
	}
}

function teardownEffect(effect: Effect<ReturnType<EffectBlock>>) {
	effect.$dispose?.();
	effect.$dispose = null;
}

let $currentEffect: Effect<any> | null = null;

/**
 * Resolves an Effect: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TEffect extends Effect<any>>(effect: TEffect): TEffect extends Effect<infer T> ? T : never {
	effect.$deps ??= new WeakMap();
	effect.$epoch += 1;
	$currentEffect = effect;

	try {
		return effect.$block();
	}
	finally {
		$currentEffect = null;
	}
}

/**
 * Reports an Atom has been accessed. Does nothing if not within an Effect.
 * @internal
 */
export function reportAccess(atom: DependencyList) {
	if (!$currentEffect) {
		return;
	}

	let dep = $currentEffect.$deps!.get(atom);
	if (dep) {
		// refresh dependency to the current epoch
		dep.$a1 = $currentEffect.$epoch;
	}
	else {
		link($currentEffect.$lifecycle, atom, dep = {
			$fn: $currentEffect.$react,
			$a0: $currentEffect,
			$a1: $currentEffect.$epoch,
		});

		$currentEffect.$deps!.set(atom, dep);
	}
}
