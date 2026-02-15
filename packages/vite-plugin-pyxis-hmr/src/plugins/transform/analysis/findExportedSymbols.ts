import type * as AST from "@oxc-project/types";

import type { SymbolMeta } from "./types";

export function findExportedSymbols(ast: AST.Program) {
	const symbols: SymbolMeta[] = [];
	for (const node of ast.body) {
		switch (node.type) {
			case "VariableDeclaration":
			case "FunctionDeclaration":
			case "ClassDeclaration":
				findDeclaredSymbols(symbols, node, null);
				break;

			case "ExportNamedDeclaration":
				// may be a direct named export, e.g.:
				// export const a = 123;
				if (node.declaration) {
					findDeclaredSymbols(symbols, node.declaration, node);
				}

				// or a named reference export:
				// export { a, b, c };
				for (const ref of node.specifiers) {
					if (ref.local.type !== "Identifier" || ref.exported.type !== "Identifier") {
						// exporting under literals is not supported
						continue;
					}

					const localName = ref.local.name;
					const symbol = symbols.findLast(it => it.name === localName && it.exportedBy !== node);
					if (symbol) {
						symbols.push({
							...symbol,
							exportedBy: node,
							exportedAs: ref.exported.name,
						});
					}
				}

				break;

			case "ExportDefaultDeclaration":
				// default export can be any expression -> detect references, otherwise use directly
				if (node.declaration.type === "Identifier") {
					const localName = node.declaration.name;
					const symbol = symbols.findLast(it => it.name === localName);
					if (symbol) {
						symbols.push({
							...symbol,
							exportedBy: node,
							exportedAs: "default",
						});
					}
				}
				else {
					symbols.push({
						type: "DefaultExport",
						name: "__default",
						expression: node.declaration as AST.Expression | AST.Function | AST.Class,
						exportedBy: node,
						exportedAs: "default",
					});
				}

				break;
		}
	}

	return symbols.filter(it => it.exportedBy);
}

function findDeclaredSymbols(
	symbols: SymbolMeta[],
	declaredBy: AST.Declaration,
	exportedBy: AST.ExportNamedDeclaration | AST.ExportDefaultDeclaration | null,
) {
	switch (declaredBy.type) {
		case "VariableDeclaration":
			findDeclaredVariables(symbols, declaredBy, exportedBy);
			break;

		case "FunctionDeclaration":
		case "ClassDeclaration": {
			if (!declaredBy.id) {
				break;
			}

			const name = declaredBy.id.name;
			symbols.push({
				type: "Declaration",
				name,
				declaredBy,
				exportedBy,
				exportedAs: name,
			});

			break;
		}
	}
}

function findDeclaredVariables(
	symbols: SymbolMeta[],
	declaredBy: AST.VariableDeclaration,
	exportedBy: AST.ExportNamedDeclaration | AST.ExportDefaultDeclaration | null,
) {
	for (const decl of declaredBy.declarations) {
		if (decl.init) {
			if (isBindingPattern(decl.id)) {
				// variable declarations via a binding pattern, e.g.:
				// const { a, b } = obj;
				// const [ x, y ] = arr;
				//
				// here id points to `obj` or `arr` -> we don't care about it

				findDestructuredVariables(decl.id, symbols, declaredBy, exportedBy);
			}
			else {
				// variable initialized to an expression, e.g.:
				// const x = 123;

				if (decl.id.type !== "Identifier") {
					continue;
				}

				const name = decl.id.name;
				symbols.push({
					type: "Variable",
					name,
					init: decl.init,
					declaredBy,
					exportedBy,
					exportedAs: name,
				});
			}
		}
		else {
			// variable declaration without an init, e.g.:
			// let x;

			if (decl.id.type !== "Identifier") {
				continue;
			}

			const name = decl.id.name;
			symbols.push({
				type: "Variable",
				name,
				declaredBy,
				exportedBy,
				exportedAs: name,
			});
		}
	}
}

function findDestructuredVariables(
	node: AST.BindingPattern | AST.BindingRestElement | null | undefined,
	symbols: SymbolMeta[],
	declaredBy: AST.VariableDeclaration,
	exportedBy: AST.ExportNamedDeclaration | AST.ExportDefaultDeclaration | null,
) {
	switch (node?.type) {
		case "Identifier":
			// currently, we don't make any effort to understand where values come from when using
			// object or array destructuring patterns - it's enough to know the exported names
			symbols.push({
				type: "Variable",
				name: node.name,
				declaredBy,
				exportedBy,
				exportedAs: node.name,
			});

			break;

		case "AssignmentPattern":
			findDestructuredVariables(node.left, symbols, declaredBy, exportedBy);
			break;

		case "ObjectPattern":
			for (const prop of node.properties) {
				findDestructuredVariables(prop.value, symbols, declaredBy, exportedBy);
			}

			break;

		case "ArrayPattern":
			for (const elem of node.elements) {
				const arg = elem?.type === "RestElement" ? elem.argument : elem;
				findDestructuredVariables(arg, symbols, declaredBy, exportedBy);
			}

			break;
	}
}

function isBindingPattern(node: AST.Node): node is AST.ObjectPattern | AST.ArrayPattern {
	const { type } = node;
	return (
		type === "ObjectPattern" ||
		type === "ArrayPattern"
	);
}
