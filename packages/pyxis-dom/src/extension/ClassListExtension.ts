import { isAtom, reaction, read, type MaybeAtom } from "@calmdown/pyxis";

export interface ClassListExtensionType {
	setProp(
		node: HTMLElement,
		className: string,
		toggle: MaybeAtom<boolean>,
	): void;
}

export const ClassListExtension: ClassListExtensionType = {
	setProp: (node, className, toggle) => {
		if (isAtom(toggle)) {
			reaction(() => {
				node.classList.toggle(className, read(toggle));
			});
		}
		else if (toggle) {
			node.classList.add(className);
		}
	},
};
