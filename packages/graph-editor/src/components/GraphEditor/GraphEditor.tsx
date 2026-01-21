import { component } from "@calmdown/pyxis";

import { EditorView, type Editor } from "~/components/EditorView";

import "./GraphEditor.css";

export interface GraphEditorProps {
}

export const GraphEditor = component((props: GraphEditorProps) => {
	const editor: Editor = {
		beginGesture: point => {
			return null;
		},
		resize: size => {

		},
		scroll: delta => {

		},
	};

	return (
		<div cl:graph-editor>
			<EditorView
				class="graph-editor__view"
				factory={null!}
			/>
			{/* TODO: render node UI */}
		</div>
	);
});
