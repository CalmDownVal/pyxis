export type Rgb = number;
export type RgbVector = [ r: number, g: number, b: number ];

export function rgb2vec(rgb: Rgb): RgbVector {
	return [
		((rgb >> 16) & 255) / 255.0, // R
		((rgb >>  8) & 255) / 255.0, // G
		( rgb        & 255) / 255.0  // B
	];
}
