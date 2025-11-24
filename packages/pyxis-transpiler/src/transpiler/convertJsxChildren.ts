import {
	ts,
	type JsxExpression,
	type JsxNamespacedName,
	type JsxChild,
	type JsxElement,
	type JsxFragment,
	type JsxSelfClosingElement,
	type JsxText,
} from "ts-morph";

import { WarningCode, type TranspilerContext } from "~/types";
import { addImport, warn } from "~/utils";

import { convertJsxExpression } from "./convertJsxExpression";
import { convertJsxInitializer } from "./convertJsxInitializer";

export function convertJsxChildren(context: TranspilerContext, children: readonly JsxChild[]) {
	const subContext = { ...context, indent: context.indent + "\t\t" };

	let code = "[\n";
	children.forEach(child => {
		const converted = convertJsxChild(subContext, child);
		if (converted !== null) {
			code += `${converted},\n`;
		}
	});

	return code + `${context.indent}\t]`;
}

export function convertJsxChild(context: TranspilerContext, child: JsxChild) {
	switch (child.getKind()) {
		case ts.SyntaxKind.JsxText:
			return convertJsxText(child as JsxText);

		case ts.SyntaxKind.JsxExpression:
			return convertJsxExpression(context, child as JsxExpression);

		case ts.SyntaxKind.JsxElement:
		case ts.SyntaxKind.JsxSelfClosingElement:
			return convertJsxElement(context, child as JsxElement | JsxSelfClosingElement);

		case ts.SyntaxKind.JsxFragment:
			return convertJsxFragment(context, child as JsxFragment);

		default:
			return null;
	}
}

function convertJsxElement(context: TranspilerContext, element: JsxElement | JsxSelfClosingElement) {
	const isSelfClosing = element.isKind(ts.SyntaxKind.JsxSelfClosingElement);
	const opening = isSelfClosing ? element : element.getOpeningElement();
	const i = context.indent;

	// gather props and extension props
	const propsList: string[] = [];
	const extensionsList: string[] = [];
	opening.getAttributes().forEach(attr => {
		if (attr.isKind(ts.SyntaxKind.JsxSpreadAttribute)) {
			warn(context, WarningCode.UNSUPPORTED_SYNTAX, "spread attributes are not supported", attr);
			return;
		}

		const nameNode = attr.getNameNode();
		const value = convertJsxInitializer(context, attr.getInitializer());
		if (nameNode.isKind(ts.SyntaxKind.Identifier)) {
			const name = JSON.stringify(nameNode.getText());
			propsList.push(`${i}\t\t${name}, ${value},\n`);
		}
		else {
			const ns = JSON.stringify(nameNode.getNamespaceNode().getText());
			const name = JSON.stringify(nameNode.getNameNode().getText());
			extensionsList.push(`${i}\t\t${ns}, ${name}, ${value},\n`);
		}
	});

	const props = propsList.length > 0 ? `[\n${propsList.join("")}${i}\t]` : "[]";
	const extensions = extensionsList.length > 0 ? `[\n${extensionsList.join("")}${i}\t]` : "[]";

	// gather children
	const children = isSelfClosing
		? "[]"
		: convertJsxChildren(context, element.getJsxChildren());

	// build template object
	const tagName = opening.getTagNameNode();
	const id = tagName.getText();
	switch (tagName.getKind()) {
		case ts.SyntaxKind.JsxNamespacedName:
			addImport(context, "Native");
			return `\
${i}{
${i}	h: Native,
${i}	t: ${JSON.stringify((tagName as JsxNamespacedName).getNameNode().getText())},
${i}	n: ${JSON.stringify((tagName as JsxNamespacedName).getNamespaceNode().getText())},
${i}	p: ${props},
${i}	e: ${extensions},
${i}	c: ${children},
${i}}`;

		case ts.SyntaxKind.Identifier:
			if (isNative(id)) {
				addImport(context, "Native");
				return `\
${i}{
${i}	h: Native,
${i}	t: ${JSON.stringify(id)},
${i}	p: ${props},
${i}	e: ${extensions},
${i}	c: ${children},
${i}}`;
			}
			// fall-through

		// Identifier (non-native), ThisExpression, JsxTagNamePropertyAccess
		default:
			return `\
${i}{
${i}	h: ${id},
${i}	p: ${props},
${i}	e: ${extensions},
${i}	c: ${children},
${i}}`;
	}
}

function convertJsxFragment(context: TranspilerContext, fragment: JsxFragment) {
	const i = context.indent;
	addImport(context, "Fragment");
	return `\
${i}{
${i}	h: Fragment,
${i}	p: [],
${i}	e: [],
${i}	c: ${convertJsxChildren(context, fragment.getJsxChildren())},
${i}}`;
}

const RE_TRIM = /^\s*([^\s]|[^\s].*[^\s])\s*$/;
const RE_NATIVE = /^[a-z][a-z0-9-]*$/;

function convertJsxText(node: JsxText) {
	const match = RE_TRIM.exec(node.getText());
	return match ? JSON.stringify(match[1]) : null;
}

function isNative(name: string) {
	return RE_NATIVE.test(name);
}
