import type { DataTemplate, JsxChildren } from "~/Component";
import { fork, mount, unmount, type RendererContext } from "~/Renderer";
import type { MaybeAtom } from "~/data/Atom";
import { getContext, type Context } from "~/data/Context";
import { link } from "~/data/Dependency";
import type { List, ListInternal } from "~/data/List";
import { K_CHANGE, K_CLEAR, K_INSERT, K_REMOVE, type ListDelta } from "~/data/ListDelta";
import { proxy, type ProxyAtom } from "~/data/ProxyAtom";
import "~/jsx";

export interface RemountIteratorProps<T> {
	source: List<T>;
	proxy?: never; // discriminator
	children: JsxChildren<[ DataTemplate<T> ]>;
}

export interface ProxyIteratorProps<T, P extends readonly (keyof T)[]> {
	source: List<T>;
	proxy?: P;
	children: JsxChildren<[ DataTemplate<{ [K in P[number]]: ProxyAtom<T[K] extends MaybeAtom<infer V> ? V : T[K]> } & { readonly proxied: T }> ]>;
}

interface IteratorItemContext extends RendererContext {
	$data?: any;
}

interface PendingItem<T> {
	readonly $index: number;
	readonly $item: T;
}

export function Iterator<T>(props: RemountIteratorProps<T>): JSX.Node[];
export function Iterator<T, P extends readonly (keyof T)[]>(props: ProxyIteratorProps<T, P>): JSX.Node[];
export function Iterator<T>(props: any) {
	const source: ListInternal<T> = props.source;
	const proxy: readonly PropertyKey[] | undefined = props.proxy;
	const template: DataTemplate<T> = props.children[0];
	const isProxy = proxy !== undefined;
	const parentContext = getContext() as RendererContext;
	const fallbackAnchor = __DEV__
		? parentContext.$adapter.anchor("/Iterator")
		: parentContext.$adapter.anchor();

	// list change reactions
	let items: IteratorItemContext[];
	const onDelta = (delta: ListDelta<T>) => {
		const { $changes: changes } = delta;
		const cMax = changes.length;
		const iMax = items.length + delta.$lengthDelta;
		const newItems = new Array<IteratorItemContext>(iMax);
		const pending: PendingItem<T>[] = [];
		let recycled: IteratorItemContext[] = [];
		let item: IteratorItemContext;
		let inserted = 0;
		let ci = 0;
		let oi = 0;
		let ni = 0;
		let ri = 0;
		let change;

		for (; ci < cMax; ci += 1) {
			change = changes[ci];

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
						mount(item, template, change.$item, getAnchor(items, oi, fallbackAnchor));
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
						item = (newItems[ni++] = fork(parentContext));
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

					mount(item, template, item.$data, getAnchor(items, oi, fallbackAnchor));
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
			mount(item, template, item.$data, getAnchor(newItems, tmp.$index + 1, fallbackAnchor));
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

	link(parentContext, source, { $fn: onDelta });

	// initial render
	const nodes: JSX.Node[] = [];
	items = source.$items.map(data => {
		const item: IteratorItemContext = fork(parentContext);
		item.$data = isProxy ? createProxy(item, data, proxy) : data;
		mount(item, template, item.$data);
		nodes.push(...item.$topNodes);
		return item;
	});

	nodes.push(fallbackAnchor);
	return nodes;
}

function getAnchor(items: readonly RendererContext[], startIndex: number, fallbackAnchor: JSX.Node): JSX.Node {
	const { length } = items;
	let i = startIndex;
	let item;
	while (i < length) {
		item = items[i];
		if (item && item.$topNodes.length > 0) {
			return item.$topNodes[0];
		}

		i += 1;
	}

	return fallbackAnchor;
}

type ProxyObject = { [_ in PropertyKey]?: ProxyAtom<any> };

function createProxy(context: Context, data: any, keys: readonly PropertyKey[]) {
	const obj: ProxyObject = { proxied: data };
	const { length } = keys;
	let i = 0;
	let key;
	for (; i < length; i += 1) {
		key = keys[i];
		obj[key] = proxy(data[key], context);
	}

	return obj;
}

function updateProxy(obj: ProxyObject, data: any, keys: readonly PropertyKey[]) {
	const { length } = keys;
	let i = 0;
	let key;
	for (; i < length; i += 1) {
		key = keys[i];
		obj[key]!.use(data[key]);
	}

	obj.proxied = data;
}
