import type { Renderer, RendererInit } from "../types";
import { createGridRenderer } from "./grid/GridRenderer";

export function createGLRenderer(canvas: HTMLCanvasElement, init: RendererInit): Renderer {
	const gl = canvas.getContext("webgl2", {
		alpha: false,
		antialias: false,
		depth: false,
		desynchronized: true,
		failIfMajorPerformanceCaveat: true,
		powerPreference: "high-performance",
		premultipliedAlpha: false,
		preserveDrawingBuffer: false,
		stencil: false,
	});

	if (!gl) {
		throw new Error("failed to obtain WebGL2 context");
	}

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	const gridRenderer = createGridRenderer(gl, init);

	return {
		render: state => {
			gridRenderer.render(state);
		},
		resize: size => {
			if (canvas.width === size.width && canvas.height === size.height) {
				return;
			}

			canvas.width = size.width;
			canvas.height = size.height;
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		},
	};
}
