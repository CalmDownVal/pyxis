import { notifyMounted, notifyUnmounted, onMounted, withLifecycle, type LifecycleInternal, type Lifecycle } from "~/data/Lifecycle";
import { createScheduler } from "~/data/Scheduler";
import type { ElementsType, Mutable, Nil } from "~/support/types";

import type { Adapter, ExtensionsType } from "./Adapter";
import type { DataTemplate, JsxResult, Template } from "./Component";
import { getCurrentContainer, setCurrentContainer, type ContextContainer } from "./data/Context";

// @ts-expect-error this is a unique symbol at runtime
export const S_COMPONENT: unique symbol = __DEV__ ? Symbol.for("pyxis:component") : Symbol();

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


export interface MountingGroup<TNode = any> extends Lifecycle, Hierarchy<typeof K_GROUP> {
	/** the Adapter usable with this MountingGroup */
	readonly adapter: Adapter<TNode>;
}

/** @internal */
export interface MountingGroupInternal<TNode = any> extends MountingGroup<TNode>, HierarchyInternal<typeof K_GROUP, TNode>, LifecycleInternal {
	readonly $extensions: ExtensionsType<TNode>;
	readonly $context?: ContextContainer;

	/** the first node in the unmount linked list */
	$uh?: Nil<HierarchyNodeInternal<TNode>>;

	/** the last node in the unmount linked list */
	$ut?: Nil<HierarchyNodeInternal<TNode>>;
}


export interface NativeNode extends Hierarchy<typeof K_NATIVE> {}

/** @internal */
export interface NativeNodeInternal<TNode = any> extends NativeNode, HierarchyInternal<typeof K_NATIVE, TNode> {}


const K_NATIVE = 1;
const K_GROUP = 2;

export interface Hierarchy<TKind> {
	readonly kind: TKind;
}

/** @internal */
interface HierarchyInternal<TKind, TNode> extends Hierarchy<TKind> {
	/** the ancestor group this node belongs to */
	readonly $pg?: MountingGroupInternal<TNode>;

	/** the immediate hierarchy parent node this node belongs to */
	readonly $ph?: HierarchyNodeInternal<TNode>;

	/** the nearest mounting group (could be self) */
	readonly $ng: MountingGroupInternal<TNode>;

	/** the nearest native node (could be self) to which children should be inserted */
	readonly $nn: TNode;

	/** the first child within this hierarchy */
	$hh?: Nil<HierarchyNodeInternal<TNode>>;

	/** the last child within this hierarchy */
	$ht?: Nil<HierarchyNodeInternal<TNode>>;

	/** the previous sibling within this hierarchy */
	$hp?: Nil<HierarchyNodeInternal<TNode>>;

	/** the next sibling within this hierarchy */
	$hn?: Nil<HierarchyNodeInternal<TNode>>;

	/** the previous node in the unmount linked list */
	$up?: Nil<HierarchyNodeInternal<TNode>>;

	/** the next node in the unmount linked list */
	$un?: Nil<HierarchyNodeInternal<TNode>>;
}

export type HierarchyNode<TNode> = NativeNode | MountingGroup<TNode>;

/** @internal */
export type HierarchyNodeInternal<TNode> = NativeNodeInternal<TNode> | MountingGroupInternal<TNode>;

/** @internal */
export function createRenderer<TNode, TIntrinsicElements extends ElementsType>(
	adapter: Adapter<TNode>,
	extensions: ExtensionsType<TNode>,
): Renderer<TNode, TIntrinsicElements> {
	const group: Mutable<MountingGroupInternal<TNode> & Renderer<TNode, TIntrinsicElements>> = {
		kind: K_GROUP,
		mounted: false,
		adapter: adapter,
		$scheduler: createScheduler(adapter.tick),
		$extensions: extensions,
		$ng: null!,
		$nn: null!,
		unmount: () => unmount(group),
		mount: (root, template) => {
			group.$nn = root;
			mount(group, template, null);
		},
	};

	group.$ng = group;
	return group;
}

/**
 * Creates a sub-group of the provided MountingGroup. Needed whenever a subtree
 * may need to dynamically re-render or unmount entirely.
 */
// @ts-expect-error public API hides internals
export function split<TNode>(
	parent: HierarchyNode<TNode>,
	before?: Nil<HierarchyNode<TNode>>,
	adapter?: Adapter<TNode>,
): MountingGroup<TNode>;

