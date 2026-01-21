import { component, unmounted } from "@calmdown/pyxis";

import type { Size } from "~/support/math";
import { P_MOUSE, P_PEN, P_TOUCH, type Editor, type Gesture, type Pointer, type PointerType } from "./types";

export interface EditorViewProps {
	class?: string;
	factory: (canvas: HTMLCanvasElement) => Editor;
}

export const EditorView = component((props: EditorViewProps) => {
	const pointers = new Map<number, Pointer>();
	const logicalSize: Size = {
		width: 0.0,
		height: 0.0,
	};

	let canvas: HTMLCanvasElement | null = null;
	let editor: Editor | null = null;
	let gesture: Gesture | null = null;

	const onCanvasRef = (node: HTMLCanvasElement) => {
		canvas = node;

		const pixelSize = {
			width: 0.0,
			height: 0.0,
		};

		const observer = new ResizeObserver(entries => {
			const lp = entries[0].contentBoxSize[0];
			logicalSize.width = lp.inlineSize;
			logicalSize.height = lp.blockSize;

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
			editor.resize(pixelSize, logicalSize);
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
		// also ignore the event if editor hasn't been initialized yet
		if (e.target !== canvas || !editor) {
			return;
		}

		let type: PointerType;
		switch (e.pointerType) {
			case "mouse":
				type = P_MOUSE;
				break;

			case "touch":
				type = P_TOUCH;
				break;

			case "pen":
				type = P_PEN;
				break;

			default:
				return;
		}

		const pointer: Pointer = {
			type,
			id: e.pointerId,
			x: e.offsetX,
			y: e.offsetY,
			start: {
				x: e.offsetX,
				y: e.offsetY,
			},
			delta: {
				x: 0.0,
				y: 0.0,
			},
		};

		gesture ??= editor.beginGesture(pointer);
		if (gesture?.start(pointer) === true) {
			canvas!.setPointerCapture(pointer.id);
			pointers.set(pointer.id, pointer);
		}
	};

	const onPointerStop = (e: PointerEvent) => {
		// ignore untracked pointers
		const pointer = pointers.get(e.pointerId);
		if (!pointer) {
			return;
		}

		try {
			gesture!.stop(pointer);
		}
		finally {
			canvas!.releasePointerCapture(pointer.id);
			pointers.delete(pointer.id);
			if (pointers.size === 0) {
				gesture = null;
			}
		}
	};

	const onPointerMove = (e: PointerEvent) => {
		// ignore untracked pointers
		const pointer = pointers.get(e.pointerId);
		if (!pointer) {
			return;
		}

		const { delta } = pointer;
		delta.x += e.movementX / devicePixelRatio;
		delta.y += e.movementY / devicePixelRatio;

		// when using pointer lock, reported position stays constant -> integrate deltas instead
		if (pointer.type === P_MOUSE && document.pointerLockElement) {
			pointer.x = delta.x;
			pointer.y = delta.y;
		}
		else {
			pointer.x = e.offsetX;
			pointer.y = e.offsetY;
		}

		gesture!.move(pointer);
	};

	const onWheel = (e: WheelEvent) => {
		let x = e.deltaX;
		let y = e.deltaY;
		switch (e.deltaMode) {
			case WheelEvent.DOM_DELTA_PAGE:
				x *= logicalSize.width;
				y *= logicalSize.height;
				break;

			case WheelEvent.DOM_DELTA_LINE:
				x *= 20.0;
				y *= 20.0;
				break;

			// case WheelEvent.DOM_DELTA_PIXEL:
			// default:
		}

		editor?.scroll({ x, y });
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
			on:wheel={onWheel}
		/>
	);
});

function cancelEvent(e: Event) {
	e.preventDefault();
}
