import {
	ts,
	type ArrowFunction,
	type CallExpression,
	type FunctionExpression,
	type JsxElement,
	type JsxFragment,
	type JsxSelfClosingElement,
	type Node,
	type ParameterDeclaration,
	type Symbol,
} from "ts-morph";

import { WarningCode, type ModelRef, type TranspilerContext } from "~/types";
import { addTypeImport, warn } from "~/utils";

import { convertJsxChild } from "./convertJsxChildren";

export function transpileTemplate(context: TranspilerContext, site: CallExpression) {
	// check signature
	const args = site.getArguments();
	if (args.length !== 1 || (!args[0].isKind(ts.SyntaxKind.ArrowFunction) && !args[0].isKind(ts.SyntaxKind.FunctionExpression))) {
		warn(context, WarningCode.INVALID_SIGNATURE, "template factory expects a single inline function", site);
		return;
	}

	// find referenced model symbols
	const factory = args[0];
	const params = factory.getParameters();

	let subContext: TranspilerContext;
	if (params.length > 0) {
		if (params.length > 1) {
			warn(context, WarningCode.INVALID_SIGNATURE, "template factory should only have a single parameter", factory);
		}

		subContext = findModelRefs(context, params[0]);
	}
	else {
		subContext = {
			...context,
			modelRefs: new Map(),
			modelType: "any",
		};
	}

	// build the template
	const entry = findJsxEntry(context, factory);
	if (!entry) {
		return;
	}

	let code = convertJsxChild(subContext, entry);
	let target: Node = site;
	if (!code) {
		return;
	}

	code += ` satisfies Template<${subContext.modelType ?? "any"}>`;

	// commit the change
	addTypeImport(context, "Template");
	context.changes.push(() => {
		target.replaceWithText(code);
	});
}

function findModelRefs(context: TranspilerContext, modelParam: ParameterDeclaration) {
	const modelRefs = new Map<Symbol, ModelRef>();
	const modelType = getModelType(modelParam);
	const paramNode = modelParam.getNameNode();

	if (paramNode.isKind(ts.SyntaxKind.Identifier)) {
		// factory has a single model param: (model) => ...
		const symbol = paramNode.getSymbol();
		symbol && modelRefs.set(symbol, { kind: "object" });
	}
	else if (paramNode.isKind(ts.SyntaxKind.ObjectBindingPattern)) {
		// factory has dereferenced model parts: ({ a, b, c, ... }) => ...
		paramNode.getElements().forEach(elem => {
			const id = elem.getNameNode();
			if (!id.isKind(ts.SyntaxKind.Identifier)) {
				warn(context, WarningCode.UNSUPPORTED_SYNTAX, "dereferencing model fields is not supported", id);
				return;
			}

			const symbol = elem.getSymbol();
			symbol && modelRefs.set(
				symbol,
				elem.getDotDotDotToken()
					? { kind: "object" }
					: {
						kind: "bound",
						fieldId: id.getText(),
					},
			);
		});
	}

	return {
		...context,
		modelRefs,
		modelType,
	};
}

function findJsxEntry(context: TranspilerContext, factory: ArrowFunction | FunctionExpression) {
	const body = factory.getBody();
	if (body.isKind(ts.SyntaxKind.ParenthesizedExpression)) {
		const expr = body.getExpression();
		if (!isJsxEntry(expr)) {
			warn(context, WarningCode.UNSUPPORTED_SYNTAX, "template factory should return JSX", body);
			return null;
		}

		return expr;
	}

	if (isJsxEntry(body)) {
		return body;
	}

	const returnStatements = body.getDescendantsOfKind(ts.SyntaxKind.ReturnStatement);
	if (returnStatements.length !== 1) {
		warn(context, WarningCode.UNSUPPORTED_SYNTAX, "template factory should have exactly one return statement", returnStatements[1] ?? body);
		return null;
	}

	const rval = returnStatements[0].getExpression();
	if (!rval) {
		warn(context, WarningCode.UNSUPPORTED_SYNTAX, "template factory should return JSX", returnStatements[0]);
		return null;
	}

	if (rval.isKind(ts.SyntaxKind.ParenthesizedExpression)) {
		const expr = rval.getExpression();
		if (!isJsxEntry(expr)) {
			warn(context, WarningCode.UNSUPPORTED_SYNTAX, "template factory should return JSX", rval);
			return null;
		}

		return expr;
	}

	if (isJsxEntry(rval)) {
		return rval;
	}

	warn(context, WarningCode.UNSUPPORTED_SYNTAX, "template factory should return JSX", rval);
	return null;
}

function getModelType(node: ParameterDeclaration) {
	const typeNode = node.getTypeNode()?.asKind(ts.SyntaxKind.TypeReference);
	if (!typeNode) {
		return "any";
	}

	let type = typeNode.getTypeName().getText();

	// add generic arguments
	const args = typeNode.getTypeArguments();
	if (args.length > 0) {
		type += `<${"any, ".repeat(args.length).slice(0, -2)}>`;
	}

	return type;
}

function isJsxEntry(node: Node): node is JsxElement | JsxSelfClosingElement | JsxFragment {
	switch (node.getKind()) {
		case ts.SyntaxKind.JsxElement:
		case ts.SyntaxKind.JsxSelfClosingElement:
		case ts.SyntaxKind.JsxFragment:
			return true;

		default:
			return false;
	}
}