export function split<TNode>(
	parent: HierarchyNodeInternal<TNode>,
	before: HierarchyNodeInternal<TNode> | null = null,
	adapter?: Adapter<TNode>,
) {
	const group = parent.$ng;
	const subGroup: Mutable<MountingGroupInternal<TNode>> = {
		mounted: false,
		adapter: adapter ?? group.adapter,
		$scheduler: group.$scheduler,
		$extensions: group.$extensions,
		$context: getCurrentContainer(),
		$pg: group,
		$ph: parent,
		$ng: null!,
		$nn: parent.$nn,
		kind: K_GROUP,
	};

	subGroup.$ng = subGroup;
	track(subGroup, parent, before);
	return subGroup;
}

/**
 * Adds a MountingGroup to the tracking hierarchy. Necessary to preserve
 * rendering order.
 */
// @ts-expect-error public API hides internals
export function track<TNode>(
	node: HierarchyNode<TNode>,
	parent: HierarchyNode<TNode>,
	before?: Nil<HierarchyNode<TNode>>,
): void;

export function track<TNode>(
	node: HierarchyNodeInternal<TNode>,
	parent: HierarchyNodeInternal<TNode>,
	before: Nil<HierarchyNodeInternal<TNode>> = null,
) {
	// insert into hierarchy before given sibling
	if (before?.$ph === parent) {
		if (before.$hp) {
			node.$hp = before.$hp;
			node.$hn = before;
			before.$hp = node;
			before.$hp.$hn = node;
		}
		else if (parent.$hh === before) {
			parent.$hh = node;
			node.$hp = null;
			node.$hn = before;
			before.$hp = node;
		}
	}
	// append at the tail of the hierarchy
	else {
		if (parent.$ht) {
			parent.$ht.$hn = node;
			node.$hp = parent.$ht;
		}
		else {
			parent.$hh = node;
		}

		parent.$ht = node;
	}

	// append unmount list
	if (parent.kind === K_GROUP) {
		if (parent.$ut) {
			parent.$ut.$un = node;
			node.$up = parent.$ut;
		}
		else {
			parent.$uh = node;
		}

		parent.$ut = node;
	}
}

/**
 * Removes a MountingGroup from the tracking hierarchy. Necessary to call before
 * a group is disposed of to preserve rendering order.
 */
// @ts-expect-error public API hides internals
export function untrack<TNode>(node: MountingGroup<TNode>): void;
export function untrack<TNode>(node: MountingGroupInternal<TNode>) {
	// remove from hierarchy
	if (node.$hp) {
		node.$hp.$hn = node.$hn;
	}
	else if (node.$ph?.$hh === node) {
		node.$ph.$hh = node.$hn;
	}

	if (node.$hn) {
		node.$hn.$hp = node.$hp;
	}
	else if (node.$ph?.$ht === node) {
		node.$ph.$ht = node.$hp;
	}

	node.$hp = null;
	node.$hn = null;

	// remove from group
	if (node.$up) {
		node.$up.$un = node.$un;
	}
	else if (node.$pg?.$uh === node) {
		node.$pg.$uh = node.$un;
	}

	if (node.$un) {
		node.$un.$up = node.$up;
	}
	else if (node.$pg?.$ut === node) {
		node.$pg.$ut = node.$up;
	}

	node.$up = null;
	node.$un = null;
}

/**
 * Inserts a native node and dds it to the tracking hierarchy. Necessary to
 * preserve render order.
 */
// @ts-expect-error public API hides internals
export function insert<TNode>(
	node: TNode,
	jsx: unknown,
	parent: HierarchyNode<TNode>,
	before?: Nil<TNode>,
): HierarchyNode<TNode>;

export function insert<TNode>(
	node: TNode,
	jsx: unknown,
	parent: HierarchyNodeInternal<TNode>,
	before: Nil<TNode> = null,
) {
	const hNode: NativeNodeInternal<TNode> = {
		kind: K_NATIVE,
		$pg: parent.$ng,
		$ph: parent,
		$ng: parent.$ng,
		$nn: node,
	};

	track(hNode, parent);
	mountJsx(jsx, hNode, null);
	parent.$ng.adapter.insert(node, parent.$nn, before);
	return hNode;
}

