import { isAtom, reaction, read, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis";

import type { CSSStyleDeclarationProps } from "~/jsx/baked";

export interface CssStyleExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends ElementCSSInlineStyle
				? TElements[TElementName] & ExtensionProps<TExtensionKey, CSSStyleDeclarationProps>
				: TElements[TElementName]
		);
	};

	set: (node: ElementCSSInlineStyle, ruleName: string, value: MaybeAtom<string>) => void;
}

export const CssStyleExtension = {
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
} as CssStyleExtensionType;
