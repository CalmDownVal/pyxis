import type { Intersection } from "./support/types";

export interface Adapter<TNode> extends Extension<TNode> {
	/**
	 * Creates a dummy node occupying a place within the document hierarchy, but is not visually
	 * presented to the user in any way. E.g. a comment node.
	 *
	 * Optionally a hint can be attached to convey the purpose of the anchor.
	 */
	readonly createAnchorNode: (hint?: string) => TNode;

	/**
	 * Creates a native element node by its tag name.
	 */
	readonly createNativeNode: (
		tagName: string,
	) => TNode;

	/**
	 * Appends a node as the last child of the parent.
	 */
	readonly appendNode: (
		node: TNode,
		parent: TNode,
	) => void;

	/**
	 * Inserts a node before the referenced child.
	 */
	readonly insertNode: (
		node: TNode,
		before: TNode,
	) => void;

	/**
	 * Removes a node from the hierarchy.
	 */
	readonly removeNode: (
		node: TNode,
	) => void;
}

export interface Extension<TNode> {
	/**
	 * Sets a named property of the given node.
	 */
	readonly setProp: (
		node: TNode,
		prop: any,
		value: any,
	) => void;
}

export type ExtensionMap = { [E in string]: Extension<any> };

export type ExtensionProps<TNode, TExtensions extends ExtensionMap> =
	Intersection<{
		[E in keyof TExtensions]: E extends string
			? SingleExtensionProps<TNode, TExtensions[E], E>
			: {};
	}[keyof TExtensions]>;

export type SingleExtensionProps<TNode, TExtension, TPrefix extends string> =
	Intersection<
		TExtension extends Extension<TNode>
			? {
				[P in SingleExtensionPropNames<TExtension>]: {
					[_ in `${TPrefix}:${P}`]?: TExtension extends { setProp(node: TNode, prop: P, value: infer V): void } ? V : never
				};
			}[SingleExtensionPropNames<TExtension>]
			: {}
	>;

export type SingleExtensionPropNames<TExtension> =
	TExtension extends { setProp(node: any, prop: infer TAllProps extends string, value: any): void }
		? TAllProps
		: never;
