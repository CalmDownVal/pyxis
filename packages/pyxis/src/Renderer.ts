import type { Adapter, ExtensionMap } from "./Adapter";
import type { Component } from "./Component";
import { getContext, withContext, type Context } from "./data/Context";
import { createScheduler, type TickFn } from "./data/Scheduler";
import { EMPTY_OBJECT } from "./support/common";

export interface Renderer<TNode> {
	mount(root: TNode, component: Component): void;
	unmount(): void;
}

/** @internal */
export interface RendererContext<TNode = any, TExtensions extends ExtensionMap = ExtensionMap> extends Context, Renderer<TNode> {
	/** @internal */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly extensions: TExtensions;
}

export interface RendererOptions<TNode, TExtensions extends ExtensionMap = {}> {
	adapter: Adapter<TNode>;
	extensions?: TExtensions;
	tick: TickFn;
}

export function createRenderer<TNode, TExtensions extends ExtensionMap>(
	options: RendererOptions<TNode, TExtensions>,
): Renderer<TNode> {
	const renderer: RendererContext<TNode, TExtensions> = {
		scheduler: createScheduler(options.tick),
		adapter: options.adapter,
		extensions: options.extensions ?? (EMPTY_OBJECT as TExtensions),
		mount,
		unmount,
	};

	return renderer;
}

function mount<TNode>(this: RendererContext<TNode>, root: TNode, component: Component) {
	withContext(this, () => {
		const jsx = component(EMPTY_OBJECT);
		insertChildren(this.adapter, root, [ jsx ]);
	});
}

function unmount(this: RendererContext) {

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
	for (name in props) {
		match = RE_EXT.exec(name);
		if (match) {
			extensions[match[1]]?.setProp(node, match[2], props[name]);
		}
		else if (name !== "children") {
			adapter.setProp(node, name, props[name]);
		}
	}

	insertChildren(adapter, node, props.children);
	return node;
}

function insertChildren<TNode>(adapter: Adapter<TNode>, root: TNode, children: readonly TNode[]) {
	const list = children.slice();
	let count = list.length;
	let child;
	let i = 0;

	while (i < count) {
		child = list[i];
		if (Array.isArray(child)) {
			list.splice(i, 1, ...child);
			count += child.length - 1;
			continue;
		}

		adapter.insertNode(root, child, null);
		i += 1;
	}
}
