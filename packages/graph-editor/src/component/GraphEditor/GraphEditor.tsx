import { component } from "@calmdown/pyxis";

import { EditorView, type Editor } from "~/component/EditorView";
import type { Rect, Size } from "~/support/math";

import { PanAndZoomGesture } from "./gesture/PanAndZoomGesture";
import { createGLRenderer } from "./renderer/GLRenderer";
import type { Renderer } from "./types";
import { toEditorSpace } from "./utils";

import "./GraphEditor.css";

export interface GraphEditorProps {
	cellSize?: number;
}

export const GraphEditor = component(({ cellSize = 40.0 }: GraphEditorProps) => {
	// later recalculated from resize events - fixes some inconsistencies in mobile emulators
	let dpr = devicePixelRatio;

	let canvas!: HTMLCanvasElement;
	let renderer!: Renderer;
	let clientSize!: Size;
	let view!: Readonly<Rect>;
	let frame: number | undefined;

	const onFrame = () => {
		frame = undefined;

		const zoom = (clientSize.width / cellSize) / (view.right - view.left);
		const size = cellSize * zoom * dpr;
		renderer.render({
			gridSize: size,
			gridOffset: {
				x: (((view.left + view.right) * 0.5) % 1.0) * size,
				y: (((view.top + view.bottom) * 0.5) % 1.0) * size,
			},
		});
	};

	const scheduleFrame = () => {
		frame ??= requestAnimationFrame(onFrame);
	};

	const editor: Editor = {
		onPan: (e) => {
			const scale = (view.right - view.left) / clientSize.width;
			view = {
				left: view.left + e.deltaX * scale,
				right: view.right + e.deltaX * scale,
				top: view.top + e.deltaY * scale,
				bottom: view.bottom + e.deltaY * scale,
			};

			scheduleFrame();
		},
		onZoom: (e) => {
			const center = toEditorSpace(view, e, clientSize);
			const zoom = 1.0 + e.delta;
			view = {
				left: (view.left - center.x) * zoom + center.x,
				right: (view.right - center.x) * zoom + center.x,
				top: (view.top - center.y) * zoom + center.y,
				bottom: (view.bottom - center.y) * zoom + center.y,
			};

			scheduleFrame();
		},
		onGesture: (e) => {
			return new PanAndZoomGesture({
				editorSpace: view,
				pointerLockTarget: canvas,
				onPanAndZoom: (newView) => {
					view = newView;
					scheduleFrame();
				},
			});
		},
		onResize: (e) => {
			let currentCellSize = cellSize;
			let centerX = 0.0;
			let centerY = 0.0;
			if (view) {
				currentCellSize = clientSize.width / (view.right - view.left);
				centerX = (view.right + view.left) * 0.5;
				centerY = (view.bottom + view.top) * 0.5;
			}

			clientSize = e.clientSize;
			dpr = e.pixelSize.width / clientSize.width;

			const halfWidth = (clientSize.width / currentCellSize) * 0.5;
			const halfHeight = (clientSize.height / currentCellSize) * 0.5;
			view = {
				left: centerX - halfWidth,
				right: centerX + halfWidth,
				top: centerY - halfHeight,
				bottom: centerY + halfHeight,
			};

			renderer.resize?.(e.pixelSize);
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
						gridlineColor: 0x606060,
					});

					return editor;
				}}
			/>
			{/* TODO: render node UI */}
		</div>
	);
});
