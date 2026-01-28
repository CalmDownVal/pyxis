import { isAtom, read, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";
import type { Nil } from "~/support/types";
import type { JsxProps, JsxResult, Template } from "~/Component";
import { split, mount, unmount, type MountingGroup, mountJsx } from "~/Renderer";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: [ MaybeAtom<Nil<Template>> ];
}

const EMPTY_TEMPLATE: Template = () => null;

/**
 * The built-in Show Component dynamically mounting and unmounting a Template
 * based on a reactive condition result.
 */
// @ts-expect-error fake overload to allow use with JSX
export function Show(props: JsxProps<ShowProps>): JsxResult;

/** @internal */
export function Show<TNode>(
	group: MountingGroup,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
): void;

export function Show<TNode>(
	group: MountingGroup,
	jsx: JsxResult,
	parent: TNode,
	before: TNode | null,
	level: number,
) {
	const when = jsx.when as MaybeAtom<boolean> | undefined;
	const template = jsx.children[0] as MaybeAtom<Nil<Template>>;
	if (!isAtom(when) && !isAtom(template)) {
		// static values were given and thus we have nothing to react to
		// -> render synchronously without a sub-group
		if (when !== false) {
			mountJsx(group, template?.() ?? EMPTY_TEMPLATE, parent, before, level);
		}

		return;
	}

	const subGroup = split(group);
	const anchor = __DEV__
		? subGroup.adapter.anchor("/Show")
		: subGroup.adapter.anchor();

	let isShown = read(when) ?? true;
	reaction(() => {
		const shouldShow = read(when) ?? true;
		if (shouldShow && !isShown) {
			mount(subGroup, read(template) ?? EMPTY_TEMPLATE, undefined, parent, anchor);
			isShown = true;
		}
		else if (!shouldShow && isShown) {
			unmount(subGroup);
			isShown = false;
		}
	});

	// content should be shown but we're still mounting, i.e. anchor is not yet placed anywhere
	// -> render synchronously within the sub-group
	if (isShown) {
		mount(subGroup, read(template) ?? EMPTY_TEMPLATE, undefined, parent, before);
	}

	subGroup.adapter.insert(anchor, parent, before);
}
