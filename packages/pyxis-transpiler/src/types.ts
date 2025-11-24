import type { Node, Symbol } from "ts-morph";

export interface TranspilerOptions {
	/** Specifies the Pyxis library import identifier. Defaults to "@calmdown/pyxis". */
	readonly pyxisImportId?: string;

	/** Specifies the Pyxis template factory identifier. Defaults to "template". */
	readonly templateFactoryId?: string;

	/** Specifies the output language. Defaults to "ts". */
	readonly outputAs?: "ts" | "js";

	/** A callback function to handle emitted warnings. Defaults to a no-op. */
	readonly warn?: WarningReporter;
}

export interface WarningReporter {
	(warning: Warning): void;
}

export interface Warning {
	code: WarningCode;
	message: string;
	atLine: number;
	atColumn: number;
	toString(): string;
}

export enum WarningCode {
	MULTIPLE_IMPORTS,
	INVALID_SIGNATURE,
	UNSUPPORTED_SYNTAX,
}

/** @internal */
export interface TranspilerContext {
	readonly options: Required<TranspilerOptions>;
	readonly imports: Map<string, ImportMeta>;
	readonly changes: (() => void)[];
	readonly indent: string;
	readonly modelRefs?: Map<Symbol, ModelRef>;
	readonly modelType?: string;
}

/** @internal */
export interface ImportMeta {
	readonly isTypeOnly: boolean;
}

/** @internal */
export interface WarningCallback {
	(code: WarningCode, message: string, node: Node): void;
}

/** @internal */
export type ModelRef = ModelObjectRef | ModelBoundRef;

/** @internal */
export interface ModelObjectRef {
	readonly kind: "object";
}

/** @internal */
export interface ModelBoundRef {
	readonly kind: "bound";
	readonly fieldId: string;
}
