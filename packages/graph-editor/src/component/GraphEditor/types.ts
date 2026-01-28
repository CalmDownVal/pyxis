import type { Rgb } from "~/support/color";
import type { Size, Point } from "~/support/math";

export interface RendererInit {
	readonly backgroundColor: Rgb;
	readonly gridlineColor: Rgb;
}

export interface RendererState {
	readonly gridOffset: Point;
	readonly gridSize: number;
}

export interface Renderer {
	render: (state: RendererState) => void;
	resize?: (size: Size) => void;
}
