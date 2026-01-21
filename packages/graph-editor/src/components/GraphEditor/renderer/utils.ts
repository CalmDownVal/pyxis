export interface ShaderArgs {
	readonly source: string;
	readonly type: number;
}

export interface ProgramArgs {
	readonly shaders: readonly ShaderArgs[];
	readonly attributes: readonly string[];
	readonly uniforms: readonly string[];
}

type KeysOf<T> = T extends readonly (infer TKey)[] ? TKey : PropertyKey;
type ReadonlyRecord<K extends PropertyKey, T> = { readonly [P in K]: T };

export function createProgram<TArgs extends ProgramArgs>(gl: WebGL2RenderingContext, args: TArgs) {
	const program = gl.createProgram()!;
	for (const shaderArgs of args.shaders) {
		const shader = compileShader(gl, shaderArgs);
		gl.attachShader(program, shader);
	}

	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error("Error linking program:\n" + gl.getProgramInfoLog(program));
	}

	return {
		ref: program,
		attributes: mapTuple(args.attributes, name => gl.getAttribLocation(program, name)),
		uniforms: mapTuple(args.uniforms, name => gl.getUniformLocation(program, name)!),
	};
}

function compileShader(gl: WebGL2RenderingContext, args: ShaderArgs) {
	const shader = gl.createShader(args.type)!;
	gl.shaderSource(shader, args.source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const type = {
			[gl.VERTEX_SHADER]: "vertex",
			[gl.FRAGMENT_SHADER]: "fragment"
		}[args.type] || "a";

		throw new Error(`Error compiling ${type} shader:\n${gl.getShaderInfoLog(shader)}`);
	}

	return shader;
}

function mapTuple<K extends PropertyKey, T>(tuple: readonly K[], callback: (key: K) => T) {
	const map: Record<PropertyKey, T> = {};
	for (const key of tuple) {
		map[key] = callback(key as K);
	}

	return map as ReadonlyRecord<K, T>;
}
