import type { TickFn } from "./data/Scheduler";
import type { ElementsType, Intersection, PropsType } from "./support/types";

export interface Adapter<TNode, TIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Carries information about the available intrinsic elements when using this Adapter.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly __elements?: TIntrinsicElements;

	/**
	 * A function able to schedule a callback to be executed at a later time, e.g. `queueMicrotask`.
	 * The function must guarantee that the callback will be eventually executed.
	 */
	readonly tick: TickFn;

	/**
	 * Creates a dummy node occupying a place within the document hierarchy, but is not visually
	 * presented to the user in any way. E.g. a comment node.
	 *
	 * Optionally a hint can be attached to convey the purpose of the anchor.
	 */
	readonly anchor: (
		hint?: string,
	) => TNode;

	/**
	 * Creates a native (intrinsic) element node by its name.
	 */
	readonly native: (
		name: string,
	) => TNode;

	/**
	 * If provided, inserts the given node before the referenced existing child.
	 * Otherwise appends the node as the last child of the parent.
	 */
	readonly insert: (
		node: TNode,
		parent: TNode,
		before: TNode | null,
	) => void;

	/**
	 * Removes a node from the hierarchy.
	 */
	readonly remove: (
		node: TNode,
	) => void;

	/**
	 * Sets a named property of the given node.
	 */
	readonly set: (
		node: TNode,
		prop: string,
		value: any,
	) => void;
}

export interface Extension<TNode, TExtensionKey extends string = string, TIntrinsicElements extends ElementsType = ElementsType, TExtendedIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Infers prop types to decorate existing types with extensions.
	 * Type only, this call signature does not exist at runtime!
	 */
	(extensionKey: TExtensionKey, intrinsicElements: TIntrinsicElements): TExtendedIntrinsicElements;

	/**
	 * Sets a named extension property of the given node.
	 */
	readonly set: (
		node: TNode,
		prop: string,
		value: any,
	) => void;
}

export type ExtensionsType<TNode> = { [_ in string]?: Extension<TNode> };

export type ExtensionProps<TExtensionKey extends string, TProps extends PropsType> = Intersection<{
	[TPropKey in keyof TProps] -?: TPropKey extends string
		? { readonly [_ in `${TExtensionKey}:${TPropKey}`]?: TProps[TPropKey] }
		: never
}[keyof TProps]>;
