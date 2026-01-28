import { PointerType, type PointerGestureEvent } from "~/component/EditorView";
import { distance, height, width, type Point, type Rect } from "~/support/math";

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
	private prevPinchFocus!: Point;
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
			this.prevPinchFocus = {
				x: (a.x + b.x) * 0.5,
				y: (a.y + b.y) * 0.5,
			};
		}

		return true;
	}

	public move(e: PointerGestureEvent) {
		super.move(e);

		const { allPointers, current } = e;
		const { prevPinchDistance, prevPinchFocus, prevResult } = this;
		let result: Rect;

		if (allPointers.length === 2) {
			const [ a, b ] = allPointers;
			const pinchDistance = distance(a, b);
			const pinchFocus = {
				x: (a.x + b.x) * 0.5,
				y: (a.y + b.y) * 0.5,
			};

			const dx = pinchFocus.x - prevPinchFocus.x;
			const dy = pinchFocus.y - prevPinchFocus.y;
			result = {

			};
		}
		else {
			const dx = width(prevResult) * (current.dx / e.clientSize.width);
			const dy = height(prevResult) * (current.dy / e.clientSize.height);
			result = {
				left: prevResult.left + dx,
				right: prevResult.right + dx,
				top: prevResult.top + dy,
				bottom: prevResult.bottom + dy,
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
