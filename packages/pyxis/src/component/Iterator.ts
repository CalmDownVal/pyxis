import type { MaybeAtom } from "~/data/Atom";
import type { Lifecycle } from "~/data/Lifecycle";
import { link } from "~/data/Dependency";
import type { List } from "~/data/List";
import { K_CHANGE, K_CLEAR, K_INSERT, K_REMOVE } from "~/data/ListDelta";
import { proxy, type ProxyAtom } from "~/data/ProxyAtom";
import type { DataTemplate, JsxProps, JsxResult } from "~/Component";
import { mount, split, track, unmount, untrack, type HierarchyNode, type MountingGroup } from "~/Renderer";

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

interface IteratorItemGroup<TNode> extends MountingGroup<TNode> {
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
// @ts-expect-error fake overload to enable use with JSX
export function Iterator<T>(props: JsxProps<RemountIteratorProps<T>>): JsxResult;

export function Iterator<T, P extends readonly (keyof T)[]>(props: JsxProps<ProxyIteratorProps<T, P>>): JsxResult;

/** @internal */
export function Iterator<TNode>(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
): void;

export function Iterator<TNode, T>(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const source = jsx.source as List<T>;
	const proxy = jsx.proxy as readonly PropertyKey[] | undefined;
	const isProxy = proxy !== undefined;
	const template = jsx.children[0] as DataTemplate<T>;

	const group = split(parent) as MountingGroup<TNode>;
	group.mounted = true;

	// list change reactions
	let items: IteratorItemGroup<TNode>[];
	const onDelta = () => {
		const delta = source.$delta!;
		const { $changes } = delta;
		const cMax = $changes.length;
		const iMax = items.length + delta.$lengthDelta;
		const newItems = new Array<IteratorItemGroup<TNode>>(iMax);
		const pending: PendingItem<T>[] = [];
		let recycled: IteratorItemGroup<TNode>[] = [];
		let item: IteratorItemGroup<TNode>;
		let inserted = 0;
		let ci = 0; // change index
		let oi = 0; // old items index
		let ni = 0; // new items index
		let change;
		let tmp;

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
						// no need to untrack and re-track, position doesn't change
						unmount(item);
						mount(item, template, change.$item);
					}

					break;

				case K_INSERT:
					if (!isProxy || inserted < delta.$lengthDelta) {
						// we're either in remount mode, or no more items are available for recycling
						item = (newItems[ni++] = split(group, items[oi]) as IteratorItemGroup<TNode>);
						item.$data = isProxy ? createProxy(item, change.$item, proxy) : change.$item;
						inserted += 1;
					}
					else {
						// we know enough items will be removed -> add a pending item
						pending.push({
							$index: ni++,
							$item: change.$item,
						});

						break;
					}

					mount(item, template, item.$data);
					break;

				case K_REMOVE:
					tmp = items[oi++];
					if (isProxy) {
						recycled.push(tmp);
					}
					else {
						unmount(tmp);
					}

					untrack(tmp);
					break;

				case K_CLEAR:
					// clear is always the first change within a delta, has index = -1 and is never
					// followed by removals - thus we can directly recycle the items array, it won't
					// get mutated
					if (isProxy) {
						recycled = items;
						recycled.forEach(untrack);
					}

					break;
			}
		}

		// copy remaining unchanged
		while (ni < iMax) {
			newItems[ni++] = items[oi++];
		}

		// fulfill pending items with recycled ones
		let pi = pending.length - 1; // pending items index
		let ri = recycled.length - 1; // recycled items index
		while (pi >= 0) {
			tmp = pending[pi--];
			item = (newItems[tmp.$index] = recycled[ri--]);
			updateProxy(item.$data, tmp.$item, proxy!);
			track(item, group, newItems[tmp.$index + 1]);
			mount(item, template, item.$data);
		}

		// unmount unused
		while (ri >= 0) {
			tmp = recycled[ri--];
			unmount(tmp);
			untrack(tmp);
		}

		items = newItems;
	};

	link(group, source, { $fn: onDelta });

	// initial render
	items = source.$items.map(data => {
		const item = split(group) as IteratorItemGroup<TNode>;
		item.$data = isProxy ? createProxy(item, data, proxy) : data;
		mount(item, template, item.$data, before);
		return item;
	});
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
