import { bind, get, isAtom, type ElementsType, type ExtensionProps, type MaybeAtom, type MountingGroup, type NodeType } from "@calmdown/pyxis/core";

export interface DatasetExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends HTMLOrSVGElement
				? TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TKey in string]?: MaybeAtom<string | undefined> }>
				: TElements[TElementName]
		);
	};

	set: (node: HTMLOrSVGElement, key: string, value: MaybeAtom<string | undefined>, group: MountingGroup<Node>) => void;
}

/**
 * Extension adding dataset access to any HTML or SVG element. Recommended
 * prefix: `"data"`
 *
 * Any arbitrary dataset value can be set using this extension. Values must
 * always be strings. When given an Atom for the value, it will be dynamically
 * updated.
 *
 * Example usage:
 * ```tsx
 * <div data:testId="test-wrapper" />
 * ```
 */
export const DatasetExtension = {
	set: (node, key, value, group) => {
		if (isAtom(value)) {
			bind(group, value, () => (
				node.dataset[key] = get(value)
			));
		}
		else {
			node.dataset[key] = value;
		}
	},
} as DatasetExtensionType;
