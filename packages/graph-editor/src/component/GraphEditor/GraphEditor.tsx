import { component } from "@calmdown/pyxis";

import { EditorView, type Editor } from "~/component/EditorView";
import type { Rect, Size } from "~/support/math";

import { PanAndZoomGesture } from "./gesture/PanAndZoomGesture";
import { createGLRenderer } from "./renderer/GLRenderer";
import type { Renderer } from "./types";

import "./GraphEditor.css";

export interface GraphEditorProps {
	cellSize?: number;
}

export const GraphEditor = component(({ cellSize = 20.0 }: GraphEditorProps) => {
	let canvas!: HTMLCanvasElement;
	let renderer!: Renderer;
	let clientSize!: Size;
	let view!: Readonly<Rect>;
	let frame: number | undefined;

	const onFrame = () => {
		frame = undefined;

		const zoom = (clientSize.width / cellSize) / (view.right - view.left);
		const size = cellSize * zoom * devicePixelRatio;
		renderer.render({
			gridSize: size,
			gridOffset: {
				x: (view.left + view.right) * 0.5 * size,
				y: (view.top + view.bottom) * 0.5 * size,
			},
		});
	};

	const scheduleFrame = () => {
		frame ??= requestAnimationFrame(onFrame);
	};

	const editor: Editor = {
		onGesture: (e) => {
			const start = { ...view };
			return new PanAndZoomGesture({
				editorSpace: view,
				pointerLockTarget: canvas,
				onPanAndZoom: (newView) => {
					view = newView;
					scheduleFrame();
				},
			});
		},
		onWheel: (e) => {

			scheduleFrame();
		},
		onResize: (e) => {
			let zoomedCellSize = cellSize;
			let centerX = 0.0;
			let centerY = 0.0;
			if (view) {
				zoomedCellSize = clientSize.width / (view.right - view.left);
				centerX = (view.right + view.left) * 0.5;
				centerY = (view.bottom + view.top) * 0.5;
			}

			clientSize = e.clientSize;
			const halfWidth = (clientSize.width / zoomedCellSize) * 0.5;
			const halfHeight = (clientSize.height / zoomedCellSize) * 0.5;
			view = {
				left: centerX - halfWidth,
				right: centerX + halfWidth,
				top: centerY - halfHeight,
				bottom: centerY + halfHeight,
			};

			renderer.resize?.(e.clientSize);
			onFrame();
		},
	};

	return (
		<div cl:graph-editor>
			<EditorView
				class="graph-editor__view"
				factory={node => {
					canvas = node;
					renderer = createGLRenderer(node, {
						backgroundColor: 0x303030,
						gridlineColor: 0x404040,
					});

					return editor;
				}}
			/>
			{/* TODO: render node UI */}
		</div>
	);
});
