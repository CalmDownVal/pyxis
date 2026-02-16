export function insert(node: Node, parent: Node, before: Node | null) {
	parent.insertBefore(node, before);
}

export function remove(node: Node) {
	node.parentNode?.removeChild(node);
}

export function setAttr(node: Node, attr: string, value: any) {
	switch (typeof value) {
		case "string":
		case "number":
			(node as HTMLElement).setAttribute(attr, value.toString());
			break;

		case "boolean":
			(node as HTMLElement).toggleAttribute(attr, value);
			break;

		case "object":
			if (value !== null) {
				break;
			}

			// fall through

		case "undefined":
			(node as HTMLElement).removeAttribute(attr);
			break;
	}
}
