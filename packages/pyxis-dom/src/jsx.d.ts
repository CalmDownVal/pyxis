import type { ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

declare global {
	namespace JSX {
		export type Element = Node;
		export type IntrinsicElements = ExtendedIntrinsicElements<{}>;
	}
}
