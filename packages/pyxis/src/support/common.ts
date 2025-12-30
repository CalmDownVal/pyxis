import type { Template } from "~/Component";

export const EMPTY_ARRAY = Object.freeze([] as const);

export const EMPTY_OBJECT = Object.freeze({} as const);

export const EMPTY_TEMPLATE: Template = () => null;

export function wrap<T>(input: T | T[]): readonly T[] {
	return Array.isArray(input)
		? input
		: isNil(input)
			? EMPTY_ARRAY
			: [ input ];
}

export function isNil(input: unknown): input is null | undefined {
	return input === null || input === undefined;
}
