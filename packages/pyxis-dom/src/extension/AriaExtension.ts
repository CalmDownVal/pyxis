import { effect, isAtom, read, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis/core";

import type { ARIAProps } from "~/jsx/baked";

export interface AriaExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends Element
				? TElements[TElementName] & ExtensionProps<TExtensionKey, ARIAProps>
				: TElements[TElementName]
		);
	};

	set: (node: Element, key: keyof ARIAProps, value: MaybeAtom<any>) => void;
}

export const AriaExtension = {
	set: (node, key, value) => {
		if (isAtom(value)) {
			effect(() => {
				node[key] = read(value);
			});
		}
		else {
			node[key] = value;
		}
	},
} as AriaExtensionType;
