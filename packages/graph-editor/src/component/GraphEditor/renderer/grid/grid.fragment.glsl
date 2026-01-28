#version 300 es
precision mediump float;

in vec2 vGridPosition;

layout(location = 0) out vec4 fragColor;

uniform float uGridSize;
uniform vec3 uBackgroundColor;
uniform vec3 uGridlineColor;

void main() {
	// strictly align to one side, avoiding double-width or disjoint grid lines.
	float halfSize = floor(uGridSize * 0.5);
	float dx = floor(mod(vGridPosition[0], uGridSize) - halfSize);
	float dy = floor(mod(vGridPosition[1], uGridSize) - halfSize);

	float gridLineDist = min(abs(dx), abs(dy));
	float gridCrossDistSqr = dx * dx + dy * dy;

	// classic grid
	// fragColor = vec4(mix(uBackgroundColor, uGridlineColor, float(gridLineDist == 0.0)), 1.0);

	// cross grid
	fragColor = vec4(mix(uBackgroundColor, uGridlineColor, float(gridLineDist == 0.0 && gridCrossDistSqr < 20.0)), 1.0);
}
