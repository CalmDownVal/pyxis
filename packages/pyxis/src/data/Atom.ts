import { invoke } from "~/support/common";

import { getLifecycle, type Lifecycle } from "./Lifecycle";
import type { DependencyList } from "./Dependency";
import { reportAccess } from "./Effect";
import { schedule, type UpdateCallback } from "./Scheduler";
import type { Nil } from "~/support/types";

/**
 * Pyxis Atom type guard marker.
 */
// @ts-expect-error this is a unique symbol at runtime
export const S_ATOM: unique symbol = __DEV__ ? Symbol.for("pyxis:atom") : Symbol();

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
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly __type?: T;

	/** @internal */
	readonly $lifecycle: Lifecycle;
	readonly $tracksValue?: boolean;
	$lastValue?: T;
	$force?: boolean;

	/**
	 * The notify callback of this Atom.
	 * @internal
	 */
	$notify?: UpdateCallback<[ self: Atom<T> ]>;

	/**
	 * The ID of this Atom, used in development mode.
	 * @internal
	 */
	$devId?: string;

	/**
	 * Gets the value of this Atom.
	 * @internal
	 */
	$get: () => T;

	/**
	 * Sets the value of this Atom. Does nothing if this Atom is readonly.
	 * @returns Boolean indicating whether the value of this Atom changed.
	 * @internal
	 */
	$set: (value: T) => boolean;
}

interface DirectAtom<T> extends Atom<any> {
	$value: T;
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
export function atomOf<T>(): Atom<T | undefined>;

/**
 * Creates an Atom initialized to the provided value. If the provided value is already an Atom, it
 * is returned as-is.
 * @see {@link isAtom}
 */
export function atomOf<T>(initialValue: MaybeAtom<T>, lifecycle?: Lifecycle): Atom<T>;

export function atomOf<T>(initialValue?: MaybeAtom<T>, lifecycle = getLifecycle(), devId?: string) {
	if (isAtom(initialValue)) {
		return initialValue;
	}

	const atom: DirectAtom<T> = {
		[S_ATOM]: true,
		$value: initialValue as T,
		$tracksValue: true,
		$lifecycle: lifecycle,
		$lastValue: initialValue,
		$get: getValue,
		$set: setValue,
	};

	if (__DEV__) {
		atom.$devId = devId;
		globalThis.__PYXIS_HMR__.state.restore(lifecycle, devId, value => {
			atom.$value = value;
		});
	}

	return atom;
}

function getValue<T>(this: DirectAtom<T>) {
	return this.$value;
}

function setValue<T>(this: DirectAtom<T>, value: T) {
	if (this.$value === value) {
		return false;
	}

	this.$value = value;
	if (__DEV__) {
		globalThis.__PYXIS_HMR__.state.preserve(this.$lifecycle, this.$devId, value);
	}

	return true;
}

/**
 * Atom type guard, checks if the provided input is an Atom.
 */
export function isAtom<T = unknown>(input: Nil<MaybeAtom<T>>): input is Atom<T>;
export function isAtom<T = unknown>(input: unknown): input is Atom<T>;
export function isAtom(input: unknown): input is Atom<any> {
	return (
		input !== null &&
		typeof input === "object" &&
		(input as { [S_ATOM]?: true })[S_ATOM] === true
	);
}

/**
 * Checks if the provided input is an Atom and reads its value. Non-atom inputs are returned as-is.
 * Reports read access when inside an effect.
 * @see {@link isAtom}
 * @see {@link write}
 * @see {@link peek}
 * @see {@link update}
 */
export function read<T>(input: MaybeAtom<T>): T;
export function read<T>(input: MaybeAtom<T> | undefined): T | undefined;
export function read<T>(input: MaybeAtom<T> | null): T | null;
export function read<T>(input: Nil<MaybeAtom<T>>): Nil<T>;
export function read<T>(input: MaybeAtom<T>) {
	if (isAtom<T>(input)) {
		reportAccess(input);
		return input.$get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom and reads its value. Non-atom inputs are returned as-is.
 * Does NOT report read access when inside an effect.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link write}
 * @see {@link update}
 */
export function peek<T>(input: MaybeAtom<T>): T;
export function peek<T>(input: MaybeAtom<T> | undefined): T | undefined;
export function peek<T>(input: MaybeAtom<T> | null): T | null;
export function peek<T>(input: Nil<MaybeAtom<T>>): Nil<T>;
export function peek<T>(input: MaybeAtom<T>): T {
	if (isAtom<T>(input)) {
		return input.$get();
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
 * @see {@link write}
 * @see {@link update}
 */
export function write<T>(input: MaybeAtom<T>, value: T, force?: boolean): T;
export function write<T>(input: MaybeAtom<T> | undefined, value: T, force?: boolean): T | undefined;
export function write<T>(input: MaybeAtom<T> | null, value: T, force?: boolean): T | null;
export function write<T>(input: Nil<MaybeAtom<T>>, value: T, force?: boolean): Nil<T>;
export function write<T>(input: MaybeAtom<T>, value: T, force = false): T {
	if (isAtom(input)) {
		if (input.$set(value) || force) {
			input.$force ||= force;
			schedule(input.$lifecycle, input.$notify ??= {
				$fn: notify,
				$a0: input,
			});
		}

		return input.$get();
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
 * @see {@link peek}
 * @see {@link write}
 */
export function update<T>(input: MaybeAtom<T>, transform: (value: T) => T, force?: boolean): T;
export function update<T>(input: MaybeAtom<T> | undefined, transform: (value: T) => T, force?: boolean): T | undefined;
export function update<T>(input: MaybeAtom<T> | null, transform: (value: T) => T, force?: boolean): T | null;
export function update<T>(input: Nil<MaybeAtom<T>>, transform: (value: T) => T, force?: boolean): Nil<T>;
export function update<T>(input: MaybeAtom<T>, transform: (value: T) => T, force = false): T {
	if (isAtom(input)) {
		if (input.$set(transform(input.$get())) || force) {
			input.$force ||= force;
			schedule(input.$lifecycle, input.$notify ??= {
				$fn: notify,
				$a0: input,
			});
		}

		return input.$get();
	}

	return input;
}

/**
 * Notifies the dependencies of an Atom.
 * @internal
 */
export function notify<T>(input: Atom<T>) {
	// optimization: when Atom changes multiple times within a single update and ends up with the
	// same value it started with, the notification is skipped
	if (input.$tracksValue) {
		const newValue = input.$get();
		if (input.$lastValue === newValue && !input.$force) {
			return;
		}

		input.$lastValue = newValue;
		input.$force = false;
	}

	let current = input.$dh;
	while (current) {
		invoke(current);
		current = current.$an;
	}
}
