import {
	ts,
	type JsxElement,
	type JsxExpression,
	type JsxFragment,
	type JsxSelfClosingElement,
	type StringLiteral,
} from "ts-morph";

import type { TranspilerContext } from "~/types";

import { convertJsxExpression } from "./convertJsxExpression";

type JsxInitializer =
	| JsxElement
	| JsxExpression
	| JsxFragment
	| JsxSelfClosingElement
	| StringLiteral
	| undefined;

export function convertJsxInitializer(context: TranspilerContext, expr: JsxInitializer) {
	if (expr === undefined) {
		return true;
	}

	switch (expr.getKind()) {
		case ts.SyntaxKind.StringLiteral:
			return expr.getText();

		case ts.SyntaxKind.JsxExpression:
			return convertJsxExpression(context, expr as JsxExpression);

		default:
			return null;
	}
}
