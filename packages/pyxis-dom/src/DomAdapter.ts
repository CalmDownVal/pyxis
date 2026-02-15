import type { Adapter } from "@calmdown/pyxis";

import { PROP_MAP } from "./jsx/mapping";
import type { IntrinsicElements } from "./jsx/baked";

export const DomAdapter: Adapter<Node, IntrinsicElements> = {
	native,
	insert,
	remove,
	set,
	tick: queueMicrotask,
};

function native(tagName: string) {
	return document.createElement(tagName);
}

function insert(node: Node, parent: Node, before: Node | null) {
	parent.insertBefore(node, before);
}

function remove(node: Node) {
	node.parentNode?.removeChild(node);
}

function set(node: Node, prop: string, value: any) {
	(node as { [_ in string]: any })[(PROP_MAP as { [_ in string]?: string })[prop] ?? prop] = value;
}
