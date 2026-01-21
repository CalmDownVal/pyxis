#version 300 es
precision mediump float;

in vec2 vGridPosition;

layout(location = 0) out vec4 fragColor;

uniform float uGridSize;
uniform vec3 uBackgroundColor;
uniform vec3 uGridlineColor;

void main() {
	// Flooring to strictly align to one side, avoiding double-width or disjoint gridlines.
	float halfSize = floor(uGridSize / 2.0);
	float gridlineDist = min(
		abs(floor(mod(vGridPosition[0], uGridSize) - halfSize)),
		abs(floor(mod(vGridPosition[1], uGridSize) - halfSize))
	);

	fragColor = vec4(mix(uBackgroundColor, uGridlineColor, float(gridlineDist == 0.0)), 1.0);
}
