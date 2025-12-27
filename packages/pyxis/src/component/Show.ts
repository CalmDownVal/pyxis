import { component, type Template } from "~/Component";
import { fork, mount, unmount } from "~/Renderer";
import { isAtom, read, type MaybeAtom } from "~/data/Atom";
import { reaction } from "~/data/Reaction";

export interface ShowProps {
	when: MaybeAtom<boolean>;
	children: [ Template ];
}

export const Show = component(({ when, children: [ template ] }: ShowProps) => {
	if (!isAtom(when)) {
		// when is not an Atom and therefore we have nothing to react to
		// -> render without forking context
		return when ? template() : null;
	}

	const context = fork();
	const anchor = context.adapter.createAnchorNode("/Show");

	let isShown = false;
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

	return anchor;
});
