import { component, unmounted } from "@calmdown/pyxis";

import type { Size, Point } from "~/support/math";
import { PointerType, type Editor, type Gesture, type Pointer } from "./types";

export interface EditorViewProps {
	class?: string;
	factory: (canvas: HTMLCanvasElement) => Editor;
}

export const EditorView = component((props: EditorViewProps) => {
	const allPointers: Pointer[] = [];

	let canvas: HTMLCanvasElement | null = null;
	let editor: Editor | null = null;
	let gesture: Gesture | null = null;
	let clientSize: Size = {
		width: 0.0,
		height: 0.0,
	};

	const onCanvasRef = (node: HTMLCanvasElement) => {
		canvas = node;

		const pixelSize = {
			width: 0.0,
			height: 0.0,
		};

		const observer = new ResizeObserver(entries => {
			const lp = entries[0].contentBoxSize[0];
			clientSize = {
				width: lp.inlineSize,
				height: lp.blockSize,
			};

			const dp = entries[0].devicePixelContentBoxSize?.[0];
			if (dp) {
				pixelSize.width = dp.inlineSize;
				pixelSize.height = dp.blockSize;
			}
			else {
				pixelSize.width = lp.inlineSize * devicePixelRatio;
				pixelSize.height = lp.blockSize * devicePixelRatio;
			}

			// even if canvas never resizes, its size is always reported
			// at least once, so we can safely initialize here
			editor ??= props.factory(canvas!);
			editor.onResize({ clientSize, pixelSize });
		});

		try {
			observer.observe(node, { box: "device-pixel-content-box" });
		}
		catch {
			// safari shits the bed on the device pixel mode -> fallback
			observer.observe(node, { box: "content-box" });
		}

		unmounted(() => observer.disconnect());
	};

	const onPointerStart = (e: PointerEvent) => {
		// ignore pointer events originating from elsewhere
		if (e.target !== canvas || !editor) {
			return;
		}

		let type: PointerType;
		switch (e.pointerType) {
			case "mouse":
				type = PointerType.MOUSE;
				break;

			case "touch":
				type = PointerType.TOUCH;
				break;

			case "pen":
				type = PointerType.PEN;
				break;

			default:
				return;
		}

		const point: Point = {
			x: e.offsetX,
			y: e.offsetY,
		};

		gesture ??= editor.onGesture({ clientSize, point });
		if (!gesture) {
			return;
		}

		const current: Pointer = {
			type,
			id: e.pointerId,
			start: point,
			x: e.offsetX,
			y: e.offsetY,
			dx: 0.0,
			dy: 0.0,
		};

		// optimistically pre-push the pointer
		allPointers.push(current);
		if (gesture.offer({ clientSize, allPointers, current }) === true) {
			canvas!.setPointerCapture(current.id);
		}
		else {
			// rejected, remove the pointer
			allPointers.pop();
		}
	};

	const onPointerStop = (e: PointerEvent) => {
		// pointer lock releases capture -> ignore such events if pointer was locked to our canvas
		if (e.type === "lostpointercapture" && document.pointerLockElement === canvas) {
			return;
		}

		// ignore untracked pointers
		const index = allPointers.findIndex(it => it.id === e.pointerId);
		if (index === -1) {
			return;
		}

		const current = allPointers[index];
		try {
			gesture!.stop({ clientSize, allPointers, current });
		}
		finally {
			canvas!.releasePointerCapture(current.id);
			allPointers.splice(index, 1);
			if (allPointers.length === 0) {
				gesture = null;
			}
		}
	};

	const onPointerMove = (e: PointerEvent) => {
		// ignore untracked pointers
		const current = allPointers.find(it => it.id === e.pointerId);
		if (!current) {
			return;
		}

		current.dx = e.movementX / devicePixelRatio;
		current.dy = e.movementY / devicePixelRatio;

		// when using pointer lock, offset doesn't update -> integrate deltas instead
		if (current.type === PointerType.MOUSE && document.pointerLockElement === canvas) {
			current.x += current.dx;
			current.y += current.dy;
		}
		else {
			current.x = e.offsetX;
			current.y = e.offsetY;
		}

		gesture!.move({ clientSize, allPointers, current });
	};

	const onWheel = (e: WheelEvent) => {
		// ignore wheel events originating from elsewhere
		if (e.target !== canvas || !editor) {
			return;
		}

		let x = e.deltaX;
		let y = e.deltaY;
		switch (e.deltaMode) {
			case WheelEvent.DOM_DELTA_PAGE:
				x *= clientSize.width;
				y *= clientSize.height;
				break;

			case WheelEvent.DOM_DELTA_LINE:
				x *= 20.0;
				y *= 20.0;
				break;

			// case WheelEvent.DOM_DELTA_PIXEL:
			// default:
			// use x, y directly
		}

		editor.onWheel({
			clientSize,
			delta: { x, y },
			point: {
				x: e.offsetX,
				y: e.offsetY,
			},
		});
	};

	return (
		<canvas
			class={props.class}
			ref:call={onCanvasRef}
			on:contextmenu={cancelEvent}
			on:pointerdown={onPointerStart}
			on:pointerup={onPointerStop}
			on:pointercancel={onPointerStop}
			on:lostpointercapture={onPointerStop}
			on:pointermove={onPointerMove}
			on:wheel={{
				listener: onWheel,
				passive: true,
			}}
		/>
	);
});

function cancelEvent(e: Event) {
	e.preventDefault();
}
