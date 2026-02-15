import { isAtom, read, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";
import type { Nil } from "~/support/types";
import type { DataTemplate, JsxProps, JsxResult, Template } from "~/Component";
import { mount, mountJsx, split, unmount, type HierarchyNodeInternal } from "~/Renderer";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: [ MaybeAtom<Nil<Template>> ];
}

export interface ShowDataProps<T> {
	when?: MaybeAtom<boolean>;
	data: MaybeAtom<T>;
	children: [ MaybeAtom<Nil<DataTemplate<T>>> ];
}

const EMPTY_TEMPLATE: Template = () => null;

/**
 * The built-in Show Component dynamically mounting and unmounting a Template
 * based on a reactive condition result.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Show(props: JsxProps<ShowProps>): JsxResult;
export function Show<T>(props: JsxProps<ShowDataProps<T>>): JsxResult;

/** @internal */
export function Show<TNode>(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNodeInternal<TNode>,
	before: TNode | null,
): void;

export function Show<TNode>(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNodeInternal<TNode>,
	before: TNode | null,
) {
	const when = jsx.when as MaybeAtom<boolean> | undefined;
	const data = jsx.data;
	const template = jsx.children[0] as MaybeAtom<Nil<DataTemplate<unknown>>>;
	if (!isAtom(when) && !isAtom(template) && !isAtom(data)) {
		// static values were given and thus we have nothing to react to
		// -> render synchronously without a sub-group
		if (when !== false) {
			mountJsx(template?.(data), parent, before);
		}

		return;
	}

	// setup re-render reaction
	const group = split(parent);
	let isShown: boolean | undefined;
	reaction(() => {
		const shouldShow = read(when) ?? true;
		if (shouldShow && isShown !== true) {
			mount(group, read(template) ?? EMPTY_TEMPLATE, read(data));
		}
		else if (!shouldShow && isShown !== false) {
			unmount(group);
		}

		isShown = shouldShow;
	});
}
