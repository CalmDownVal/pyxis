import { component, reaction, read, type MaybeAtom } from "@calmdown/pyxis";

export interface TextProps {
	readonly children?: readonly (MaybeAtom<string> | MaybeAtom<number>)[];
}

export const Text = component(({ children }: TextProps) => {
	const node = document.createTextNode("");
	const length = children?.length ?? 0;
	reaction(() => {
		let text = "";
		let i = 0;
		for (; i < length; i += 1) {
			text += read(children![i]);
		}

		node.textContent = text;
	});

	return node;
});
