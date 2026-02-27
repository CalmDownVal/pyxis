import { isAtom, read, type Atom, type MaybeAtom } from "~/data/Atom";
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
	children: [ DataTemplate<T> | Atom<Nil<DataTemplate<T>>> ];
}

const EMPTY_TEMPLATE = () => null;

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
	const hasTemplate = Object.hasOwn(jsx, "data");
	const { children, data } = jsx;
	const template = children[0] as DataTemplate<unknown> | Atom<Nil<DataTemplate<unknown>>>;

	if (!(isAtom(when) || (hasTemplate && (isAtom(data) || isAtom(template))))) {
		// all props are static and thus we have nothing to react to
		// -> render synchronously without a sub-group
		if (when !== false) {
			const subJsx = hasTemplate
				? withLifecycle(parent.$ng, template as DataTemplate<unknown>, data)
				: children;

			mountJsx(subJsx, parent, before);
		}

		return;
	}

	// setup re-render effect
	const group = split(parent);
	effect(() => {
		if (read(when) ?? true) {
			const subJsx = hasTemplate
				? withLifecycle(parent.$ng, read(template) ?? EMPTY_TEMPLATE, read(data))
				: children;

			mount(group, subJsx);
			return () => unmount(group);
		}

		// return undefined;
	});
}
