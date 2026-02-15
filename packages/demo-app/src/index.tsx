import { pyxis, RefExtension, type ElementsOf, type JsxResult } from "@calmdown/pyxis";
import { ClassListExtension, DomAdapter, EventExtension, CssStyleExtension } from "@calmdown/pyxis-dom";

import { TestApp } from "./TestApp";

const renderer = pyxis(DomAdapter)
	.extend("cl", ClassListExtension)
	.extend("on", EventExtension)
	.extend("ref", RefExtension)
	.extend("css", CssStyleExtension)
	.build();

declare global {
	namespace JSX {
		type Element = JsxResult;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

renderer.mount(document.body, () => <TestApp />);
