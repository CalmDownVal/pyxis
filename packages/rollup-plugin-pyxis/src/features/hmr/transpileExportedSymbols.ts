import type { AST, TransformBlock, TranspileCall } from "~/transpiler";

interface ExportInfo {
	readonly localName: string;
	readonly exportName: string;
}

/**
 * applies transforms to exports:
 * - all exports are removed
 * - originally exported consts are converted to mutable variables
 * - originally exported function and class declarations are stored to mutable variables
 * - HMR logic is appended
 * - finally a common export is added re-exporting all the original symbols
 */
export function transpileExportedSymbols({ ast, transpiler }: TranspileCall) {
	// nodes keyed under their local names
	const topScopeNodes: { [N in string]?: AST.VariableDeclaration | AST.Function | AST.Class } = {};
	const exportedNodes = new Set<AST.VariableDeclaration | AST.Function | AST.Class | AST.Expression>();
	const exportedNames = new Map<string, ExportInfo>();

	for (const node of ast.body) {
		switch (node.type) {
			case "VariableDeclaration":
			case "FunctionDeclaration":
			case "ClassDeclaration":
				findDeclaredSymbols(node, it => {
					topScopeNodes[it.name] = node;
				});

				break;

			case "ExportNamedDeclaration": {
				if (node.exportKind === "type") {
					break;
				}

				let isAffected = false;

				// may be a direct named export, e.g.:
				// export const a = 123;
				const declaration = node.declaration;
				if (declaration && !isTypeScriptNode(declaration)) {
					exportedNodes.add(declaration);
					findDeclaredSymbols(declaration, it => {
						topScopeNodes[it.name] = declaration;
						exportedNames.set(it.name, {
							localName: it.name,
							exportName: it.name,
						});

						isAffected = true;
					});
				}

				// or a named reference export:
				// export { a, b, c };
				for (const ref of node.specifiers) {
					if (ref.local.type !== "Identifier" || ref.exported.type !== "Identifier") {
						continue;
					}

					const localName = ref.local.name;
					const exportedNode = topScopeNodes[localName];
					if (exportedNode) {
						const exportName = ref.exported.name;
						exportedNodes.add(exportedNode);
						exportedNames.set(exportName, {
							localName,
							exportName,
						});

						isAffected = true;
					}
				}

				if (isAffected) {
					transpiler.addTransform(node, removeExport);
				}

				break;
			}

			case "ExportDefaultDeclaration": {
				let isAffected = false;

				// default export can be any expression -> detect references, otherwise use directly
				if (node.declaration.type === "Identifier") {
					const localName = node.declaration.name;
					const exportedNode = topScopeNodes[localName];
					if (exportedNode) {
						exportedNodes.add(exportedNode);
						isAffected = true;
					}
				}
				else if (!isTypeScriptNode(node.declaration)) {
					exportedNodes.add(node.declaration);
					exportedNames.set("default", {
						localName: "__default",
						exportName: "default",
					});

					isAffected = true;
				}

				if (isAffected) {
					transpiler.addTransform(node, removeExport);
				}

				break;
			}
		}
	}

	// exit early if no exports were transformed
	if (exportedNodes.size === 0) {
		return;
	}

	for (const node of exportedNodes) {
		switch (node.type) {
			case "VariableDeclaration":
				if (node.kind === "const") {
					transpiler.addTransform(node, convertToMutableVariable);
				}

				break;

			case "FunctionDeclaration":
			case "ClassDeclaration":
				if (node.id) {
					// id should always be present, otherwise the original code would have to
					// contain something like `export function () { ... }` which is invalid
					transpiler.addTransform(node, assignToMutableVariable(node.id!.name));
				}

				break;

			default:
				// expressions from default export
				transpiler.addTransform(node, assignToMutableVariable("__default"));
				break;
		}
	}

	// generate HMR replacer code
	let setters = "\n";
	let exports = "";

	for (const { localName, exportName } of exportedNames.values()) {
		setters += `\t\t${JSON.stringify(exportName)}: value => { ${localName} = value; },\n`;
		if (localName !== exportName) {
			exports += `${localName} as ${exportName}, `;
		}
		else {
			exports += `${localName}, `;
		}
	}

	transpiler.addTransform(ast, appendCode(`

if (import.meta.hot) {
	const setter = {${setters}\t};
	import.meta.hot.accept(hmrExports => {
		hmrExports && Object.keys(hmrExports).forEach(key => {
			setter[key]?.(hmrExports[key]);
		});
	});
}

export { ${exports.slice(0, -2)} };
`));
}

