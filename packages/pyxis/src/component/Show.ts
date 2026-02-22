import { isAtom, peek, read, type MaybeAtom } from "~/data/Atom";
import { effect } from "~/data/Effect";
import { withLifecycle } from "~/data/Lifecycle";
import type { Nil } from "~/support/types";
import type { DataTemplate, JsxChildren, JsxObject, JsxProps, JsxResult } from "~/Component";
import { mount, mountJsx, split, unmount, type HierarchyNode } from "~/Renderer";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: JsxChildren;
}

export interface ShowDataProps<T> {
	when?: MaybeAtom<boolean>;
	data: MaybeAtom<T>;
	children: [ MaybeAtom<Nil<DataTemplate<T>>> ];
}

/**
 * The built-in Show Component dynamically mounting and unmounting a Template
 * based on a reactive condition result.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Show(props: JsxProps<ShowProps>): JsxResult;
export function Show<T>(props: JsxProps<ShowDataProps<T>>): JsxResult;

/** @internal */
export function Show<TNode>(
	jsx: JsxObject,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
): void;

export function Show<TNode>(
	jsx: JsxObject,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const when = jsx.when as MaybeAtom<boolean> | undefined;
	const data = jsx.data;
	const { children } = jsx;
	const isTemplate = children.length === 1 && typeof children[0] === "function";

	if (!isAtom(when) && !isAtom(data)) {
		// static values were given and thus we have nothing to react to
		// -> render synchronously without a sub-group
		if (when !== false) {
			const jsx = isTemplate
				? withLifecycle(parent.$ng, children[0] as DataTemplate<any>, peek(data))
				: children;

			mountJsx(jsx, parent, before);
		}

		return;
	}

	// setup re-render effect
	const group = split(parent);
	effect(() => {
		if (read(when) ?? true) {
			const jsx = isTemplate
				? withLifecycle(parent.$ng, children[0] as DataTemplate<any>, read(data))
				: children;

			mount(group, jsx);
			return () => unmount(group);
		}
	});
}
