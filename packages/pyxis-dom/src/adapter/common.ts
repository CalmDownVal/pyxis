export function insert(node: Node, parent: Node, before: Node | null) {
	parent.insertBefore(node, before);
}

export function remove(node: Node) {
	node.parentNode?.removeChild(node);
}
