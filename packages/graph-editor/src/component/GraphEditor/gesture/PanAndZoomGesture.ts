import { PointerType, type PointerGestureEvent } from "~/component/EditorView";
import { clamp, distance, lerp, type Point, type Rect } from "~/support/math";

import { PressGesture, PressState, type PressGestureOptions } from "./PressGesture";

export interface PanAndZoomGestureOptions extends PressGestureOptions {
	/**
	 * The target element for pointer lock. When panning with mouse, this feature locks pointer for
	 * infinite panning.
	 */
	pointerLockTarget?: Element;

	onPanAndZoom?: (view: Rect) => void;
}

export class PanAndZoomGesture extends PressGesture {
	public onPanAndZoom?: (view: Rect) => void;

	private readonly pointerLockTarget?: Element;
	private isPointerLockEligible = false;
	private prevPinchCenter!: Point;
	private prevPinchDistance!: number;
	private prevResult: Rect;

	public constructor(options: PanAndZoomGestureOptions) {
		super(options);
		this.pointerLockTarget = options.pointerLockTarget;
		this.onPanAndZoom = options.onPanAndZoom;
		this.prevResult = this.editorSpace;
	}

	public offer(e: PointerGestureEvent) {
		super.offer(e);

		const { allPointers, current } = e;
		if (allPointers.length > 2) {
			return false;
		}

		this.isPointerLockEligible = (
			this.pointerLockTarget !== undefined &&
			allPointers.length === 1 &&
			current.type === PointerType.MOUSE
		);

		if (allPointers.length === 2) {
			const [ a, b ] = allPointers;
			this.prevPinchDistance = distance(a, b);
			this.prevPinchCenter = {
				x: (a.x + b.x) * 0.5,
				y: (a.y + b.y) * 0.5,
			};
		}

		return true;
	}

	public move(e: PointerGestureEvent) {
		super.move(e);

		const { allPointers, clientSize, current } = e;
		const { prevResult } = this;
		let result: Rect;

		if (allPointers.length === 2) {
			const { prevPinchDistance, prevPinchCenter } = this;
			const [ a, b ] = allPointers;
			const pinchDistance = distance(a, b);
			const pinchCenter: Point = {
				x: (a.x + b.x) * 0.5,
				y: (a.y + b.y) * 0.5,
			};

			const zoom = prevPinchDistance / pinchDistance;
			const cx = lerp(prevResult.left, prevResult.right, clamp(pinchCenter.x / clientSize.width));
			const cy = lerp(prevResult.top, prevResult.bottom, clamp(pinchCenter.y / clientSize.height));

			const scale = (prevResult.right - prevResult.left) / clientSize.width;
			const ox = (prevPinchCenter.x - pinchCenter.x) * scale;
			const oy = (prevPinchCenter.y - pinchCenter.y) * scale;

			result = {
				left: (prevResult.left - cx) * zoom + cx + ox,
				right: (prevResult.right - cx) * zoom + cx + ox,
				top: (prevResult.top - cy) * zoom + cy + oy,
				bottom: (prevResult.bottom - cy) * zoom + cy + oy,
			};

			this.prevPinchDistance = pinchDistance;
			this.prevPinchCenter = pinchCenter;
		}
		else {
			const dx = (prevResult.right - prevResult.left) * (current.deltaX / e.clientSize.width);
			const dy = (prevResult.bottom - prevResult.top) * (current.deltaY / e.clientSize.height);
			result = {
				left: prevResult.left - dx,
				right: prevResult.right - dx,
				top: prevResult.top - dy,
				bottom: prevResult.bottom - dy,
			};
		}

		this.prevResult = result;
		this.onPanAndZoom?.(result);
	}

	public stop(e: PointerGestureEvent) {
		super.stop(e);
		if (this.isPointerLockEligible) {
			document.exitPointerLock();
		}
	}

	protected stateChanged(state: PressState): void {
		super.stateChanged(state);
		if (this.isPointerLockEligible && state === PressState.MOVED_TOO_FAR) {
			this.pointerLockTarget!.requestPointerLock();
		}
	}
}
