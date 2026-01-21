import { pyxis, RefExtension, type ElementsOf } from "@calmdown/pyxis";
import { ClassListExtension, DomAdapter, EventExtension, Text } from "@calmdown/pyxis-dom";

import { EditorLayout } from "~/components/EditorLayout";
import { GraphEditor } from "~/components/GraphEditor";

const renderer = pyxis(DomAdapter)
	.extend("on", EventExtension)
	.extend("cl", ClassListExtension)
	.extend("ref", RefExtension)
	.build();

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

renderer.mount(document.body, () => (
	<EditorLayout
		main={() => (
			<GraphEditor />
		)}
		toolbar={() => (
			<Text>Lmao</Text>
		)}
	/>
));
