import { insert, reaction, read, type HierarchyNode, type JsxProps, type JsxResult, type MaybeAtom, type Nil } from "@calmdown/pyxis";

export interface TextProps {
	readonly children?: readonly (MaybeAtom<Nil<string | number | boolean | bigint>>)[];
}

// @ts-expect-error fake overload to allow use with JSX
export function Text(props: JsxProps<TextProps>): JsxResult;

/** @internal */
export function Text(
	jsx: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
): void;

export function Text(
	{ children }: NonNullable<JsxResult>,
	parent: HierarchyNode<Node>,
	before: Node | null,
) {
	const length = children?.length ?? 0;
	if (length === 0) {
		// no children given - no text will ever be rendered
		return;
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

	insert(node, null, parent, before);
}
