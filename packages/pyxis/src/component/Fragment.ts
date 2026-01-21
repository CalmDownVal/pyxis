import type { JsxProps, JsxResult } from "~/Component";
import { mountJsx, type MountingGroup } from "~/Renderer";
import type { Nil } from "~/support/types";

// FUTURE: currently TypeScript has a bug causing it to skip checking fragment props in "react-jsx" mode
//         allowing users to supply fragment with invalid children
//         https://github.com/microsoft/TypeScript/issues/62358

export interface FragmentProps {
	children?: Nil<JsxResult>[];
}

/**
 * The built-in Fragment Component wrapping multiple Components.
 */
// @ts-expect-error fake overload to allow use with JSX
export function Fragment(props: JsxProps<FragmentProps>): JsxResult;

/** @internal */
export function Fragment<TNode>(
	group: MountingGroup<TNode>,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
): void;

export function Fragment<TNode>(
	group: MountingGroup<TNode>,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
) {
	mountJsx(group, jsx.children, parent, before, level);
}
