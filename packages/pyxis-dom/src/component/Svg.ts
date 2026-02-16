import { Native, split, type HierarchyNode, type JsxProps, type JsxResult } from "@calmdown/pyxis";

import { SvgAdapter } from "~/adapter/SvgAdapter";
import type { SVGSVGElementProps } from "~/jsx/baked";

// @ts-expect-error fake overload to allow use with JSX
export function Svg(props: JsxProps<SVGSVGElementProps>): JsxResult;

/** @internal */
export function Svg(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
): void;

export function Svg(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
) {
	const group = split(parent, null, SvgAdapter);
	Native(jsx, group, before);
}
