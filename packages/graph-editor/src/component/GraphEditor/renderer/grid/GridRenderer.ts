import { rgb2vec } from "~/support/color";

import type { Renderer, RendererInit } from "../../types";
import { createProgram } from "../utils";
import gridFragmentShader from "./grid.fragment.glsl";
import gridVertexShader from "./grid.vertex.glsl";

export function createGridRenderer(gl: WebGL2RenderingContext, init: RendererInit): Renderer {
	const program = createProgram(gl, {
		shaders: [
			{
				source: gridVertexShader,
				type: gl.VERTEX_SHADER
			},
			{
				source: gridFragmentShader,
				type: gl.FRAGMENT_SHADER
			},
		],
		attributes: [ "aClipPosition" ],
		uniforms: [ "uScreenSize", "uGridOffset", "uGridSize", "uBackgroundColor", "uGridlineColor" ],
	} as const);

	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	const clipPosGlBuffer = gl.createBuffer();
	const clipPosData = new Int8Array([
		-1.0, -1.0,
		 1.0, -1.0,
		-1.0,  1.0,
		 1.0,  1.0,
	]);

	gl.bindBuffer(gl.ARRAY_BUFFER, clipPosGlBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, clipPosData, gl.STATIC_READ);

	gl.enableVertexAttribArray(program.attributes.aClipPosition);
	gl.vertexAttribPointer(program.attributes.aClipPosition, 2, gl.BYTE, false, 0, 0);

	const backgroundColor = rgb2vec(init.backgroundColor);
	const gridlineColor = rgb2vec(init.gridlineColor);

	return {
		render: state => {
			gl.useProgram(program.ref);
			gl.bindVertexArray(vao);

			const u = program.uniforms;
			gl.uniform2fv(u.uScreenSize, [ gl.drawingBufferWidth, gl.drawingBufferHeight ]);
			gl.uniform2fv(u.uGridOffset, [ state.gridOffset.x, state.gridOffset.y ]);
			gl.uniform1f(u.uGridSize, state.gridSize);
			gl.uniform3fv(u.uBackgroundColor, backgroundColor);
			gl.uniform3fv(u.uGridlineColor, gridlineColor);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		},
	};
}
