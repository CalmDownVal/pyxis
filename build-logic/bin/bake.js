// A TypeScript "bake" script capable of materializing complex types into flat interfaces.
// Usage: yarn bake-types <input> <output>
//
// Only types tagged with the @bake JSDoc tag will be baked.
// Any node tagged with the @preserve JSDoc tag will be preserved as-is into the output.
// All other nodes get dropped.

import * as fs from "node:fs/promises";
import * as path from "node:path";

import * as ts from "typescript";

const INPUT = path.resolve(process.argv[2]);
const OUTPUT = path.resolve(process.argv[3]);


// load config
const configPath = ts.findConfigFile(path.dirname(INPUT), ts.sys.fileExists);
if (!configPath) {
	throw new Error("could not find tsconfig");
}

const baseConfig = ts.readConfigFile(configPath, ts.sys.readFile);
if (baseConfig.error) {
	throw new Error(`could not read "${configPath}"`);
}

const config = ts.parseJsonConfigFileContent(baseConfig.config, ts.sys, path.dirname(configPath), undefined, configPath);


// init program
const program = ts.createProgram([ INPUT ], config.options);
const checker = program.getTypeChecker();

const input = program.getSourceFile(INPUT);
if (!input) {
	throw new Error(`source file "${INPUT}" not found`);
}

const output = (await fs.open(OUTPUT, "w+")).createWriteStream({ encoding: "utf8" });
output.write(`\
// baked types, do not modify as changes will be lost
// source file: ${path.relative(path.dirname(OUTPUT), INPUT)}

`);

const flags =
	ts.TypeFormatFlags.NoTruncation |
	ts.TypeFormatFlags.MultilineObjectLiterals |
	ts.TypeFormatFlags.UseStructuralFallback |
	ts.TypeFormatFlags.InTypeAlias |
	ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;


function visit(node) {
	const jsdocTags = ts.getJSDocTags(node);
	if (jsdocTags.some(it => it.tagName.escapedText === "preserve")) {
		visitPreservedNode(node);
	}
	else if (jsdocTags.some(it => it.tagName.escapedText === "bake")) {
		visitBakedNode(node);
	}

	ts.forEachChild(node, visit);
}

function visitPreservedNode(node) {
	output.write(node.getText());
	output.write("\n\n");
}

function visitBakedNode(node) {
	if (!ts.isTypeAliasDeclaration(node)) {
		throw new Error("the @bake tag is only applicable to type aliases");
	}

	const type = checker.getTypeAtLocation(node);
	let typeStr = checker.typeToString(type, node, flags);

	// remove redundant `| undefined` unions
	typeStr = typeStr.replaceAll(/(\?:[^;]+?)\s*\|\s*undefined;/g, "$1;");

	// add newline since TS doesn't add it...
	// https://github.com/microsoft/TypeScript/pull/61349
	typeStr = typeStr.replaceAll(/(?<! ) {4}(?! )/g, "\n\t");

	// add newline before closing bracket
	typeStr = typeStr.replace(/\}$/, "\n}");

	output.write(`export interface ${node.name.escapedText} `);
	output.write(typeStr);
	output.write("\n\n");
}

visit(input);
