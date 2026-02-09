import { createHash } from "node:crypto";

import type * as AST from "@oxc-project/types";
import type { Plugin } from "vite";

import { PLUGIN_NAME, REGISTRY_IMPORT, type PyxisHmrPluginOptions } from "~/common";

const HASH_LENGTH = 16;

export function pyxisHmrTransformPlugin(options: Required<PyxisHmrPluginOptions>): Plugin {
	return {
		name: `${PLUGIN_NAME}:transform`,
		transform: {
			filter: {
				id: /\.[jt]sx?$/i,
			},
			async handler(code, moduleId) {
				const ast = this.parse(code, { astType: "js" });
				const components = findExportedComponents(ast, options);
				if (components.length === 0) {
					return null;
				}

				let newCode = code;
				let offset = 0;
				for (const { name, expr } of components) {
					const hash = getComponentHash(moduleId, name);

					const original = code.slice(expr.start, expr.end);
					const wrapped = `__hmrWrap(${JSON.stringify(hash)}, ${original})`;
					newCode = newCode.slice(0, offset + expr.start) + wrapped + newCode.slice(offset + expr.end);
					offset += wrapped.length - original.length;
				}

				const preamble = `\
import * as __hmrPyxis from ${JSON.stringify(options.pyxisModule)};
import __hmrRegistry from ${JSON.stringify(REGISTRY_IMPORT)};

if (import.meta.hot) {
	import.meta.hot.accept(() => {});
}

function __hmrWrap(hash, original) {
	if (!import.meta.hot) {
		return original;
	}

	__hmrRegistry.current.upsert(hash, original);
	return (group, jsx, parent, before, level) => {
		const symbol = Object.getOwnPropertySymbols(jsx)[0];
		const subGroup = __hmrPyxis.split(group);
		const listener = __hmrRegistry.current.on(hash, current => {
			const anchor = subGroup.top?.[subGroup.top.length - 1]?.nextSibling ?? null;
			__hmrPyxis.unmount(subGroup);
			__hmrPyxis.mount(subGroup, () => ({ ...jsx, [symbol]: current }), undefined, parent, anchor);
		});

		__hmrPyxis.unmounted(() => __hmrRegistry.current.off(listener), group);
	};
}

`;

				return preamble + newCode;
			},
		},
	};
}

interface ComponentSite {
	name: string;
	expr: AST.CallExpression;
}

function findExportedComponents(ast: AST.Program, { pyxisModule, componentFactory }: Required<PyxisHmrPluginOptions>) {
	const pyxisImports: AST.ImportDeclaration[] = [];
	const namedExports: AST.ExportNamedDeclaration[] = [];
	const defaultExports: AST.ExportDefaultDeclaration[] = [];
	const maybeComponents: { [TName in string]?: AST.CallExpression } = {};

	// identify nodes of interest within the program
	for (const node of ast.body) {
		switch (node.type) {
			case "ImportDeclaration":
				if (node.importKind !== "type" && node.source.value === pyxisModule) {
					pyxisImports.push(node);
				}

				break;

			case "ExportNamedDeclaration":
				namedExports.push(node);
				break;

			case "ExportDefaultDeclaration":
				defaultExports.push(node);
				break;

			case "VariableDeclaration":
				for (const decl of node.declarations) {
					if (decl.id.type === "Identifier" && decl.init?.type === "CallExpression") {
						maybeComponents[decl.id.name] = decl.init;
					}
				}

				break;
		}
	}

	if (pyxisImports.length === 0 || (namedExports.length + defaultExports.length) === 0) {
		// nothing relevant found, exit early
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

	const checkers: ((node: AST.Node) => boolean)[] = [];
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
		// component factory is not imported, exit early
		return [];
	}


	// find exported components and their names
	const isComponent = (expr: AST.CallExpression) => checkers.some(check => check(expr.callee));
	const components = new Map<AST.Node, ComponentSite>();

	for (const exportDecl of namedExports) {
		// detect indirect exports, e.g.:
		// const MyComponent = component((props) => ...);
		// export { MyComponent };
		for (const exportSpec of exportDecl.specifiers) {
			let componentExpr;
			if (exportSpec.local.type === "Identifier" &&
				exportSpec.exported.type === "Identifier" &&
				(componentExpr = maybeComponents[exportSpec.local.name]) &&
				isComponent(componentExpr)
			) {
				components.set(componentExpr, {
					name: exportSpec.exported.name,
					expr: componentExpr,
				});
			}
		}

		// detect direct exports, e.g.:
		// export const MyComponent = component((props) => ...);
		if (exportDecl.declaration?.type !== "VariableDeclaration") {
			continue;
		}

		for (const varDecl of exportDecl.declaration.declarations) {
			if (varDecl.id.type === "Identifier" &&
				varDecl.init?.type === "CallExpression" &&
				isComponent(varDecl.init)
			) {
				components.set(varDecl.init, {
					name: varDecl.id.name,
					expr: varDecl.init,
				});
			}
		}
	}

	for (const exportDecl of defaultExports) {
		switch (exportDecl.declaration.type) {
			case "CallExpression":
				if (isComponent(exportDecl.declaration)) {
					components.set(exportDecl.declaration, {
						name: "default",
						expr: exportDecl.declaration,
					});
				}

				break;

			case "Identifier": {
				let componentExpr;
				if ((componentExpr = maybeComponents[exportDecl.declaration.name]) &&
					isComponent(componentExpr)
				) {
					components.set(componentExpr, {
						name: "default",
						expr: componentExpr,
					});
				}

				break;
			}
		}
	}

	return Array
		.from(components.values())
		.sort((a, b) => a.expr.start - b.expr.start);
}

function getComponentHash(
	moduleId: string,
	componentName: string,
) {
	return createHash("md5")
		.update(`${moduleId}:${componentName}`, "utf8")
		.digest("base64")
		.slice(0, HASH_LENGTH);
}
