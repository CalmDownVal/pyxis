// /**
//  * An identity function that immediately returns the value passed to it.
//  */
// export function identity<T>(value: T): T {
// 	return value;
// }

// /**
//  * A no-op function; Accepts any arguments, does absolutely nothing.
//  */
// export function noop(...args: any): void;
// export function noop() {
// 	// do nothing
// }

export function wrap<T>(input: T | T[]): T[] {
	return Array.isArray(input) ? input : [ input ];
}

/**
 * An empty array.
 */
export const EMPTY_ARRAY = Object.freeze([] as const);

/**
 * An empty object.
 */
export const EMPTY_OBJECT = Object.freeze({} as const);
