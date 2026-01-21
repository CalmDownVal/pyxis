import type { Size, Vector2 } from "~/support/math";

export interface Editor {
	beginGesture: (point: Vector2) => Gesture | null;
	resize: (pixelSize: Size, logicalSize: Size) => void;
	scroll: (delta: Vector2) => void;
}

export interface Gesture {
	start: (current: Pointer) => boolean;
	move: (current: Pointer) => void;
	stop: (current: Pointer) => void;
}

export interface Pointer extends Vector2 {
	readonly id: number;
	readonly type: PointerType;
	readonly start: Vector2;
	readonly delta: Vector2;
}

export const P_MOUSE = 1;
export const P_TOUCH = 2;
export const P_PEN = 3;

export type PointerType =
	| typeof P_MOUSE
	| typeof P_TOUCH
	| typeof P_PEN;
