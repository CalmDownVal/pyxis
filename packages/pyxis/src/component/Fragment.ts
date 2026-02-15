import type { Nil } from "~/support/types";
import type { JsxProps, JsxResult } from "~/Component";
import { mountJsx, type HierarchyNodeInternal } from "~/Renderer";

// FUTURE: currently TypeScript has a bug causing it to skip checking fragment props in "react-jsx" mode
//         allowing users to supply fragment with invalid children
//         https://github.com/microsoft/TypeScript/issues/62358

export interface FragmentProps {
	children?: Nil<JsxResult>[];
}

/**
 * The built-in Fragment Component wrapping multiple Components.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Fragment(props: JsxProps<FragmentProps>): JsxResult;

/** @internal */
export function Fragment<TNode>(
	jsx: JsxResult,
	parent: HierarchyNodeInternal<TNode>,
	before: TNode | null,
): void;

export function Fragment<TNode>(
	jsx: JsxResult,
	parent: HierarchyNodeInternal<TNode>,
	before: TNode | null,
) {
	mountJsx(jsx.children, parent, before);
}
