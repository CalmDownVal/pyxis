import { bind, get, isAtom, type ElementsType, type ExtensionProps, type MaybeAtom, type MountingGroup, type NodeType } from "@calmdown/pyxis/core";

import type { ARIAProps } from "~/jsx/baked";

export interface AriaExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends Element
				? TElements[TElementName] & ExtensionProps<TExtensionKey, ARIAProps>
				: TElements[TElementName]
		);
	};

	set: (node: Element, key: keyof ARIAProps, value: MaybeAtom<any>, group: MountingGroup<Node>) => void;
}

/**
 * Extension adding ARIA attributes to any Element. Recommended prefix: `"aria"`
 *
 * Example usage:
 * ```tsx
 * <div aria:role="button" />
 * ```
 */
export const AriaExtension = {
	set: (node, key, value, group) => {
		if (isAtom(value)) {
			bind(group, value, () => (
				node[key] = get(value)
			));
		}
		else {
			node[key] = value;
		}
	},
} as AriaExtensionType;
