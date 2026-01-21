import { reaction, read, type JsxProps, type JsxResult, type MaybeAtom, type MountingGroup, type Nil } from "@calmdown/pyxis";

export interface TextProps {
	readonly children?: readonly (MaybeAtom<Nil<string | number | boolean | bigint>>)[];
}

// @ts-expect-error fake overload to allow use with JSX
export function Text(props: JsxProps<TextProps>): JsxResult;

/** @internal */
export function Text(
	group: MountingGroup,
	jsx: JsxResult,
	parent: Node,
	before: Node | null,
): void;

export function Text(
	group: MountingGroup,
	{ children }: JsxResult,
	parent: Node,
	before: Node | null,
) {
	const length = children?.length ?? 0;
	if (length === 0) {
		// no children given - no text will ever be rendered
		return null;
	}

	const node = document.createTextNode("");
	reaction(() => {
		let text = "";
		let index = 0;
		for (; index < length; index += 1) {
			text += read(children![index]) ?? "";
		}

		node.textContent = text;
	});

	group.adapter.insert(node, parent, before);
}
