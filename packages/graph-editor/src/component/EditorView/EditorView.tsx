import { component, unmounted } from "@calmdown/pyxis";

import type { Size } from "~/support/math";
import { PointerType, type Editor, type Gesture, type Pointer } from "./types";

export interface EditorViewProps {
	class?: string;
	touchSmoothing?: number;
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

		const { offsetX: x, offsetY: y } = e;
		gesture ??= editor.onGesture({ x, y });
		if (!gesture) {
			return;
		}

		const current: Pointer = {
			type,
			id: e.pointerId,
			startX: x,
			startY: y,
			x: x,
			y: y,
			deltaX: 0.0,
			deltaY: 0.0,
			rawX: x,
			rawY: y,
			moveCount: 0,
		};

		// optimistically pre-push the pointer
		allPointers.push(current);
		if (gesture.offer({ clientSize, allPointers, current }) === true) {
			canvas!.setPointerCapture(current.id);
			cancelEvent(e);
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

			cancelEvent(e);
		}
	};

	const touchSmoothing = props.touchSmoothing ?? 10;
	const onPointerMove = (e: PointerEvent) => {
		// ignore untracked pointers
		const current = allPointers.find(it => it.id === e.pointerId);
		if (!current) {
			return;
		}

		// previous coordinates
		const px = current.x;
		const py = current.y;

		// when using pointer lock, offsets don't update -> integrate deltas instead
		if (current.type === PointerType.MOUSE && document.pointerLockElement === canvas) {
			current.rawX += e.movementX;
			current.rawY += e.movementY;
		}
		else {
			current.rawX = e.offsetX;
			current.rawY = e.offsetY;
		}

		// apply initial touch smoothing to reduce jitter before full finger contact is established
		current.moveCount += 1;
		if (current.type === PointerType.TOUCH) {
			const factor = 1.0 - Math.max(touchSmoothing - current.moveCount, 0) / touchSmoothing;
			current.x += (current.rawX - px) * factor;
			current.y += (current.rawY - py) * factor;
		}
		else {
			current.x = current.rawX;
			current.y = current.rawY;
		}

		// movement x/y reliably reports values only with pointer lock -> calculate deltas manually
		current.deltaX = current.x - px;
		current.deltaY = current.y - py;

		cancelEvent(e);
		gesture!.move({ clientSize, allPointers, current });
	};

	let lastWheelAt = 0;
	let usePreciseWheelDeltas = false;
	const onWheel = (e: WheelEvent) => {
		// ignore wheel events originating from elsewhere
		if (e.target !== canvas || !editor) {
			return;
		}

		let { deltaX, deltaY } = e;
		let adjustment = 1.0;

		switch (e.deltaMode) {
			case WheelEvent.DOM_DELTA_PAGE:
				// scroll by a larger portion of the viewport ... page deltas are very rare though
				adjustment = clientSize.height * 0.75;
				break;

			case WheelEvent.DOM_DELTA_LINE:
				// assume we have ~30 lines in the editor ... whatever, as long as it's somewhat consistent
				adjustment = clientSize.height * 0.03;
				break;

			case WheelEvent.DOM_DELTA_PIXEL:
				// on many mice, especially on windows (sigh...), deltas are reported in pixel mode
				// but the values are constant +100/-100 or similar seemingly arbitrary numbers
				// on track pads with momentum (e.g. Apple devices) the values are typically much
				// smaller, reported in rapid succession, and actually correspond to pixels, imagine...

				if (e.timeStamp - lastWheelAt > 100) {
					const max = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY));
					if (max < Number.EPSILON) {
						return;
					}

					usePreciseWheelDeltas = max < 50.0;
				}

				if (!usePreciseWheelDeltas) {
					deltaX = Math.sign(e.deltaX);
					deltaY = Math.sign(e.deltaY);
					adjustment = 15.0;
				}

				break;
		}

		lastWheelAt = e.timeStamp;
		deltaX *= adjustment;
		deltaY *= adjustment;

		cancelEvent(e);
		if (e.ctrlKey) {
			// somewhat arbitrary extra adjustment, which seems to work okay on most platforms
			editor.onZoom({
				delta: deltaY * (10.0 / clientSize.width),
				x: e.offsetX,
				y: e.offsetY,
			});
		}
		else if (e.shiftKey) {
			// flipped direction, mainly for mice with only a y-wheel
			editor.onPan({
				deltaX: deltaY,
				deltaY: deltaX,
			});
		} else {
			editor.onPan({ deltaX, deltaY });
		}
	};

	return (
		<canvas
			class={props.class}
			ref:call={onCanvasRef}
			on:contextmenu={cancelEvent}
			on:touchstart={cancelEvent}
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
	e.stopPropagation();
}
