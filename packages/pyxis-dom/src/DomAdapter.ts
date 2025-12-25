import type { Adapter } from "@calmdown/pyxis";

import { PROP_MAP } from "./props";

export const DomAdapter: Adapter<Node> = {
	createAnchorNode,
	createNativeNode,
	insertNode,
	removeNode,
	setProp,
};

function createAnchorNode(hint = "") {
	return document.createComment(hint);
}

function createNativeNode(tagName: string) {
	return document.createElement(tagName);
}

function insertNode(parent: Node, node: Node, before: Node | null) {
	parent.insertBefore(node, before);
}

function removeNode(parent: Node, node: Node) {
	parent.removeChild(node);
}

function setProp(node: Node, prop: string, value: any) {
	(node as { [_ in string]: any })[(PROP_MAP as { [_ in string]?: string })[prop] ?? prop] = value;
}
