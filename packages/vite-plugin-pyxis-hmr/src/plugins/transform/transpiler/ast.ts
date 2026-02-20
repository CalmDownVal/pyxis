import type * as AST from "@oxc-project/types";

export interface WalkCallbacks {
	enter?: (node: AST.Node) => void;
	leave?: (node: AST.Node) => void;
}

export function walkDown(node: AST.Node, callbacks: WalkCallbacks, parent: AST.Node | null = null) {
	node.parent ??= parent;
	callbacks.enter?.(node);

	let prop;
	let children: any;
	let index;
	let length;
	for (prop in node) {
		if (prop === "parent") {
			continue;
		}

		children = node[prop as keyof AST.Node];
		if (Array.isArray(children)) {
			if ((length = children.length) > 0 && isNode(children[0])) {
				for (index = 0; index < length; index += 1) {
					walkDown(children[index], callbacks, node);
				}
			}
		}
		else if (isNode(children)) {
			walkDown(children, callbacks, node);
		}
	}

	callbacks.leave?.(node);
}

export function walkUp<T>(node: AST.Node | null | undefined, callback: (node: AST.Node) => T | null) {
	let current = node;
	let rval;
	while (current) {
		if ((rval = callback(current)) !== null) {
			return rval;
		}

		current = current.parent;
	}
}

function isNode(value: any): value is AST.Node {
	return (
		value !== null &&
		typeof value === "object" &&
		typeof value.type === "string"
	);
}
