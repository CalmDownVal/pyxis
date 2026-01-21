import type { JsxProps, JsxResult, Template } from "~/Component";
import { split, mount, unmount, type MountingGroup } from "~/Renderer";
import { isAtom, read, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";
import { EMPTY_TEMPLATE, isNil } from "~/support/common";
import type { Nil } from "~/support/types";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: [ MaybeAtom<Nil<Template>> ];
}

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
	// level: number,
) {
	const when = jsx.when as MaybeAtom<boolean>;
	const template = jsx.children[0] as MaybeAtom<Nil<Template>>;
	if (!isAtom(when) && !isAtom(template)) {
		// static values were given and thus we have nothing to react to
		// -> render synchronously without a sub-group
		return when ? template?.() : null;
	}

	const subGroup = split(group);
	const anchor = __DEV__
		? subGroup.adapter.anchor("/Show")
		: subGroup.adapter.anchor();

	let isShown = read(when);
	reaction(() => {
		const shouldShow = read(when) && !isNil(read(template));
		if (shouldShow && !isShown) {
			mount(subGroup, read(template)!, undefined, parent, anchor);
			isShown = true;
		}
		else if (!shouldShow && isShown) {
			unmount(subGroup);
			isShown = false;
		}
	});

	if (!isShown) {
		// content not shown, will be rendered later via reaction if the `when` Atom flips
		return anchor;
	}

	// content should be shown but we're still mounting, i.e. anchor is not yet placed anywhere
	// -> render synchronously within the sub-group
	mount(subGroup, read(template) ?? EMPTY_TEMPLATE, undefined, parent, before);
	subGroup.adapter.insert(anchor, parent, before);
}
