import { isAtom, reaction, read, type ElementsType, type ExtensionProps, type MaybeAtom, type Nil } from "@calmdown/pyxis";

export interface CssVariableExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly [TVarName in string]?: MaybeAtom<Nil<string | number>>;
		}>;
	};

	set: (node: HTMLElement, varName: string, value: MaybeAtom<Nil<string | number>>) => void;
}

export const CssVariableExtension = {
	set: (node, varName, value) => {
		if (isAtom(value)) {
			reaction(() => setProp(node.style, varName, read(value)));
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
