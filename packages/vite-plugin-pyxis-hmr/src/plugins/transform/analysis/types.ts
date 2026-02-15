import type * as AST from "@oxc-project/types";

interface SymbolMetaBase<TType extends string> {
	readonly type: TType;
	readonly name: string;
	readonly exportedBy?: AST.ExportNamedDeclaration | AST.ExportDefaultDeclaration | null;
	readonly exportedAs?: string;
}

/** a top-level scope variable */
export interface VariableSymbolMeta extends SymbolMetaBase<"Variable"> {
	readonly init?: AST.Expression;
	readonly declaredBy: AST.VariableDeclaration;
	isComponent?: boolean;
	hash?: string;
}

/** a top-level scope non-variable declaration, i.e.: functions, classes */
export interface DeclarationSymbolMeta extends SymbolMetaBase<"Declaration"> {
	readonly declaredBy: AST.Function | AST.Class;
}

/** an arbitrary expression exposed directly via default export */
export interface DefaultExportedExpressionMeta extends SymbolMetaBase<"DefaultExport"> {
	readonly expression: AST.Expression | AST.Function | AST.Class;
}

export interface ComponentSymbolMeta {
	readonly name: string;
	readonly id: string;
	readonly expression: AST.CallExpression;
}

export type SymbolMeta =
	| VariableSymbolMeta
	| DeclarationSymbolMeta
	| DefaultExportedExpressionMeta;

export interface CodeTransform {
	readonly node: AST.Node;
	readonly block: (originalCode: string) => string;
}
