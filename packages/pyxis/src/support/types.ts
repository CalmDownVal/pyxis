/**
 * Puts `T` into a union with `null` and `undefined`.
 */
export type Nil<T> = T | null | undefined;

/**
 * Converts the union `U` into an intersection type.
 */
export type Intersection<U, TEmpty = {}> = [ U ] extends [ never ]
	? TEmpty
	: (U extends any ? (u: U) => void : never) extends (i: infer I) => void ? I : never;
