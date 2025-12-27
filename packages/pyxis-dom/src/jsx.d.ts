import type { Nil } from "@calmdown/pyxis";
import type { ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

declare global {
	namespace JSX {
		type Child = Node;
		type IntrinsicElements = ExtendedIntrinsicElements<{}>;
	}
}
