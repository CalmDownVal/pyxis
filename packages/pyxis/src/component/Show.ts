import { component, type Template } from "~/Component";
import { fork, mount, unmount } from "~/Renderer";
import { isAtom, read, type AtomInternal, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";

export interface ShowProps {
	when: MaybeAtom<boolean>;
	children: [ Template ];
}

export const Show = component(({ when, children: [ template ] }: ShowProps) => {
	if (!isAtom(when)) {
		// `when` is not an Atom and therefore we have nothing to react to
		// -> render synchronously without forking context
		return when ? template() : null;
	}

	const context = fork();
	const anchor = __DEV__
		? context.$adapter.anchor("/Show")
		: context.$adapter.anchor();

	let isShown = (when as AtomInternal<boolean>).$get();
	reaction(() => {
		const shouldShow = read(when);
		if (shouldShow && !isShown) {
			mount(context, template, undefined, anchor);
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
	mount(context, template);
	return context.$topNodes.concat(anchor);
});
