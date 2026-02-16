import { isAtom, reaction, read, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis";

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
			reaction(() => {
				node.dataset[key] = read(value);
			});
		}
		else {
			node.dataset[key] = value;
		}
	},
} as DatasetExtensionType;
