import { isAtom, reaction, read, type ElementsType, type ExtensionProps, type MaybeAtom } from "@calmdown/pyxis";

import type { CSSStyleDeclarationProps } from "~/jsx/baked";

export interface StyleExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, CSSStyleDeclarationProps>;
	};

	set: (node: HTMLElement, ruleName: string, value: MaybeAtom<string>) => void;
}

export const StyleExtension = {
	set: (node, ruleName, value) => {
		if (isAtom(value)) {
			reaction(() => {
				node.style[ruleName as never] = read(value);
			});
		}
		else if (value) {
			node.style[ruleName as never] = value;
		}
	},
} as StyleExtensionType;
