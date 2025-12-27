import { component, reaction, read, type MaybeAtom, type Nil } from "@calmdown/pyxis";

export interface TextProps {
	readonly children?: readonly (MaybeAtom<Nil<string | number | boolean | bigint>>)[];
}

export const Text = component(({ children }: TextProps) => {
	const length = children?.length ?? 0;
	if (length === 0) {
		// no children given - no text will ever be rendered
		return null;
	}

	const node = document.createTextNode("");
	reaction(() => {
		let text = "";
		let i = 0;
		for (; i < length; i += 1) {
			text += read(children![i]) ?? "";
		}

		node.textContent = text;
	});

	return node;
});
