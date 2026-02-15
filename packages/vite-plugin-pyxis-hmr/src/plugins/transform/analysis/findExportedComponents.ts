import type * as AST from "@oxc-project/types";

import type { PyxisHmrPluginOptions } from "~/types";
import type { ComponentSymbolMeta, SymbolMeta } from "./types";

const HASH_LENGTH = 16;

interface ComponentChecker {
	(node: AST.Node): boolean;
}

export function findExportedComponents(
	ast: AST.Program,
	exportedSymbols: readonly SymbolMeta[],
	{ pyxisModule, componentFactory }: Required<PyxisHmrPluginOptions>,
	moduleId: string,
) {
	// identify nodes of interest within the program
	const pyxisImports: AST.ImportDeclaration[] = [];
	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration") {
			continue;
		}

		if (node.importKind !== "type" && node.source.value === pyxisModule) {
			pyxisImports.push(node);
		}
	}

	if (pyxisImports.length === 0) {
		// no relevant import found
		return [];
	}

	// detect the standard way of importing the factory, e.g.:
	// import { component } from "@calmdown/pyxis";
	const isComponentFactoryImport = (node: AST.ImportDeclarationSpecifier): node is AST.ImportSpecifier => (
		node.type === "ImportSpecifier" &&
		node.imported.type === "Identifier" &&
		node.imported.name === componentFactory
	);

	// detect a namespace import, e.g.:
	// import * as Pyxis from "@calmdown/pyxis";
	const isNamespaceImport = (node: AST.ImportDeclarationSpecifier) => (
		node.type === "ImportNamespaceSpecifier"
	);

	const checkers: ComponentChecker[] = [];
	for (const importDecl of pyxisImports) {
		const namespaceImport = importDecl.specifiers.find(isNamespaceImport);
		if (namespaceImport) {
			const namespaceLocalName = namespaceImport.local.name;
			checkers.push(node => (
				node.type === "MemberExpression" &&
				node.object.type === "Identifier" &&
				node.object.name === namespaceLocalName &&
				node.property.type === "Identifier" &&
				node.property.name === componentFactory
			));

			continue;
		}

		const factoryImport = importDecl.specifiers.find(isComponentFactoryImport);
		if (factoryImport) {
			const factoryLocalName = factoryImport.local.name;
			checkers.push(node => (
				node.type === "Identifier" &&
				node.name === factoryLocalName
			));
		}
	}

	if (checkers.length === 0) {
		// component factory is not imported
		return [];
	}

	const isComponent = (node: AST.Node): node is AST.CallExpression => (
		node.type === "CallExpression" &&
		checkers.some(check => check(node.callee))
	);

	const components: ComponentSymbolMeta[] = [];
	const addComponent = (symbol: SymbolMeta, expression: AST.CallExpression) => {
		components.push({
			name: symbol.name,
			id: `${moduleId}:${symbol.name}`,
			expression,
		});
	};

	for (const symbol of exportedSymbols) {
		switch (symbol.type) {
			case "Variable":
				if (symbol.init && isComponent(symbol.init)) {
					addComponent(symbol, symbol.init);
				}

				break;

			case "DefaultExport":
				if (isComponent(symbol.expression)) {
					addComponent(symbol, symbol.expression);
				}

				break;
		}
	}

	return components;
}
