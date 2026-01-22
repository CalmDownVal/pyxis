import { isAtom, read } from "~/data/Atom";
import { reaction } from "~/data/Reaction";
import type { JsxResult } from "~/Component";
import { mountJsx, type MountingGroupInternal } from "~/Renderer";

const RE_EXT = /^([^:]+?):(.+)$/;

/** @internal */
// @ts-expect-error this is a unique symbol at runtime
export const S_TAG_NAME: unique symbol = __DEV__ ? Symbol.for("pyxis:tagName") : Symbol();

/** @internal */
export function Native<TNode>(
	group: MountingGroupInternal<TNode>,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
) {
	const { adapter, $extensions } = group;
	const node = adapter.native(jsx[S_TAG_NAME]!);

	let name;
	let match;
	let value;

	// for..in doesn't iterate symbol keys, so we don't need to manually exclude
	// internal symbols (S_COMPONENT or S_TAG_NAME), just children
	for (name in jsx) {
		match = RE_EXT.exec(name);
		value = jsx[name];
		if (match) {
			$extensions[match[1]]?.set(node, match[2], value);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				reaction(() => adapter.set(node, prop, read(atom)));
			}
			else {
				adapter.set(node, name, value);
			}
		}
	}

	// register top level nodes
	if (level === 0) {
		group.top.push(node);
	}

	// mount children first, then this node
	mountJsx(group, jsx.children, node, null, level + 1);
	adapter.insert(node, parent, before);
}
