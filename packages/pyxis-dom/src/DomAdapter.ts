import type { Adapter } from "@calmdown/pyxis";

import { PROP_MAP } from "./props";

export const DomAdapter: Adapter<Node> = {
	createAnchorNode,
	createNativeNode,
	appendNode,
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

function appendNode(node: Node, parent: Node) {
	parent.appendChild(node);
}

function insertNode(node: Node, before: Node) {
	before.parentNode?.insertBefore(node, before);
}

function removeNode(node: Node) {
	node.parentNode?.removeChild(node);
}

function setProp(node: Node, prop: string, value: any) {
	(node as { [_ in string]: any })[(PROP_MAP as { [_ in string]?: string })[prop] ?? prop] = value;
}
