import { invoke } from "~/support/Callback";

import { getContext, type Context } from "./Context";
import type { DependencyList } from "./Dependency";
import { reportAccess } from "./Reaction";
import { schedule, type UpdateCallback } from "./Scheduler";

/**
 * Pyxis Atom type guard marker.
 */
export const S_ATOM = Symbol.for("pyxis:atom");

/**
 * Holds any single value, managing reactions to its changes. Use the `read`, `write` functions to
 * access its value.
 * @see {@link read}
 * @see {@link write}
 */
export interface Atom<T = unknown> extends DependencyList {
	/**
	 * Pyxis Atom type guard marker.
	 */
	readonly [S_ATOM]: true;

	/**
	 * A fake property kept for TypeScript to properly type-check Atom compatibility.
	 * @deprecated Not to be used! Only holds the value type and does not actually exist at runtime.
	 */
	__valueType?: T;

	/** @internal */
	readonly context: Context;

	/** @internal */
	readonly tracksValue?: boolean;

	/** @internal */
	lastValue?: T;

	/**
	 * The notify callback of this Atom.
	 * @internal
	 */
	notify?: UpdateCallback<[ self: Atom ]>;

	/**
	 * Gets the value of this Atom.
	 * @internal
	 */
	get(): T;

	/**
	 * Sets the value of this Atom. Does nothing if this Atom is readonly.
	 * @returns Boolean indicating whether the value of this Atom changed.
	 * @internal
	 */
	set(value: T): boolean;
}

/**
 * Union of the given type or an Atom of that type. Use the `read`, `write` or `isAtom` functions to
 * interact with such values.
 * @see {@link read}
 * @see {@link write}
 * @see {@link isAtom}
 */
export type MaybeAtom<T> = Atom<T> | T;

/**
 * Creates an empty Atom; i.e. value set to `undefined`.
 */
export function atom<T>(): Atom<T | undefined>;

/**
 * Creates an Atom initialized to the provided value. If the provided value is already an Atom, it
 * is returned as-is.
 * @see {@link isAtom}
 */
export function atom<T>(initialValue: MaybeAtom<T>, context?: Context): Atom<T>;

export function atom<T>(initialValue?: MaybeAtom<T>, context = getContext()) {
	return isAtom(initialValue)
		? initialValue
		: {
			[S_ATOM]: true,
			tracksValue: true,
			context,
			value: initialValue!,
			lastValue: initialValue,
			get: getValue,
			set: setValue,
		} satisfies DirectAtom<T>;
}

interface DirectAtom<T> extends Atom<any> {
	value: T;
}

function getValue<T>(this: DirectAtom<T>) {
	return this.value;
}

function setValue<T>(this: DirectAtom<T>, value: T) {
	if (this.value === value) {
		return false;
	}

	this.value = value;
	return true;
}

/**
 * Atom type guard, checks if the provided input is an Atom.
 */
export function isAtom<T = unknown>(input: MaybeAtom<T>): input is Atom<T> {
	return (
		input !== null &&
		typeof input === "object" &&
		(input as { [S_ATOM]?: true })[S_ATOM] === true
	);
}

/**
 * Checks if the provided input is an Atom and reads its value. Non-atom inputs are returned as-is.
 * @see {@link isAtom}
 * @see {@link write}
 * @see {@link update}
 */
export function read<T>(input: MaybeAtom<T>): T {
	if (isAtom<T>(input)) {
		reportAccess(input);
		return input.get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom, writes its value and returns the new value.
 *
 * Non-atom inputs are never modified in any way. Instead the provided new value is discarded and
 * the input is returned as-is.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link update}
 */
export function write<T>(input: MaybeAtom<T>, value: T): T {
	if (isAtom(input)) {
		if (input.set(value)) {
			schedule(input.context, input.notify ??= {
				fn: notify,
				a0: input,
			});
		}

		return input.get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom, updates its value using the provided transform function
 * and returns the new value.
 *
 * Non-atom inputs are never modified in any way and the input is returned as-is.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link write}
 */
export function update<T>(input: MaybeAtom<T>, transform: (value: T) => T): T {
	if (isAtom(input)) {
		if (input.set(transform(input.get()))) {
			schedule(input.context, input.notify ??= {
				fn: notify,
				a0: input,
			});
		}

		return input.get();
	}

	return input;
}

/**
 * Notifies the dependencies of an Atom.
 * @internal
 */
export function notify(input: Atom) {
	// optimization: when Atom changes multiple times within a single update and ends up with the
	// same value it started with, the notification is skipped
	if (input.tracksValue) {
		const newValue = input.get();
		if (input.lastValue === newValue) {
			return;
		}

		input.lastValue = newValue;
	}

	let current = input.dh;
	while (current) {
		invoke(current);
		current = current.an;
	}
}
