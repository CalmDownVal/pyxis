import type { Gesture, PointerGestureEvent } from "~/component/EditorView";
import { distanceSqr, type Rect, type Point } from "~/support/math";
import { toEditorSpace } from "../utils";

export interface PressGestureOptions {
	editorSpace: Rect;

	/**
	 * How long in milliseconds to wait before a long press is recognized.
	 *
	 * Defaults to 800.
	 */
	longPressDelay?: number;

	/**
	 * The maximum distance in logical pixels a pointer is allowed to move to
	 * still be recognized as a press.
	 *
	 * Defaults to 10.
	 */
	maxPressDistance?: number;

	onPress?: (point: Point) => void;
	onLongPress?: (point: Point) => void;
}

export enum PressState {
	IDLE,
	PENDING,
	MOVED_TOO_FAR,
	COMPLEX_GESTURE,
}

export class PressGesture implements Gesture {
	public onPress?: (point: Point) => void;
	public onLongPress?: (point: Point) => void;

	protected readonly editorSpace: Rect;
	protected state = PressState.IDLE;

	private readonly maxPressDistanceSqr: number;
	private readonly longPressDelay: number;
	private longPressHandle?: ReturnType<typeof setTimeout>;

	public constructor(options: PressGestureOptions) {
		this.editorSpace = options.editorSpace;
		this.maxPressDistanceSqr = (options.maxPressDistance ?? 10.0) ** 2.0;
		this.longPressDelay = options.longPressDelay ?? 800;
		this.onPress = options.onPress;
		this.onLongPress = options.onLongPress;
	}

	public offer({ allPointers, clientSize, current }: PointerGestureEvent) {
		if (allPointers.length > 1) {
			this.stateChanged(PressState.COMPLEX_GESTURE);
			return false;
		}

		this.stateChanged(PressState.PENDING);
		this.longPressHandle = setTimeout(
			() => {
				this.longPressHandle = undefined;
				this.onLongPress?.(toEditorSpace(this.editorSpace, current, clientSize));
			},
			this.longPressDelay,
		);

		return true;
	}

	public move({ current }: PointerGestureEvent) {
		if (this.state !== PressState.PENDING) {
			return;
		}

		const distSqr = distanceSqr(current.start, current);
		if (distSqr > this.maxPressDistanceSqr) {
			this.stateChanged(PressState.MOVED_TOO_FAR);
		}
	}

	public stop({ clientSize, current }: PointerGestureEvent) {
		if (this.state === PressState.PENDING) {
			this.onPress?.(toEditorSpace(this.editorSpace, current, clientSize));
		}

		this.stateChanged(PressState.IDLE);
	}

	protected stateChanged(state: PressState) {
		if (this.longPressHandle !== undefined) {
			clearTimeout(this.longPressHandle);
			this.longPressHandle = undefined;
		}

		this.state = state;
	}
}
