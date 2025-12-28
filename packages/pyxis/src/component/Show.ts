import { component, type Template } from "~/Component";
import { fork, mount, unmount } from "~/Renderer";
import { isAtom, read, type MaybeAtom } from "~/data/Atom";
import { withContext } from "~/data/Context";
import { reaction } from "~/data/Reaction";
import { wrap } from "~/support/common";

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
	const anchor = context.adapter.createAnchorNode("/Show");

	let isShown = when.get();
	reaction(() => {
		const shouldShow = read(when);
		if (shouldShow && !isShown) {
			mount(context, template, anchor);
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
	const nodes = wrap(withContext(context, template));
	nodes.push(anchor);

	return nodes;
});
