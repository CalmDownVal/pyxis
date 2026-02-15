import type * as AST from "@oxc-project/types";

import type { CodeTransform, ComponentSymbolMeta, SymbolMeta } from "./types";

type ExpectedNode =
	| AST.VariableDeclaration
	| AST.Function
	| AST.Class
	| AST.ExportNamedDeclaration
	| AST.ExportDefaultDeclaration;

export function generateCodeTransforms(
	exportedSymbols: readonly SymbolMeta[],
	exportedComponents: readonly ComponentSymbolMeta[],
) {
	// find distinct nodes of interest
	const nodes = new Set<ExpectedNode>();
	for (const symbol of exportedSymbols) {
		switch (symbol.type) {
			case "Variable":
			case "Declaration":
				nodes.add(symbol.declaredBy);
				break;
		}

		if (symbol.exportedBy) {
			nodes.add(symbol.exportedBy);
		}
	}

	const transforms: CodeTransform[] = [];
	for (const component of exportedComponents) {
		transformComponent(transforms, component);
	}

	for (const node of nodes) {
		switch (node.type) {
			case "VariableDeclaration":
				transformToMutableVariable(transforms, node);
				break;

			case "ClassDeclaration":
			case "FunctionDeclaration":
				assignToMutableVariable(transforms, node);
				break;

			case "ExportNamedDeclaration":
				removeNamedExport(transforms, node);
				break;

			case "ExportDefaultDeclaration":
				removeDefaultExport(transforms, node);
				break;
		}
	}

	return transforms;
}

function transformComponent(
	transforms: CodeTransform[],
	component: ComponentSymbolMeta,
) {
	transforms.push({
		node: component.expression,
		block: originalCode => {
			return `__hmrWrap(${originalCode}, ${JSON.stringify(component.id)})`;
		},
	})
}

function transformToMutableVariable(transforms: CodeTransform[], node: AST.VariableDeclaration) {
	if (node.kind !== "const") {
		// only transform consts, leave vars & lets as-is
		return;
	}

	transforms.push({
		node,
		block: originalCode => {
			const match = /^\s*const\s+/.exec(originalCode);
			return match
				? "let " + originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}

function assignToMutableVariable(transforms: CodeTransform[], node: AST.Function | AST.Class) {
	transforms.push({
		node,
		block: originalCode => `let ${node.id!.name} = ${originalCode};`,
	});
}

function removeNamedExport(transforms: CodeTransform[], node: AST.ExportNamedDeclaration) {
	transforms.push({
		node,
		block: originalCode => {
			if (!node.declaration) {
				return "";
			}

			const match = /^\s*export\s+/.exec(originalCode);
			return match
				? originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}

function removeDefaultExport(transforms: CodeTransform[], node: AST.ExportDefaultDeclaration) {
	transforms.push({
		node,
		block: originalCode => {
			if (node.declaration.type === "Identifier") {
				return "";
			}

			const match = /^\s*export\s+default\s+/.exec(originalCode);
			return match
				? "let __default = " + originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}
