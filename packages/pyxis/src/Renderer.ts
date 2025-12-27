import type { Adapter, ExtensionMap } from "./Adapter";
import type { Component, Template } from "./Component";
import { isAtom, read } from "./data/Atom";
import { contextMounted, contextUnmounted, getContext, withContext, type Context } from "./data/Context";
import { reaction } from "./data/Reaction";
import { createScheduler, type TickFn } from "./data/Scheduler";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "./support/common";

export interface Renderer<TNode> {
	mount(root: TNode, template: Template): void;
	unmount(): void;
}

/** @internal */
export interface RendererContext<TNode = any, TExtensions extends ExtensionMap = ExtensionMap> extends Context {
	readonly adapter: Adapter<TNode>;
	readonly extensions: TExtensions;
	topNodes: readonly TNode[];
}

export interface RendererOptions<TNode, TExtensions extends ExtensionMap = {}> {
	adapter: Adapter<TNode>;
	extensions?: TExtensions;
	tick: TickFn;
}

export function createRenderer<TNode, TExtensions extends ExtensionMap>(
	options: RendererOptions<TNode, TExtensions>,
): Renderer<TNode> {
	const context: RendererContext<TNode, TExtensions> & Renderer<TNode> = {
		scheduler: createScheduler(options.tick),
		adapter: options.adapter,
		extensions: options.extensions ?? (EMPTY_OBJECT as TExtensions),
		topNodes: EMPTY_ARRAY,
		unmount: () => unmount(context),
		mount: (root, template) => {
			withContext(context, () => {
				const jsx = template();
				const nodes = Array.isArray(jsx) ? jsx : [ jsx ];
				appendChildren(options.adapter, root, nodes);
				context.topNodes = nodes;
			});

			contextMounted(context);
		},
	};

	return context;
}

const RE_EXT = /^([^:]+):([^:]+)$/;

export function render(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
): any;

export function render<TProps extends {}>(
	component: Component<TProps>,
	props: TProps,
): any;

export function render(
	componentOrTagName: Component<any> | string,
	props: any,
) {
	if (typeof componentOrTagName !== "string") {
		return componentOrTagName(props);
	}

	const context = getContext() as RendererContext;
	const { adapter, extensions } = context;

	const node = adapter.createNativeNode(componentOrTagName);

	let name;
	let match;
	let value;
	for (name in props) {
		match = RE_EXT.exec(name);
		value = props[name];
		if (match) {
			extensions[match[1]]?.setProp(node, match[2], value);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				reaction(() => adapter.setProp(node, prop, read(atom)), context);
			}
			else {
				adapter.setProp(node, name, value);
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
export function fork<TNode, TExtensions extends ExtensionMap>(
	context: RendererContext<TNode, TExtensions> = (getContext() as RendererContext<TNode, TExtensions>),
): RendererContext<TNode, TExtensions> {
	return {
		scheduler: context.scheduler,
		adapter: context.adapter,
		extensions: context.extensions,
		topNodes: [],
	};
}

/** @internal */
export function mount<TNode>(context: RendererContext<TNode>, template: Template, before: TNode) {
	withContext(context, () => {
		const jsx = template();
		const nodes = Array.isArray(jsx) ? jsx : [ jsx ];
		insertChildren(context.adapter, before, nodes);
		context.topNodes = nodes;
	});

	contextMounted(context);
}

/** @internal */
export function unmount(context: RendererContext) {
	contextUnmounted(context);

	const { adapter, topNodes } = context;
	const { length } = topNodes;

	let i = 0;
	for (; i < length; i += 1) {
		adapter.removeNode(topNodes[i]);
	}

	context.topNodes = EMPTY_ARRAY;
}

function appendChildren<TNode>(adapter: Adapter<TNode>, root: TNode, children: readonly TNode[]) {
	const { length } = children;
	let child;
	let i = 0;

	for (; i < length; i += 1) {
		child = children[i];
		if (child !== null && child !== undefined) {
			if (Array.isArray(child)) {
				appendChildren(adapter, root, child);
			}
			else {
				adapter.appendNode(child, root);
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
		if (child !== null && child !== undefined) {
			if (Array.isArray(child)) {
				insertChildren(adapter, before, child);
			}
			else if (child) {
				adapter.insertNode(child, before);
			}
		}
	}
}
