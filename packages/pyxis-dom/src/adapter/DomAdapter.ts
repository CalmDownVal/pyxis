import type { Adapter } from "@calmdown/pyxis";

import { PROP_MAP } from "../jsx/mapping";
import type { IntrinsicElements } from "../jsx/baked";
import { insert, remove } from "./common";

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

function set(node: Node, prop: string, value: any) {
	(node as { [_ in string]: any })[(PROP_MAP as { [_ in string]?: string })[prop] ?? prop] = value;
}
