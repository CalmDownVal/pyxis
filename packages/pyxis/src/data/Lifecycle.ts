import { invokeAll } from "~/support/common";
import type { ArgsMax5, Callback, Nil } from "~/support/types";

import type { DependencyList } from "./Dependency";
import type { Scheduler } from "./Scheduler";

export interface Lifecycle {
	/** whether this Lifecycle is currently mounted or not */
	mounted: boolean;
}

/** @internal */
export interface LifecycleInternal extends Lifecycle, DependencyList {
	readonly $scheduler: Scheduler;
	$onMount?: Nil<Callback[]>;
	$onUnmount?: Nil<Callback[]>;
}

export interface MountBlock {
	(): (() => void) | void;
}

export interface UnmountBlock {
	(): void;
}


/**
 * Registers a callback to run just after the current Component has mounted.
 *
 * If a teardown callback is returned, it will be run just before the Component unmounts.
 * @see {@link unmounted}
 */
export function mounted(block: MountBlock, lifecycle = getLifecycle()) {
	onMounted(lifecycle as LifecycleInternal, {
		$fn: invokeMountedCallback,
		$a0: lifecycle,
		$a1: block,
	});
}

/** @internal */
export function onMounted(lifecycle: LifecycleInternal, callback: Callback) {
	(lifecycle.$onMount ??= []).push(callback);
}

function invokeMountedCallback(lifecycle: LifecycleInternal, block: MountBlock) {
	const dispose = block();
	if (dispose) {
		onUnmounted(lifecycle, { $fn: dispose });
	}
}


/**
 * Registers a callback to run once the current Component is just about to unmount.
 * @see {@link mounted}
 */
export function unmounted(block: UnmountBlock, lifecycle = getLifecycle()) {
	onUnmounted(lifecycle as LifecycleInternal, { $fn: block });
}

/** @internal */
export function onUnmounted(lifecycle: LifecycleInternal, callback: Callback) {
	(lifecycle.$onUnmount ??= []).push(callback);
}


let currentLifecycle: Lifecycle | null = null;

export function getLifecycle(): Lifecycle {
	if (__DEV__ && !currentLifecycle) {
		throw new Error("Cannot get current lifecycle. Are you creating an Atom outside of a Component?");
	}

	return currentLifecycle!;
}

export function withLifecycle<TArgs extends ArgsMax5, TReturn>(
	lifecycle: Lifecycle,
	block: (...args: TArgs) => TReturn,
	...args: TArgs
): TReturn;

export function withLifecycle(
	lifecycle: Lifecycle,
	block: (...args: ArgsMax5) => any,
	a0: any,
	a1: any,
	a2: any,
	a3: any,
	a4: any,
) {
	const previousLifecycle = currentLifecycle;
	try {
		currentLifecycle = lifecycle;
		return block(a0, a1, a2, a3, a4);
	}
	finally {
		currentLifecycle = previousLifecycle;
	}
}

/** @internal */
export function notifyMounted(lifecycle: LifecycleInternal) {
	lifecycle.mounted = true;
	invokeAll(lifecycle.$onMount);
	lifecycle.$onMount = null;
}

/** @internal */
export function notifyUnmounted(lifecycle: LifecycleInternal) {
	lifecycle.mounted = false;

	// unlink all contextual dependencies
	let dep = lifecycle.$dh;
	let tmp;
	let atom;

	while (dep) {
		tmp = dep.$ln;
		atom = dep.$target!;

		if (dep.$ap) {
			dep.$ap.$an = dep.$an;
		}
		else if (atom.$dh === dep) {
			atom.$dh = dep.$an;
		}

		if (dep.$an) {
			dep.$an.$ap = dep.$ap;
		}
		else if (atom.$dt === dep) {
			atom.$dt = dep.$ap;
		}

		dep.$target = null;
		dep.$ap = null;
		dep.$an = null;

		dep.$lifecycle = null;
		dep.$lp = null;
		dep.$ln = null;

		dep = tmp;
	}

	lifecycle.$dh = null;
	lifecycle.$dt = null;

	// run registered unmount callbacks
	invokeAll(lifecycle.$onUnmount);
	lifecycle.$onUnmount = null;
}
