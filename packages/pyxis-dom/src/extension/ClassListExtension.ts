import { isAtom, reaction, read, type ElementsType, type ExtensionProps, type MaybeAtom } from "@calmdown/pyxis";

export interface ClassListExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TClassName in string]?: MaybeAtom<boolean> }>
		);
	};

	set: (node: Element, className: string, toggle: MaybeAtom<boolean>) => void;
}

export const ClassListExtension = {
	set: (node, className, toggle) => {
		if (isAtom(toggle)) {
			reaction(() => {
				node.classList.toggle(className, read(toggle));
			});
		}
		else if (toggle) {
			node.classList.add(className);
		}
	},
} as ClassListExtensionType;
