import { effect, isAtom, read, type ElementsType, type ExtensionProps, type MaybeAtom } from "@calmdown/pyxis/core";

export interface ClassListExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TClassName in string]?: MaybeAtom<boolean> }>
		);
	};

	set: (node: Element, className: string, toggle: MaybeAtom<boolean>) => void;
}

/**
 * Extension adding ClassList access to any Element. Recommended prefix: `"cl"`
 *
 * CSS classes can be added via value-less boolean attributes, e.g.:
 * ```tsx
 * <div cl:my-class />
 * ```
 * and may be dynamically toggled when an `Atom<boolean>` is given as value:
 * ```tsx
 * <div cl:my-class={toggle} />
 * ```
 *
 * This extension can be used in tandem with the `@calmdown/rollup-plugin-pyxis`
 * plugin to automatically rewrite class names when using CSS modules.
 */
export const ClassListExtension = {
	set: (node, className, toggle) => {
		if (isAtom(toggle)) {
			effect(() => {
				node.classList.toggle(className, read(toggle));
			});
		}
		else if (toggle) {
			node.classList.add(className);
		}
	},
} as ClassListExtensionType;
