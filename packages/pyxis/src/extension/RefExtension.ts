import { write, type Atom } from "~/data/Atom";
import type { ElementsType, Nil, NodeType } from "~/support/types";
import type { ExtensionProps } from "~/Adapter";

export interface RefExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly atom?: Atom<Nil<NodeType<TElements[TElementName]>>>;
			readonly call?: (node: NodeType<TElements[TElementName]>) => void;
		}>;
	};

	set: (node: any, prop: string, value: any) => void;
}

/**
 * Extension adding direct reference access to any element. Recommended prefix:
 * `"ref"`
 *
 * References can be stored into atoms:
 * ```tsx
 * const wrapperRef = atomOf<HTMLDivElement>();
 * // ...
 * <div ref:atom={wrapperRef} />
 * ```
 * or handled with a custom callback:
 * ```tsx
 * <div ref:call={ref => {
 *   // ...
 * }} />
 * ```
 */
export const RefExtension = {
	set: (node: any, kind: string, value: any) => {
		switch (kind) {
			case "atom":
				write(value, node);
				break;

			case "call":
				value(node);
				break;
		}
	},
} as RefExtensionType;
