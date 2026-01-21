import type { DataTemplate, JsxProps, JsxResult } from "~/Component";
import { split, mount, unmount, type MountingGroup, type MountingGroupInternal } from "~/Renderer";
import type { MaybeAtom } from "~/data/Atom";
import { getLifecycle, type Lifecycle } from "~/data/Lifecycle";
import { link } from "~/data/Dependency";
import type { List, ListInternal } from "~/data/List";
import { K_CHANGE, K_CLEAR, K_INSERT, K_REMOVE, type ListDelta } from "~/data/ListDelta";
import { proxy, type ProxyAtom } from "~/data/ProxyAtom";

export interface RemountIteratorProps<T> {
	source: List<T>;
	proxy?: never; // discriminator
	children: [ DataTemplate<T> ];
}

export interface ProxyIteratorProps<T, P extends readonly (keyof T)[]> {
	source: List<T>;
	proxy?: P;
	children: [ DataTemplate<{ [K in P[number]]: ProxyAtom<T[K] extends MaybeAtom<infer V> ? V : T[K]> } & { readonly proxied: T }> ];
}

interface IteratorItemGroup extends MountingGroup {
	$data?: any;
}

interface PendingItem<T> {
	readonly $index: number;
	readonly $item: T;
}

/**
 * The built-in Iterator Component efficiently rendering collections of items
 * based on updates from a Pyxis `list`.
 */
// @ts-expect-error fake overload to allow use with JSX
export function Iterator<T>(props: JsxProps<RemountIteratorProps<T>>): JsxResult;

export function Iterator<T, P extends readonly (keyof T)[]>(props: JsxProps<ProxyIteratorProps<T, P>>): JsxResult;

/** @internal */
export function Iterator<TNode>(
	group: MountingGroup,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
): void;

export function Iterator<TNode, T>(
	group: MountingGroup,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	// level: number,
) {
	const source = jsx.source as ListInternal<T>;
	const proxy = jsx.proxy as readonly PropertyKey[] | undefined;
	const template = jsx.children[0] as DataTemplate<T>;
	const isProxy = proxy !== undefined;
	const parentGroup = getLifecycle() as MountingGroup;
	const fallbackAnchor = __DEV__
		? group.adapter.anchor("/Iterator")
		: group.adapter.anchor();

	// list change reactions
	let items: IteratorItemGroup[];
	const onDelta = (delta: ListDelta<T>) => {
		const { $changes } = delta;
		const cMax = $changes.length;
		const iMax = items.length + delta.$lengthDelta;
		const newItems = new Array<IteratorItemGroup>(iMax);
		const pending: PendingItem<T>[] = [];
		let recycled: IteratorItemGroup[] = [];
		let item: IteratorItemGroup;
		let inserted = 0;
		let ci = 0;
		let oi = 0;
		let ni = 0;
		let ri = 0;
		let change;

		for (; ci < cMax; ci += 1) {
			change = $changes[ci];

			// copy unchanged items
			while (ni < change.$index) {
				newItems[ni++] = items[oi++];
			}

			// apply change
			switch (change.$kind) {
				case K_CHANGE:
					item = (newItems[ni++] = items[oi++]);
					if (isProxy) {
						updateProxy(item.$data, change.$item, proxy);
					}
					else {
						unmount(item);
						mount(item, template, change.$item, parent, getAnchor(items, oi, fallbackAnchor));
					}

					break;

				case K_INSERT:
					if (ri < recycled.length) {
						// we must be in proxy mode, otherwise the recycled array would be empty
						item = (newItems[ni++] = recycled[ri++]);
						updateProxy(item.$data, change.$item, proxy!);
					}
					else if (!isProxy || inserted < delta.$lengthDelta) {
						// we're either in remount mode, or no more items are available for recycling
						item = (newItems[ni++] = split(parentGroup));
						item.$data = isProxy ? createProxy(item, change.$item, proxy) : change.$item;
						inserted += 1;
					}
					else {
						// we know enough items will be removed later -> add a pending item
						pending.push({
							$index: ni++,
							$item: change.$item,
						});

						break;
					}

					mount(item, template, item.$data, parent, getAnchor(items, oi, fallbackAnchor));
					break;

				case K_REMOVE:
					if (isProxy) {
						recycled.push(items[oi++]);
					}
					else {
						unmount(items[oi++]);
					}

					break;

				case K_CLEAR:
					// clear is always the first change within a delta, has index = -1 and is never
					// followed by removals - thus we can directly recycle the items array, it won't
					// get mutated
					if (isProxy) {
						recycled = items;
					}

					break;
			}
		}

		// fulfill pending items with recycled ones
		const pMax = pending.length;
		let pi = 0;
		let tmp;
		while (pi < pMax) {
			tmp = pending[pi++];
			item = (newItems[tmp.$index] = recycled[ri++]);
			updateProxy(item.$data, tmp.$item, proxy!);
			mount(item, template, item.$data, parent, getAnchor(newItems, tmp.$index + 1, fallbackAnchor));
		}

		// unmount unused
		const rMax = recycled.length;
		while (ri < rMax) {
			unmount(recycled[ri++]);
		}

		// copy remaining unchanged
		while (ni < iMax) {
			newItems[ni++] = items[oi++];
		}

		items = newItems;
	};

	link(parentGroup as MountingGroupInternal, source, { $fn: onDelta });

	// initial render
	items = source.$items.map(data => {
		const item: IteratorItemGroup = split(parentGroup);
		item.$data = isProxy ? createProxy(item, data, proxy) : data;
		mount(item, template, item.$data, parent, before);
		return item;
	});

	group.adapter.insert(fallbackAnchor, parent, before);
}

function getAnchor<TNode>(items: readonly MountingGroup[], startIndex: number, fallbackAnchor: TNode): TNode {
	const { length } = items;
	let index = startIndex;
	let item;
	while (index < length) {
		item = items[index];
		if (item && item.top.length > 0) {
			return item.top[0];
		}

		index += 1;
	}

	return fallbackAnchor;
}

type ProxyObject = { [_ in PropertyKey]?: ProxyAtom<any> };

function createProxy(lifecycle: Lifecycle, data: any, keys: readonly PropertyKey[]) {
	const obj: ProxyObject = { proxied: data };
	const { length } = keys;
	let index = 0;
	let key;
	for (; index < length; index += 1) {
		key = keys[index];
		obj[key] = proxy(data[key], lifecycle);
	}

	return obj;
}

function updateProxy(obj: ProxyObject, data: any, keys: readonly PropertyKey[]) {
	const { length } = keys;
	let index = 0;
	let key;
	for (; index < length; index += 1) {
		key = keys[index];
		obj[key]!.use(data[key]);
	}

	obj.proxied = data;
}
