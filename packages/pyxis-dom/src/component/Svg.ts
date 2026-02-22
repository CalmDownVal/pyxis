import { Native, split, type HierarchyNode, type JsxObject, type JsxResult } from "@calmdown/pyxis/core";

import { SvgAdapter } from "~/adapter/SvgAdapter";

// @ts-expect-error fake overload to allow use with JSX
export function Svg(props: JSX.IntrinsicElements["Svg"]): JsxResult;

/** @internal */
export function Svg(
	jsx: JsxObject,
	parent: HierarchyNode<Node>,
	before: Node | null,
): void;

export function Svg(
	jsx: JsxObject,
	parent: HierarchyNode<Node>,
	before: Node | null,
) {
	const group = split(parent, null, SvgAdapter);
	Native(jsx, group, before);
	group.mounted = true;
}
