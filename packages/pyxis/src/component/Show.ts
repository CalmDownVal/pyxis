import { component, type Template } from "~/Component";
import { fork, mount, unmount } from "~/Renderer";
import { isAtom, read, type Atom, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";
import { EMPTY_TEMPLATE, isNil } from "~/support/common";
import type { Nil } from "~/support/types";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: [ Atom<Nil<Template>> | Template ];
}

export const Show = component(({ when = true, children: [ template ] }: ShowProps) => {
	if (!isAtom(when) && !isAtom(template)) {
		// static values were given and thus we have nothing to react to
		// -> render synchronously without forking context
		return when ? template() : null;
	}

	const context = fork();
	const anchor = __DEV__
		? context.$adapter.anchor("/Show")
		: context.$adapter.anchor();

	let isShown = read(when);
	reaction(() => {
		const shouldShow = read(when) && !isNil(read(template));
		if (shouldShow && !isShown) {
			mount(context, read(template)!, undefined, anchor);
			isShown = true;
		}
		else if (!shouldShow && isShown) {
			unmount(context);
			isShown = false;
		}
	});

	if (!isShown) {
		// content not shown, will be rendered later via reaction if the `when` Atom flips
		return anchor;
	}

	// content should be shown but we're still mounting, i.e. anchor is not yet placed anywhere
	// -> render synchronously within the forked sub-context
	mount(context, read(template) ?? EMPTY_TEMPLATE);
	return context.$topNodes.concat(anchor);
});
