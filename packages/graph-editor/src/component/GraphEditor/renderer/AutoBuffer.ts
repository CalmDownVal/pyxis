import { PHI } from "~/support/math";

/**
 * Used to cache the size of GL buffers to avoid calling `getBufferParameter`
 * which tends to be very sluggish for some reason...
 */
export interface WebGLBufferKnownSize {
	readonly ref: WebGLBuffer;
	size: number;
}

export function createBufferKnownSize(gl: WebGL2RenderingContext): WebGLBufferKnownSize {
	return {
		ref: gl.createBuffer()!,
		size: 0,
	};
}

export interface AutoBuffer<TData extends TypedArray> {
	readonly capacity: number;
	readonly data: TData | null;
	readonly ensure: (requiredCapacity: number, preserveContents?: boolean) => boolean;
	readonly commit: (gl: WebGL2RenderingContext, buffer: WebGLBufferKnownSize | WebGLBuffer) => void;
	growthFactor: number;
}

// only number arrays are supported, not bigint
export type TypedArray =
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array;

export interface AutoBufferInit<TData extends TypedArray> {
	/**
	 * The allocator.
	 */
	alloc: (capacity: number) => TData;

	/**
	 * The initial size of the buffer.
	 */
	initialCapacity: number;

	/**
	 * The factor used to grow the buffer when allocating more space. Must be
	 * greater than one.
	 *
	 * Defaults to the golden ratio.
	 */
	growthFactor?: number;

	/**
	 * The binding target for the buffer, a GL constant.
	 *
	 * Defaults to gl.ARRAY_BUFFER.
	 */
	target?: number;
}

export function createAutoBuffer<TData extends TypedArray>(init: AutoBufferInit<TData>): AutoBuffer<TData> {
	const buffer: AutoBufferInternal<TData> = {
		target: init.target,
		capacity: 0,
		data: null,
		growthFactor: init.growthFactor ?? PHI,
		usedCapacity: 0,
		alloc: init.alloc,
		ensure,
		commit,
	};

	return buffer;
}

interface AutoBufferInternal<TData extends TypedArray = TypedArray> extends Omit<AutoBuffer<TData>, "data" | "capacity"> {
	readonly target?: number;
	readonly alloc: (capacity: number) => TData;
	capacity: number;
	data: TData | null;
	usedCapacity: number;
}

function ensure(this: AutoBufferInternal, requiredCapacity: number, preserveContents = true) {
	this.usedCapacity = requiredCapacity;

	const oldCapacity = Math.max(this.data?.length ?? 0, 1);
	if (requiredCapacity < oldCapacity) {
		return false;
	}

	const exponent = Math.ceil(Math.log(requiredCapacity / oldCapacity) / Math.log(this.growthFactor));
	const newCapacity = Math.round(oldCapacity * this.growthFactor ** exponent);
	const oldData = this.data;

	this.data = this.alloc(newCapacity);
	if (preserveContents && oldData) {
		this.data.set(oldData);
	}

	return true;
}

function commit(this: AutoBufferInternal, gl: WebGL2RenderingContext, buffer: WebGLBufferKnownSize | WebGLBuffer) {
	if (!this.data) {
		throw new Error("cannot commit unallocated buffer");
	}

	const target = this.target ?? gl.ARRAY_BUFFER;

	let bks: WebGLBufferKnownSize
	if (isKnownSize(buffer)) {
		gl.bindBuffer(target, buffer.ref);
		bks = buffer;
	}
	else {
		gl.bindBuffer(target, buffer);
		bks = {
			ref: buffer,
			size: gl.getBufferParameter(target, gl.BUFFER_SIZE),
		};
	}

	const requiredSize = this.usedCapacity * this.data.BYTES_PER_ELEMENT;
	if (bks.size < requiredSize) {
		gl.bufferData(target, this.data, gl.DYNAMIC_READ);
		bks.size = this.data.byteLength;
	}
	else {
		gl.bufferSubData(target, 0, this.data, 0, this.usedCapacity);
	}

	return bks;
}

function isKnownSize(buffer: WebGLBufferKnownSize | WebGLBuffer): buffer is WebGLBufferKnownSize {
	return (buffer as Partial<WebGLBufferKnownSize>).ref !== undefined;
}
