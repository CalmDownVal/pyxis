import { bind, get, isAtom, type ElementsType, type ExtensionProps, type MaybeAtom, type MountingGroup, type Nil, type NodeType } from "@calmdown/pyxis/core";

export interface CssVariableExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends ElementCSSInlineStyle
				? TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TVarName in string]?: MaybeAtom<Nil<string | number>> }>
				: TElements[TElementName]
		);
	};

	set: (node: ElementCSSInlineStyle, varName: string, value: MaybeAtom<Nil<string | number>>, group: MountingGroup<Node>) => void;
}

/**
 * Extension adding CSS variable access to any Element. Recommended prefix:
 * `"var"`
 *
 * Any CSS variable can be set using this extension. The mandatory "--" prefix
 * is pre-applied by this extension and thus shouldn't be included in the
 * attribute name. When given an Atom for the value, it will be dynamically
 * updated. Strings are set as-is, while numbers are converted with 3 decimal
 * digit precision. Other types are not allowed.
 *
 * Example usage:
 * ```tsx
 * <div var:max-size="5rem" /> // sets --max-size: 5rem;
 * ```
 */
export const CssVariableExtension = {
	set: (node, varName, value, group) => {
		if (isAtom(value)) {
			bind(group, value, () => (
				setProp(node.style, varName, get(value))
			));
		}
		else if (value) {
			setProp(node.style, varName, value);
		}
	},
} as CssVariableExtensionType;

function setProp(style: CSSStyleDeclaration, varName: string, value: Nil<string | number>) {
	if (value === null || value === undefined || value === "") {
		value = null;
	}
	else if (typeof value === "number") {
		value = value.toFixed(3);
	}

	style.setProperty("--" + varName, value);
}
