import type { ArgsMax2, Callback, Nil } from "./types";

export const EMPTY_ARRAY = Object.freeze([] as const);

/**
 * Invokes a Callback passing stored arguments and forwarding the return value.
 * @internal
 */
export function invoke<TArgs extends ArgsMax2, TReturn>(callback: Callback<TArgs, TReturn>): TReturn;
export function invoke(callback: Callback<ArgsMax2>) {
	return callback.$fn(
		callback.$a0,
		callback.$a1,
	);
}

/**
 * Invokes an array of Callback passing stored arguments. The array can be mutated during iteration.
 * @internal
 */
export function invokeAll(source: Nil<readonly Callback[]>) {
	if (!source) {
		return;
	}

	// re-read length on each cycle, as it may increase
	let index = 0;
	for (; index < source.length; index += 1) {
		invoke(source[index]);
	}
}
