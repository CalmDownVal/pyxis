import { invoke, type ArgsMax2, type ArgsMax5, type Callback } from "~/support/Callback";
import type { Nil } from "~/support/types";

import type { DependencyList } from "./Dependency";
import type { Scheduler } from "./Scheduler";

export interface Context {
	mounted: boolean;
}

/** @internal */
export interface ContextInternal extends Context, DependencyList {
	readonly $scheduler: Scheduler;

	/** The head of the mount callback linked list. */
	$mh?: Nil<MountCallback>;

	/** The tail of the mount callback linked list. */
	$mt?: Nil<MountCallback>;

	/** The head of the unmount callback linked list. */
	$uh?: Nil<UnmountCallback>;

	/** The tail of the unmount callback linked list. */
	$ut?: Nil<UnmountCallback>;
}

/**
 * A mount callback running setup logic for contextual resources.
 * @internal
 */
export interface MountCallback<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	$mn?: Nil<MountCallback>;
}

/**
 * An unmount callback running teardown logic for contextual resources.
 * @internal
 */
export interface UnmountCallback<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	$un?: Nil<UnmountCallback>;
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
export function mounted(block: MountBlock, context = getContext()) {
	onMounted(context as ContextInternal, {
		$fn: runMountedCallback,
		$a0: context,
		$a1: block,
	});
}

function runMountedCallback(context: ContextInternal, block: MountBlock) {
	const dispose = block();
	if (dispose) {
		onUnmounted(context, { $fn: dispose });
	}
}

/** @internal */
export function onMounted(context: ContextInternal, callback: MountCallback) {
	if (context.$mt) {
		context.$mt.$mn = callback;
	}
	else {
		context.$mh = callback;
	}

	context.$mt = callback;
}


/**
 * Registers a callback to run once the current Component is just about to unmount.
 * @see {@link mounted}
 */
export function unmounted(block: UnmountBlock, context = getContext()) {
	onUnmounted(context as ContextInternal, { $fn: block });
}

/** @internal */
export function onUnmounted(context: ContextInternal, callback: UnmountCallback) {
	if (context.$ut) {
		context.$ut.$un = callback;
	}
	else {
		context.$uh = callback;
	}

	context.$ut = callback;
}


let currentContext: Context | null = null;

export function getContext(): Context {
	if (__DEV__ && !currentContext) {
		throw new Error("Cannot get current context. Are you creating an Atom outside of a Component?");
	}

	return currentContext!;
}

export function withContext<TArgs extends ArgsMax5, TReturn>(
	context: Context,
	block: (...args: TArgs) => TReturn,
	...args: TArgs
): TReturn;

export function withContext(
	context: Context,
	block: (...args: ArgsMax5) => any,
	a0: any,
	a1: any,
	a2: any,
	a3: any,
	a4: any,
) {
	const previousContext = currentContext;
	try {
		currentContext = context;
		return block(a0, a1, a2, a3, a4);
	}
	finally {
		currentContext = previousContext;
	}
}

/** @internal */
export function contextMounted(context: ContextInternal) {
	context.mounted = true;

	// run registered mount callbacks
	try {
		let callback = context.$mh;
		let tmp;
		while (callback) {
			tmp = callback.$mn;
			invoke(callback);
			callback.$mn = null;
			callback = tmp;
		}
	}
	finally {
		context.$mh = null;
		context.$mt = null;
	}
}

/** @internal */
export function contextUnmounted(context: ContextInternal) {
	context.mounted = false;

	// unlink all contextual dependencies
	let dep = context.$dh;
	let tmp;
	let atom;

	while (dep) {
		tmp = dep.$cn;
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

		dep.$context = null;
		dep.$cp = null;
		dep.$cn = null;

		dep = tmp;
	}

	context.$dh = null;
	context.$dt = null;

	// run registered unmount callbacks
	try {
		let callback = context.$uh;
		let tmp;
		while (callback) {
			tmp = callback.$un;
			invoke(callback);
			callback.$un = null;
			callback = tmp;
		}
	}
	finally {
		context.$uh = null;
		context.$ut = null;
	}
}