/**
 * Gets the effective next native sibling node for the given group to anchor
 * against.
 */
// @ts-expect-error public API hides internals
export function getAnchor<TNode>(group: MountingGroup<TNode>): TNode | null;

export function getAnchor<TNode>(group: MountingGroupInternal<TNode>): TNode | null {
	let current = group.$hn; // don't check self, start from next sibling
	let node;
	while (current) {
		if (node = first(current)) {
			return node;
		}

		current = current.$hn;
	}

	// checked all siblings to no avail
	// ... within a node or top level? -> ok to append at the end (null)
	// ... otherwise check upwards
	return !group.$ph || group.$ph?.kind === K_NATIVE
		? null
		: getAnchor(group.$ph);
}

/**
 * Mounts a MountingGroup to the specified location in the node tree. If the
 * group is already mounted, it is moved to the new location without re-mounting
 * its components.
 */
// @ts-expect-error public API hides internals
export function mount<TNode>(
	group: MountingGroup<TNode>,
	template: Template,
	data: null,
	before?: Nil<TNode>,
): void;

export function mount<TNode, TData>(
	group: MountingGroup<TNode>,
	template: DataTemplate<TData>,
	data: TData,
	before?: Nil<TNode>,
): void;

export function mount<TNode>(
	group: MountingGroupInternal<TNode>,
	template: Template | DataTemplate<any>,
	data: any,
	before?: Nil<TNode>,
) {
	if (group.mounted) {
		// already mounted -> move nodes
		reinsertNodes(group, group.$nn, before ?? getAnchor(group));
		return;
	}

	// new render
	const jsx = template(data);
	setCurrentContainer(group.$context);
	withLifecycle(group, mountJsx, jsx, group, before ?? getAnchor(group));

	if (group.$pg?.mounted === false) {
		onMounted(group.$pg, {
			$fn: notifyMounted,
			$a0: group,
		});
	}
	else {
		notifyMounted(group);
	}
}

/**
 * Unmounts a MountingGroup from the node tree. The group remains usable and can
 * be remounted later.
 */
// @ts-expect-error public API hides internals
export function unmount(group: MountingGroup): void;

export function unmount(group: MountingGroupInternal) {
	if (!group.mounted) {
		return;
	}

	notifyUnmounted(group);

	const { adapter } = group;
	let current = group.$uh;
	let tmp;

	while (current) {
		if (current.kind === K_GROUP) {
			unmount(current);
		}
		else {
			adapter.remove(current.$nn);
		}

		tmp = current.$un;
		current.$up = null;
		current.$un = null;
		current = tmp;
	}

	group.$uh = null;
	group.$ut = null;
}

/**
 * Mounts components described by the JsxResult to the specified location in the
 * node tree.
 */
// @ts-expect-error public API hides internals
export function mountJsx<TNode>(
	jsx: unknown,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
): void;

export function mountJsx<TNode>(
	jsx: unknown,
	parent: HierarchyNodeInternal<TNode>,
	before: TNode | null,
) {
	if (jsx === null || jsx === undefined) {
		return;
	}

	if (Array.isArray(jsx)) {
		const { length } = jsx;
		let index = 0;
		for (; index < length; index += 1) {
			mountJsx(jsx[index], parent, before);
		}
	}
	else if (jsx !== null && typeof jsx === "object") {
		(jsx as Partial<NonNullable<JsxResult>>)[S_COMPONENT]?.(jsx as NonNullable<JsxResult>, parent, before);
	}
}

function reinsertNodes<TNode>(group: MountingGroupInternal<TNode>, parent: TNode, before: TNode | null) {
	const { adapter } = group;
	let current = group.$hh;

	while (current) {
		if (current.kind === K_GROUP) {
			if (current.mounted) {
				reinsertNodes(current, parent, before);
			}
		}
		else {
			adapter.insert(current.$nn, parent, before);
		}

		current = current.$hn;
	}
}

function first<TNode>(node: HierarchyNodeInternal<TNode>): TNode | null {
	if (node.kind === K_NATIVE) {
		return node.$nn;
	}

	let current = node.$ht;
	let tmp;
	while (current) {
		if (current.kind === K_GROUP) {
			if (tmp = first(current)) {
				return tmp;
			}
		}
		else {
			return current.$nn;
		}

		current = current.$hn;
	}

	return null;
}
