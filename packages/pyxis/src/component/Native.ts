import { isAtom } from "~/data/Atom";
import type { JsxObject } from "~/Component";
import { insert, type HierarchyNode } from "~/Renderer";
import { bind } from "~/data/Dependency";

const RE_EXT = /^([^:]+?):(.+)$/;

/** @internal */
// @ts-expect-error this is a unique symbol at runtime
export const S_TAG_NAME: unique symbol = __DEV__ ? Symbol.for("pyxis:tagName") : Symbol();

export function Native<TNode>(
	jsx: JsxObject,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const group = parent.$ng;
	const { adapter, $extensions } = group;
	const node = adapter.native(jsx[S_TAG_NAME]!);

	let name;
	let match;
	let value;

	// for..in doesn't iterate symbol keys, so we don't need to manually exclude
	// internal symbols (S_COMPONENT, S_TAG_NAME, S_DEV_INFO), just children
	for (name in jsx) {
		match = RE_EXT.exec(name);
		value = jsx[name];
		if (match) {
			$extensions[match[1]]?.set(node, match[2], value, group);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				bind(group, atom, () => (
					adapter.set(node, prop, atom.$get())
				));
			}
			else {
				adapter.set(node, name, value);
			}
		}
	}

	insert(node, jsx.children, parent, before);
}
