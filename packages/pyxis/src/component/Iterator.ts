import { component, type DataTemplate } from "~/Component";
import { fork, mount, unmount, type RendererContext } from "~/Renderer";
import { getContext } from "~/data/Context";
import { link } from "~/data/Dependency";
import type { List } from "~/data/List";
import { K_CHANGE, K_CLEAR, K_INSERT, K_REMOVE, type ListDelta } from "~/data/ListDelta";

export interface IteratorProps<T> {
	source: List<T>;
	children: [ DataTemplate<T> ];
}

export const Iterator = component(<T>({ source, children: [ template ] }: IteratorProps<T>) => {
	const parentContext = getContext() as RendererContext;
	const fallbackAnchor = parentContext.adapter.createAnchorNode("/Iterator");

	// render initial items
	const nodes: JSX.Node[] = [];
	let items: RendererContext[] = source.items.map(data => {
		const context = fork(parentContext);
		mount(context, template, data);
		nodes.push(...context.topNodes);
		return context;
	});

	// setup list reactions
	const onDelta = (delta: ListDelta<T>) => {
		const { changes } = delta;
		const cMax = changes.length;
		const iMax = items.length + delta.lengthDelta;
		const newItems = new Array<RendererContext>(iMax);

		let ci = 0;
		let oi = 0;
		let ni = 0;
		let change;
		let item;

		for (; ci < cMax; ci += 1) {
			change = changes[ci];

			// copy unchanged items
			while (ni < change.index) {
				newItems[ni++] = items[oi++];
			}

			// apply change
			switch (change.kind) {
				case K_CHANGE:
					item = (newItems[ni++] = items[oi++]);
					// re-mount the item to refresh the supplied data value
					// FUTURE: could this be handled by reactions? ... this would also enable recycling removed items
					unmount(item);
					mount(item, template, change.item, getAnchor(items, oi, fallbackAnchor));
					break;

				case K_INSERT: {
					item = (newItems[ni++] = fork(parentContext));
					mount(item, template, change.item, getAnchor(items, oi, fallbackAnchor));
					break;
				}

				case K_REMOVE:
					unmount(items[oi++]);
					break;

				case K_CLEAR:
					break;
			}
		}

		// copy the remainder
		while (ni < iMax) {
			newItems[ni++] = items[oi++];
		}

		items = newItems;
	};

	link(parentContext, source, { fn: onDelta });

	// return initial nodes
	nodes.push(fallbackAnchor);
	return nodes;
});

function getAnchor(items: readonly RendererContext[], startIndex: number, fallbackAnchor: JSX.Node): JSX.Node {
	const { length } = items;
	let i = startIndex;
	let item;
	while (i < length) {
		item = items[i];
		if (item.topNodes.length > 0) {
			return item.topNodes[0];
		}

		i += 1;
	}

	return fallbackAnchor;
}
