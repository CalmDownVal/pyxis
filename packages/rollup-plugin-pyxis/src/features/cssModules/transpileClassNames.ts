import type { ResolvedPyxisPluginOptions } from "~/options";
import { walkDown, type AST, type TransformBlock, type TranspileCall } from "~/transpiler";
import { getPackageChecker } from "~/utils";

import type { ClassNameMap } from "./common";

interface SymbolInfo {
	readonly name: string;
	readonly kind: "jsx" | "namespace";
}

const isJsxFactory: { [K in string]?: true } = {
	jsx: true,
	jsxs: true,
	jsxDEV: true,
};

export async function transpileClassNames(
	{ ast, transpiler, shortModuleId }: TranspileCall,
	{ pyxisModule, cssModules }: ResolvedPyxisPluginOptions,
	resolveCssExports: (source: string) => Promise<ClassNameMap>,
) {
	// find CSS and pyxis imports of JSX factories within the program
	const imported: { [N in string]?: SymbolInfo } = {};
	const classNameMap: ClassNameMap = {};
	const isPyxisPackage = getPackageChecker(pyxisModule);
	let hasCssImports = false;

	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration" || node.importKind === "type") {
			continue;
		}

		if (cssModules!.include.test(node.source.value)) {
			const map = await resolveCssExports(node.source.value);
			Object.assign(classNameMap, map);
			hasCssImports = true;
			continue;
		}

		if (!isPyxisPackage(node.source.value)) {
			continue;
		}

		for (const spec of node.specifiers) {
			switch (spec.type) {
				case "ImportSpecifier":
					if (spec.importKind !== "type" &&
						spec.imported.type === "Identifier" &&
						isJsxFactory[spec.imported.name]
					) {
						imported[spec.local.name] = {
							name: spec.imported.name,
							kind: "jsx",
						};
					}

					break;

				case "ImportNamespaceSpecifier":
					imported[spec.local.name] = {
						name: spec.local.name,
						kind: "namespace",
					};

					break;

				// pyxis doesn't have default exports
			}
		}
	}

	if (!hasCssImports) {
		return;
	}

	// identify and transpile relevant CSS class names within the program
	const extPrefix = cssModules!.cssExtensionPrefix;
	const transpileJsxAttribute = (attribute: AST.JSXAttribute) => {
		let newClassName;
		if (attribute.name.type === "JSXNamespacedName" &&
			attribute.name.namespace.name === extPrefix &&
			(newClassName = classNameMap[attribute.name.name.name])
		) {
			transpiler.addTransform(attribute.name.name, rewriteAttributeName(newClassName));
		}
	};

	const transpileJsxFactoryCall = (factory: AST.CallExpression) => {
		if (factory.arguments.length < 2) {
			return;
		}

		const propsArg = factory.arguments[1];
		if (propsArg.type !== "ObjectExpression") {
			return;
		}

		let key;
		let newClassName;
		for (const prop of propsArg.properties) {
			if (prop.type === "Property" &&
				prop.key.type === "Literal" &&
				typeof (key = prop.key.value) === "string" &&
				key.startsWith(`${extPrefix}:`) &&
				(newClassName = classNameMap[key.slice(extPrefix.length + 1)])
			) {
				transpiler.addTransform(prop.key, rewritePropKeyLiteral(`${extPrefix}:${newClassName}`));
			}
		}
	};

	walkDown(ast, {
		enter: node => {
			if (node.type === "JSXAttribute") {
				transpileJsxAttribute(node);
			}
			else if (node.type === "CallExpression") {
				let tmp;
				switch (node.callee.type) {
					case "Identifier":
						if ((tmp = imported[node.callee.name]) && tmp.kind !== "namespace") {
							transpileJsxFactoryCall(node);
						}

						break;

					case "MemberExpression":
						if (node.callee.property.type === "Identifier" &&
							isJsxFactory[node.callee.property.name] &&
							node.callee.object.type === "Identifier" &&
							(tmp = imported[node.callee.object.name]) &&
							tmp.kind === "namespace"
						) {
							transpileJsxFactoryCall(node);
						}

						break;
				}
			}
		},
	});
}

const rewriteAttributeName = (newName: string): TransformBlock => (originalCode, start) => {
	const removed = originalCode.length;
	return {
		newCode: newName,
		edits: [
			{
				at: start,
				delta: -removed,
			},
			{
				at: start + removed,
				delta: newName.length,
			},
		],
	};
};

const rewritePropKeyLiteral = (newName: string): TransformBlock => (originalCode, start) => {
	// verify it's a quoted string literal
	if (originalCode[0] !== originalCode[originalCode.length - 1] || !/["'`]/.test(originalCode[0])) {
		return null;
	}

	const newCode = JSON.stringify(newName);
	const removed = originalCode.length;
	return {
		newCode,
		edits: [
			{
				at: start,
				delta: -removed,
			},
			{
				at: start + removed,
				delta: newCode.length,
			},
		],
	};
};
