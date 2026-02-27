import { isAtom } from "~/data/Atom";
import type { JsxText } from "~/Component";
import { insert, type HierarchyNode } from "~/Renderer";
import { bind } from "~/data/Dependency";

export function Text<TNode>(
	jsx: NonNullable<JsxText>,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const { adapter } = parent.$ng;
	let node: TNode;

	if (isAtom(jsx)) {
		node = adapter.text("", null);
		bind(parent.$ng, jsx, () => (
			adapter.text(jsx.$get()?.toString() ?? "", node)
		));
	}
	else {
		node = adapter.text(jsx.toString(), null);
	}

	insert(node, null, parent, before);
}
