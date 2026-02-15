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

/**
 * A type describing any map of intrinsic elements and their props.
 */
export type ElementsType = { readonly [_ in string]?: any };

/**
 * A type describing any props of a Component.
 */
export type PropsType = { readonly [_ in string]?: any };

/**
 * A symbol to include in props typings containing the original Node type.
 * @deprecated **Type only, does not exist at runtime!**
 */
export declare const S_NODE_TYPE: unique symbol;

/**
 * Infers the specific Node type from its props typings.
 */
export type NodeType<P> = P extends { readonly [S_NODE_TYPE]?: infer N } ? N : unknown;

/**
 * Infers a mutable object from a given immutable one.
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/**
 * A tuple of up to 5 arguments.
 */
export type ArgsMax5<A0 = any, A1 = any, A2 = any, A3 = any, A4 = any> = [ a0?: A0, a1?: A1, a2?: A2, a3?: A3, a4?: A4 ];

/**
 * A tuple of up to 2 arguments.
 * @internal
 */
export type ArgsMax2<A0 = any, A1 = any> = [ a0?: A0, a1?: A1 ];

/**
 * Describes a callback with stored values for its arguments.
 * @internal
 */
export interface Callback<TArgs extends ArgsMax2 = ArgsMax2, TReturn = void> {
	$fn: (this: any, ...args: TArgs) => TReturn;
	$a0?: TArgs[0];
	$a1?: TArgs[1];
}
