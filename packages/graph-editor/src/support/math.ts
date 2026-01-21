export interface Vector2 {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Rect {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

export const PHI = 1.618034;

export function isNearZero(value: number, epsilon = 1e-10) {
	return Math.abs(value) < epsilon;
}

export function clamp(value: number, min = 0.0, max = 1.0) {
	return value < min ? min : value > max ? max : value;
}

export function width(rect: Rect) {
	return rect.right - rect.left;
}

export function height(rect: Rect) {
	return rect.bottom - rect.top;
}

export function project(point: Vector2, sourceSpace: Rect, targetSpace: Rect): Vector2 {
	return {
		x: targetSpace.left + width(targetSpace) * (point.x - sourceSpace.left) / width(sourceSpace),
		y: targetSpace.top + height(targetSpace) * (point.y - sourceSpace.top) / height(sourceSpace),
	};
}

export function distance(point0: Vector2, point1: Vector2) {
	const dx = point0.x - point1.x;
	const dy = point0.y - point1.y;
	return Math.sqrt(dx * dx + dy * dy);
}
