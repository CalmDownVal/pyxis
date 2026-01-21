#version 300 es

in vec2 aClipPosition;

out vec2 vGridPosition;

uniform vec2 uScreenSize;
uniform vec2 uGridOffset;

void main() {
	gl_Position = vec4(aClipPosition, 0.0, 1.0);

	// Assuming that aClipPosition is +1 xor -1 and uGridOffset is an integer,
	// the final vGridPosition vector will have integer coordinates.
	vec2 mapping = vec2(
		(aClipPosition[0] * -0.5) + 0.5,
		(aClipPosition[1] *  0.5) + 0.5
	);

	vec2 offset = vec2(
		floor(uScreenSize[0] * 0.5),
		floor(uScreenSize[1] * 0.5)
	);

	vGridPosition = uScreenSize * mapping - offset + uGridOffset;
}
