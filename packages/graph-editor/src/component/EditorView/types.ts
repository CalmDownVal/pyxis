import type { Size } from "~/support/math";

export interface Editor {
	onPan: (e: PanEditorEvent) => void;
	onZoom: (e: ZoomEditorEvent) => void;
	onGesture: (e: GestureEditorEvent) => Gesture | null;
	onResize: (e: ResizeEditorEvent) => void;
}

export interface PanEditorEvent {
	deltaX: number;
	deltaY: number;
}

export interface ZoomEditorEvent {
	delta: number;
	x: number;
	y: number;
}

export interface GestureEditorEvent {
	x: number;
	y: number;
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
	readonly startX: number;
	readonly startY: number;
	x: number;
	y: number;
	deltaX: number;
	deltaY: number;
	rawX: number;
	rawY: number;
	moveCount: number;
}

export enum PointerType {
	MOUSE,
	TOUCH,
	PEN,
}
