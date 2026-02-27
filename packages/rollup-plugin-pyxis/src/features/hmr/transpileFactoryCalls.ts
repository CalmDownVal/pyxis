import { positionAt, walkDown, walkUp, type AST, type TransformBlock, type TranspileCall } from "~/transpiler";
import type { ModuleChecker } from "~/utils";

interface SymbolInfo {
	readonly kind: FactoryKind | "namespace";
	readonly name: string;
}

type FactoryKind =
	| "atom"
	| "component"
	| "context"
	| "list"
	| "provider";

const factoryKindMap: { [N in string]?: FactoryKind } = {
	atomOf: "atom",
	component: "component",
	createContext: "context",
	listOf: "list",
	providerOf: "provider",
};

const factoryArgCount: { [K in FactoryKind]: number } = {
	atom: 2,
	component: 1,
	context: 0,
	list: 2,
	provider: 2,
};

export interface TranspileFactoryCallsContext {
	isPyxisModule: ModuleChecker;
}

export async function transpileFactoryCalls({
	ast,
	code,
	moduleId,
	shortModuleId,
	transpiler,
	context: { isPyxisModule },
}: TranspileCall<TranspileFactoryCallsContext>) {
	// find pyxis imports within the program
	const imported: { [N in string]?: SymbolInfo } = {};
	let hasPyxisImports = false;

	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration" ||
			node.importKind === "type" ||
			!(await isPyxisModule(node.source.value, moduleId))
		) {
			continue;
		}

		for (const spec of node.specifiers) {
			let kind;
			switch (spec.type) {
				case "ImportSpecifier":
					if (spec.importKind !== "type" &&
						spec.imported.type === "Identifier" &&
						(kind = factoryKindMap[spec.imported.name])
					) {
						hasPyxisImports = true;
						imported[spec.local.name] = {
							name: spec.imported.name,
							kind,
						};
					}

					break;

				case "ImportNamespaceSpecifier":
					hasPyxisImports = true;
					imported[spec.local.name] = {
						name: spec.local.name,
						kind: "namespace",
					};

					break;

				// pyxis doesn't have default exports
			}
		}
	}

	if (!hasPyxisImports) {
		return;
	}

	// identify and transpile factory calls within the program, passing a hopefully unique devId
	const transpileCall = (factory: AST.CallExpression, kind: FactoryKind) => {
		const name = findNameFor(factory);
		const extraArgCount = factoryArgCount[kind] - factory.arguments.length;
		if (name && extraArgCount >= 0) {
			let devId;
			switch (kind) {
				case "atom":
				case "list":
				case "provider": {
					const pos = positionAt(code, factory.start);
					devId = `${shortModuleId}:${pos.line} ${name}`;
					break;
				}

				default:
					devId = `${shortModuleId} ${name}`;
					break;
			}

			transpiler.addTransform(factory, appendDevIdArgument(devId, extraArgCount));
		}
	};

	walkDown(ast, {
		enter: node => {
			if (node.type !== "CallExpression") {
				return;
			}

			let tmp;
			let kind;
			switch (node.callee.type) {
				case "Identifier":
					if ((tmp = imported[node.callee.name]) && tmp.kind !== "namespace") {
						transpileCall(node, tmp.kind);
					}

					break;

				case "MemberExpression":
					if (node.callee.property.type === "Identifier" &&
						(kind = factoryKindMap[node.callee.property.name]) &&
						node.callee.object.type === "Identifier" &&
						(tmp = imported[node.callee.object.name]) &&
						tmp.kind === "namespace"
					) {
						transpileCall(node, kind);
					}

					break;
			}

		},
	});
}

function findNameFor(node: AST.Node) {
	return walkUp(node.parent, parent => {
		switch (parent.type) {
			case "VariableDeclarator":
				return parent.id.type === "Identifier"
					? parent.id.name
					: undefined;

			case "Property":
				switch (parent.key.type) {
					case "Identifier":
						return parent.key.name;

					case "PrivateIdentifier":
						return parent.key.name;

					case "Literal":
						return typeof parent.key.value === "string"
							? parent.key.value
							: undefined;

					default:
						return undefined;
				}

			case "ExportDefaultDeclaration":
				return "default";

			default:
				return null;
		}
	});
}

const appendDevIdArgument = (devId: string, extraArgCount: number): TransformBlock => (originalCode, _start, end) => {
	const match = /\s*\)$/.exec(originalCode);
	if (!match) {
		return null;
	}

	const slicedStart = originalCode.slice(0, match.index);
	let addedCode = "";
	if (!/[(,]$/.test(slicedStart)) {
		addedCode += ", ";
	}

	addedCode += "undefined, ".repeat(extraArgCount);
	addedCode += JSON.stringify(devId);

	return {
		newCode: `${slicedStart}${addedCode})`,
		edits: [
			{
				at: end - 1,
				delta: addedCode.length,
			},
		],
	};
};
