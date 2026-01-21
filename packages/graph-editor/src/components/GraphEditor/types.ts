import type { Rgb } from "~/support/color";
import type { Size, Vector2 } from "~/support/math";

export interface RendererInit {
	readonly backgroundColor: Rgb;
	readonly gridlineColor: Rgb;
}

export interface RendererState {
	readonly gridOffset: Vector2;
	readonly gridSize: number;
}

export interface Renderer {
	render: (state: RendererState) => void;
	resize: (size: Size) => void;
}
