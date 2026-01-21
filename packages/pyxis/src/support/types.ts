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
