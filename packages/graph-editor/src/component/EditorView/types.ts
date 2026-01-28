import type { Size, Point } from "~/support/math";

export interface Editor {
	onWheel: (e: WheelEditorEvent) => void;
	onGesture: (e: GestureEditorEvent) => Gesture | null;
	onResize: (e: ResizeEditorEvent) => void;
}

export interface WheelEditorEvent {
	clientSize: Size;
	delta: Point;
	point: Point;
}

export interface GestureEditorEvent {
	clientSize: Size;
	point: Point;
}

export interface ResizeEditorEvent {
	clientSize: Size;
	pixelSize: Size;
}

export interface Gesture {
	offer: (e: PointerGestureEvent) => boolean;
	move: (e: PointerGestureEvent) => void;
	stop: (e: PointerGestureEvent) => void;
}

export interface PointerGestureEvent {
	clientSize: Size;
	allPointers: readonly Pointer[];
	current: Pointer;
}

export interface Pointer {
	readonly id: number;
	readonly type: PointerType;
	readonly start: Point;
	x: number;
	y: number;
	dx: number;
	dy: number;
}

export enum PointerType {
	MOUSE,
	TOUCH,
	PEN,
}