function findDeclaredSymbols(
	declaration: AST.Declaration,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	switch (declaration.type) {
		case "VariableDeclaration":
			findDeclaredVariables(declaration, block);
			break;

		case "FunctionDeclaration":
		case "ClassDeclaration": {
			if (!declaration.id) {
				break;
			}

			block(declaration.id);
			break;
		}
	}
}

function findDeclaredVariables(
	declaration: AST.VariableDeclaration,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	for (const decl of declaration.declarations) {
		if (decl.init) {
			if (isBindingPattern(decl.id)) {
				// variable declarations via a binding pattern, e.g.:
				// const { a, b } = obj;
				// const [ x, y ] = arr;
				//
				// here id points to `obj` or `arr` -> we don't care about it

				findDestructuredVariables(decl.id, block);
			}
			else {
				// variable initialized to an expression, e.g.:
				// const x = 123;

				if (decl.id.type !== "Identifier") {
					continue;
				}

				block(decl.id);
			}
		}
		else {
			// variable declaration without an init, e.g.:
			// let x;

			if (decl.id.type !== "Identifier") {
				continue;
			}

			block(decl.id);
		}
	}
}

function findDestructuredVariables(
	node: AST.BindingPattern | AST.BindingRestElement | null | undefined,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	switch (node?.type) {
		case "Identifier":
			// we don't make any effort to understand where values come from when using object or
			// array destructuring patterns - it's enough to know the exported names
			block(node);
			break;

		case "AssignmentPattern":
			findDestructuredVariables(node.left, block);
			break;

		case "ObjectPattern":
			for (const prop of node.properties) {
				findDestructuredVariables(prop.value, block);
			}

			break;

		case "ArrayPattern":
			for (const elem of node.elements) {
				const arg = elem?.type === "RestElement" ? elem.argument : elem;
				findDestructuredVariables(arg, block);
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

function isTypeScriptNode(node: AST.Node): node is AST.Node & { type: `TS${string}` } {
	return node.type.startsWith("TS");
}

const convertToMutableVariable: TransformBlock = (originalCode, start) => {
	const match = /^\s*const\s+/.exec(originalCode);
	if (!match) {
		return null;
	}

	const removed = match[0].length;
	return {
		newCode: "let " + originalCode.slice(removed),
		edits: [
			{
				at: start,
				delta: -removed,
			},
			{
				at: start + removed,
				delta: 4,
			},
		],
	};
};

const assignToMutableVariable = (name: string): TransformBlock => (originalCode, start, end) => {
	return {
		newCode: `let ${name} = (${originalCode});`,
		edits: [
			{
				at: start,
				delta: name.length + 8,
			},
			{
				at: end,
				delta: 2,
			},
		],
	};
};

const removeExport: TransformBlock = (originalCode, start) => {
	const match = /^\s*export(\s+default)?\s+/.exec(originalCode);
	if (!match) {
		return null;
	}

	const removed = match[0].length;
	return {
		newCode: originalCode.slice(removed),
		edits: [
			{
				at: start,
				delta: -removed,
			},
		],
	};
};

const appendCode = (code: string): TransformBlock => (originalCode, _start, end) => {
	return {
		newCode: originalCode + code,
		edits: [
			{
				at: end,
				delta: code.length,
			},
		],
	};
};
