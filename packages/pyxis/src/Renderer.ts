import type { Adapter, ExtensionsType } from "./Adapter";
import type { Component, DataTemplate, Template } from "./Component";
import { isAtom, read } from "./data/Atom";
import { contextMounted, contextUnmounted, getContext, onMounted, onUnmounted, withContext, type ContextInternal } from "./data/Context";
import { reaction } from "./data/Reaction";
import { createScheduler } from "./data/Scheduler";
import { EMPTY_ARRAY, isNil, wrap } from "./support/common";
import type { ElementsType } from "./support/types";

export interface Renderer<TNode, TIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Carries information about the available intrinsic elements when using this Renderer.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly __elements?: TIntrinsicElements;

	mount: (root: TNode, template: Template) => void;
	unmount: () => void;
}

export type ElementsOf<TRenderer> = TRenderer extends { readonly __elements?: infer TElements }
	? TElements
	: {};

/** @internal */
export interface RendererContext<TNode = any> extends ContextInternal {
	readonly $adapter: Adapter<TNode>;
	readonly $extensions: ExtensionsType<TNode>;
	readonly $parent?: RendererContext<TNode>;
	$topNodes: readonly TNode[];
}

/** @internal */
export function createRenderer<TNode, TIntrinsicElements extends ElementsType>(
	adapter: Adapter<TNode>,
	extensions: ExtensionsType<TNode>,
): Renderer<TNode, TIntrinsicElements> {
	const context: RendererContext<TNode> & Renderer<TNode, TIntrinsicElements> = {
		$scheduler: createScheduler(adapter.tick),
		$adapter: adapter,
		$extensions: extensions,
		$topNodes: EMPTY_ARRAY,
		mounted: false,
		unmount: () => unmount(context),
		mount: (root, template) => {
			const nodes = withContext(context, () => (
				context.$topNodes = wrap(template())
			));

			appendChildren(adapter, root, nodes);
			contextMounted(context);
		},
	};

	return context;
}

const RE_EXT = /^([^:]+):([^:]+)$/;

export function render(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
): JSX.Node;

export function render<TProps extends {}, TReturn>(
	component: Component<TProps, TReturn>,
	props: TProps,
): TReturn;

export function render(
	componentOrTagName: Component<any> | string,
	props: any,
) {
	if (typeof componentOrTagName !== "string") {
		return componentOrTagName(props);
	}

	const context = getContext() as RendererContext;
	const { $adapter: adapter, $extensions: extensions } = context;

	const node = adapter.native(componentOrTagName);

	let name;
	let match;
	let value;
	for (name in props) {
		match = RE_EXT.exec(name);
		value = props[name];
		if (match) {
			extensions[match[1]]?.set(node, match[2], value);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				reaction(() => adapter.set(node, prop, read(atom)), context);
			}
			else {
				adapter.set(node, name, value);
			}
		}
	}

	appendChildren(adapter, node, props.children);
	return node;
}

/**
 * Creates a sub-context of the provided RendererContext. Needed whenever a subtree may need to
 * dynamically re-render or unmount entirely.
 * @internal
 */
export function fork<TNode>(
	context: RendererContext<TNode> = (getContext() as RendererContext<TNode>),
): RendererContext<TNode> {
	const subContext = {
		$scheduler: context.$scheduler,
		$adapter: context.$adapter,
		$extensions: context.$extensions,
		$parent: context,
		$topNodes: [],
		mounted: false,
	};

	onUnmounted(context, {
		$fn: unmount,
		$a0: subContext,
	});

	return subContext;
}

/** @internal */
export function mount<TNode>(context: RendererContext<TNode>, template: Template, data?: undefined, before?: TNode): void;

/** @internal */
export function mount<TNode, TData>(context: RendererContext<TNode>, template: DataTemplate<TData>, data: TData, before?: TNode): void;

export function mount<TNode>(context: RendererContext<TNode>, template: Template | DataTemplate<any>, data?: any, before?: TNode) {
	if (context.mounted) {
		insertChildren(context.$adapter, before!, context.$topNodes);
		return;
	}

	withContext(context, () => {
		context.$topNodes = wrap(template(data))
	});

	if (before && context.$parent!.mounted === true) {
		insertChildren(context.$adapter, before, context.$topNodes);
		contextMounted(context);
	}
	else {
		onMounted(context.$parent!, {
			$fn: contextMounted,
			$a0: context,
		});
	}
}

/** @internal */
export function unmount(context: RendererContext) {
	contextUnmounted(context);
	if (context.$parent?.mounted !== false) {
		// only remove nodes if the parent context is still mounted, otherwise this context's nodes
		// will be removed as part of the tree
		const { $adapter: adapter, $topNodes: topNodes } = context;
		const { length } = topNodes;

		let i = 0;
		for (; i < length; i += 1) {
			adapter.remove(topNodes[i]);
		}
	}

	context.$topNodes = EMPTY_ARRAY;
}

function appendChildren<TNode>(adapter: Adapter<TNode>, root: TNode, children: readonly TNode[]) {
	const { length } = children;
	let child;
	let i = 0;

	for (; i < length; i += 1) {
		child = children[i];
		if (!isNil(child)) {
			if (Array.isArray(child)) {
				appendChildren(adapter, root, child);
			}
			else {
				adapter.append(child, root);
			}
		}
	}
}

function insertChildren<TNode>(adapter: Adapter<TNode>, before: TNode, children: readonly TNode[]) {
	const { length } = children;
	let child;
	let i = 0;

	for (; i < length; i += 1) {
		child = children[i];
		if (!isNil(child)) {
			if (Array.isArray(child)) {
				insertChildren(adapter, before, child);
			}
			else {
				adapter.insert(child, before);
			}
		}
	}
}
