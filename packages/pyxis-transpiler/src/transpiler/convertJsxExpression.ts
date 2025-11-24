import { ts, type JsxExpression, type Node } from "ts-morph";

import type { TranspilerContext } from "~/types";
import { addImport } from "~/utils";

export function convertJsxExpression(context: TranspilerContext, expr: JsxExpression) {
	const exprNode = expr.getExpression();
	if (!exprNode) {
		return null;
	}

	let referencesModel = false;
	let offset = exprNode.getPos();
	let code = exprNode.getFullText();

	const identifiers = exprNode.isKind(ts.SyntaxKind.Identifier)
		? [ exprNode ]
		: exprNode.getDescendantsOfKind(ts.SyntaxKind.Identifier);

	identifiers
		.sort(byPositionAsc)
		.forEach(id => {
			const symbol = id.getSymbol();
			const ref = symbol && context.modelRefs?.get(symbol);
			if (!ref) {
				return;
			}

			let at;
			let fw;
			let replacement;
			switch (ref.kind) {
				case "object": {
					const parent = id.getParent().asKind(ts.SyntaxKind.PropertyAccessExpression);
					if (!parent) {
						return;
					}

					replacement = `read(model.${parent.getNameNode().getText()})`;
					at = parent.getPos() - offset;
					fw = parent.getFullWidth();
					break;
				}

				case "bound":
					replacement = `read(model.${ref.fieldId})`;
					at = id.getPos() - offset;
					fw = id.getFullWidth();
					break;
			}

			referencesModel = true;
			offset += replacement.length - fw;
			code = (
				code.slice(0, at) +
				replacement +
				code.slice(at + fw)
			);
		});

	if (referencesModel) {
		addImport(context, "read");
		return `(model: ${context.modelType ?? "any"}) => (${code})`;
	}

	return code;
}

function byPositionAsc(a: Node, b: Node) {
	return a.getPos() - b.getPos();
}
