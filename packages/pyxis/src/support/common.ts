import type { Template } from "~/Component";

export const EMPTY_ARRAY = Object.freeze([] as const);

export const EMPTY_TEMPLATE: Template = () => null;

export function isNil(input: unknown): input is null | undefined {
	return input === null || input === undefined;
}
