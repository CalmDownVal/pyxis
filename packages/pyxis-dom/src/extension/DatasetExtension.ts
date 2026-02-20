import { effect, isAtom, read, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis/core";

export interface DatasetExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends HTMLOrSVGElement
				? TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TKey in string]?: MaybeAtom<string | undefined> }>
				: TElements[TElementName]
		);
	};

	set: (node: HTMLOrSVGElement, key: string, value: MaybeAtom<string | undefined>) => void;
}

export const DatasetExtension = {
	set: (node, key, value) => {
		if (isAtom(value)) {
			effect(() => {
				node.dataset[key] = read(value);
			});
		}
		else {
			node.dataset[key] = value;
		}
	},
} as DatasetExtensionType;
