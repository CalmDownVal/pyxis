export interface Point {
	readonly x: number;
	readonly y: number;
}

export interface Size {
	readonly width: number;
	readonly height: number;
}

export interface Rect {
	readonly top: number;
	readonly bottom: number;
	readonly left: number;
	readonly right: number;
}

export const PHI = 1.618034;

export function isNearZero(value: number, epsilon = 1e-10) {
	return Math.abs(value) < epsilon;
}

export function clamp(value: number, min = 0.0, max = 1.0) {
	return value < min ? min : value > max ? max : value;
}

export function lerp(a: number, b: number, t: number) {
	return a + t * (b - a);
}

export function distance(point0: Point, point1: Point) {
	const dx = point0.x - point1.x;
	const dy = point0.y - point1.y;
	return Math.sqrt(dx * dx + dy * dy);
}
