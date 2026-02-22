import { effect, isAtom, read, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis/core";

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

/**
 * Extension adding direct CSS rule access to any Element. Recommended prefix:
 * `"css"`
 *
 * Any CSS rules accessible from JavaScript can be set using this extension.
 * When given an Atom for the value, it will be dynamically updated.
 * Example usage:
 * ```tsx
 * <div css:background="red" />
 * ```
 */
export const CssStyleExtension = {
	set: (node, ruleName, value) => {
		if (isAtom(value)) {
			effect(() => {
				node.style[ruleName as never] = read(value);
			});
		}
		else if (value) {
			node.style[ruleName as never] = value;
		}
	},
} as CssStyleExtensionType;
