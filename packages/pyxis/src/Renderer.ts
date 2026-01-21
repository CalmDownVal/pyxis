import type { Adapter, ExtensionsType } from "./Adapter";
import type { DataTemplate, JsxResult, Template } from "./Component";
import { notifyMounted, notifyUnmounted, getLifecycle, onMounted, onUnmounted, withLifecycle, type LifecycleInternal, type Lifecycle } from "./data/Lifecycle";
import { createScheduler } from "./data/Scheduler";
import type { ElementsType } from "./support/types";

/** @internal */
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

export interface MountingGroup<TNode = any> extends Lifecycle {
	/** the Adapter usable with this MountingGroup */
	readonly adapter: Adapter<TNode>;
	/** the top-level nodes of this MountingGroup */
	top: TNode[];
}

/** @internal */
export interface MountingGroupInternal<TNode = any> extends MountingGroup<TNode>, LifecycleInternal {
	readonly $extensions: ExtensionsType<TNode>;
	readonly $parent?: MountingGroupInternal<TNode>;
}

/** @internal */
export function createRenderer<TNode, TIntrinsicElements extends ElementsType>(
	adapter: Adapter<TNode>,
	extensions: ExtensionsType<TNode>,
): Renderer<TNode, TIntrinsicElements> {
	const group: MountingGroupInternal<TNode> & Renderer<TNode, TIntrinsicElements> = {
		mounted: false,
		adapter: adapter,
		top: [],
		$scheduler: createScheduler(adapter.tick),
		$extensions: extensions,
		unmount: () => unmount(group),
		mount: (root, template) => {
			const jsx = template();
			withLifecycle(group, mountJsx, group, jsx, root, null, 0);
			insertNodes(group, root, null);
			notifyMounted(group);
		},
	};

	return group;
}


/**
 * Creates a sub-group of the provided MountingGroup. Needed whenever a subtree
 * may need to dynamically re-render or unmount entirely.
 */
// @ts-expect-error public API hides internals
export function split<TNode>(
	parentGroup?: MountingGroup<TNode>,
): MountingGroup<TNode>;

export function split<TNode>(
	parentGroup: MountingGroupInternal<TNode> = (getLifecycle() as MountingGroupInternal<TNode>),
): MountingGroup<TNode> {
	const subGroup = {
		mounted: false,
		adapter: parentGroup.adapter,
		top: [],
		$scheduler: parentGroup.$scheduler,
		$extensions: parentGroup.$extensions,
		$parent: parentGroup,
	};

	onUnmounted(parentGroup, {
		$fn: unmount,
		$a0: subGroup,
	});

	return subGroup;
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
	data: undefined,
	parent: TNode,
	before: TNode | null,
): void;

export function mount<TNode, TData>(
	group: MountingGroup<TNode>,
	template: DataTemplate<TData>,
	data: TData,
	parent: TNode,
	before: TNode | null,
): void;

/** @internal */
export function mount<TNode>(
	group: MountingGroupInternal<TNode>,
	template: Template,
	data: undefined,
	parent: TNode,
	before: TNode | null,
): void;

/** @internal */
export function mount<TNode, TData>(
	group: MountingGroupInternal<TNode>,
	template: DataTemplate<TData>,
	data: TData,
	parent: TNode,
	before: TNode | null,
): void;

export function mount<TNode>(
	group: MountingGroupInternal<TNode>,
	template: Template | DataTemplate<any>,
	data: any,
	parent: TNode,
	before: TNode | null,
) {
	if (group.mounted) {
		if (before !== null) {
			// already mounted, but before specified -> move nodes
			insertNodes(group, parent, before);
		}

		return;
	}

	// new render
	const jsx = template(data);
	withLifecycle(group, mountJsx, group, jsx, parent, before, 0);

	if (group.$parent?.mounted === false) {
		onMounted(group.$parent, {
			$fn: notifyMounted,
			$a0: group,
		});
	}
	else {
		insertNodes(group, parent, before);
		notifyMounted(group);
	}
}


/**
 * Unmounts a MountingGroup from the node tree.
 */
// @ts-expect-error public API hides internals
export function unmount(group: MountingGroup): void;

export function unmount(group: MountingGroupInternal) {
	notifyUnmounted(group);
	if (group.$parent?.mounted !== false) {
		// only remove nodes if the parent group is still mounted, otherwise it
		// is safe to assume this group's nodes were already removed with it
		const { adapter, top } = group;
		const { length } = top;
		let index = 0;
		for (; index < length; index += 1) {
			adapter.remove(top[index]);
		}
	}

	group.top = [];
}


/**
 * Mounts components described by the JsxResult to the specified location in the
 * node tree.
 */
export function mountJsx<TNode>(
	group: MountingGroup<TNode>,
	jsx: unknown,
	parent: TNode,
	before: TNode | null,
	level: number,
) {
	if (Array.isArray(jsx)) {
		const { length } = jsx;
		let index = 0;
		let tmp;
		for (; index < length; index += 1) {
			tmp = jsx[index];
			if (tmp !== null && typeof tmp === "object") {
				(tmp as Partial<JsxResult>)[S_COMPONENT]?.(group, tmp as JsxResult, parent, before, level);
			}
		}
	}
	else if (jsx !== null && typeof jsx === "object") {
		(jsx as Partial<JsxResult>)[S_COMPONENT]?.(group, jsx as JsxResult, parent, before, level);
	}
}

function insertNodes<TNode>(group: MountingGroup<TNode>, parent: TNode, before: TNode | null) {
	const { adapter, top } = group;
	const { length } = top;
	let index = 0;
	for (; index < length; index += 1) {
		adapter.insert(top[index], parent, before);
	}
}

