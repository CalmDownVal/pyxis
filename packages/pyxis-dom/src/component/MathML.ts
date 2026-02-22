import { Native, split, type HierarchyNode, type JsxObject, type JsxResult } from "@calmdown/pyxis/core";

import { MathMLAdapter } from "~/adapter/MathMLAdapter";

// @ts-expect-error fake overload to allow use with JSX
export function MathML(props: JSX.IntrinsicElements["MathML"]): JsxResult;

/** @internal */
export function MathML(
	jsx: JsxObject,
	parent: HierarchyNode<Node>,
	before: Node | null,
): void;

export function MathML(
	jsx: JsxObject,
	parent: HierarchyNode<Node>,
	before: Node | null,
) {
	const group = split(parent, null, MathMLAdapter);
	Native(jsx, group, before);
	group.mounted = true;
}
