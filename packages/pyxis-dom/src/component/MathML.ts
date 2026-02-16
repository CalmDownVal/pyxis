import { Native, split, type HierarchyNode, type JsxProps, type JsxResult } from "@calmdown/pyxis";

import { MathMLAdapter } from "~/adapter/MathMLAdapter";
import type { MathMLMathElementProps } from "~/jsx/baked";

// @ts-expect-error fake overload to allow use with JSX
export function MathML(props: JsxProps<MathMLMathElementProps>): JsxResult;

/** @internal */
export function MathML(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
): void;

export function MathML(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
) {
	const group = split(parent, null, MathMLAdapter);
	Native(jsx, group, before);
	group.mounted = true;
}
