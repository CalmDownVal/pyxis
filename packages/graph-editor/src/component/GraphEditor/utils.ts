import { clamp, lerp, type Point, type Rect, type Size } from "~/support/math";

export function toEditorSpace(editorSpace: Rect, clientPoint: Point, clientSize: Size): Point {
	return {
		x: lerp(editorSpace.left, editorSpace.right, clamp(clientPoint.x / clientSize.width)),
		y: lerp(editorSpace.top, editorSpace.bottom, clamp(clientPoint.y / clientSize.height)),
	};
}
