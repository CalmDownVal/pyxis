import { pyxis, type ElementsOf, type JsxResult } from "@calmdown/pyxis";
import { ClassListExtension, DomAdapter, EventExtension } from "@calmdown/pyxis-dom";

import { TestApp } from "./TestApp";

const renderer = pyxis(DomAdapter)
	.extend("cl", ClassListExtension)
	.extend("on", EventExtension)
	.build();

declare global {
	namespace JSX {
		type Element = JsxResult;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

renderer.mount(document.body, () => <TestApp />);
