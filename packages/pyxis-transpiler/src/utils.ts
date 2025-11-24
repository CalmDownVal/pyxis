import type { Node } from "ts-morph";
import { WarningCode, type TranspilerContext, type Warning } from "./types";

export function noop() {}

const S_CODE = Symbol.for("code");

interface CodeSnippet {
	readonly [S_CODE]: true;
	readonly source: string;
}

export function snippet(source: string): CodeSnippet {
	return {
		[S_CODE]: true,
		source,
	};
}

export function getCode(value: unknown) {
	return value !== null && typeof value === "object" && (value as Partial<CodeSnippet>)[S_CODE] === true
		? (value as CodeSnippet).source
		: "" + value;
}

export function addImport(context: TranspilerContext, name: string) {
	context.imports.set(name, { isTypeOnly: false });
}

export function addTypeImport(context: TranspilerContext, name: string) {
	const prev = context.imports.get(name);
	if (prev) {
		return;
	}

	context.imports.set(name, { isTypeOnly: true });
}

export function warn(context: TranspilerContext, code: WarningCode, message: string, node: Node) {
	context.options.warn({
		code,
		message,
		atLine: node.getStartLineNumber(),
		atColumn: node.getNonWhitespaceStart() - node.getStartLinePos() + 1,
		toString: warningToString,
	});
}

function warningToString(this: Warning) {
	return `[${WarningCode[this.code]}] ${this.message} at ${this.atLine}:${this.atColumn}`;
}
