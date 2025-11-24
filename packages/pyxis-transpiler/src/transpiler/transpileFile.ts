import {
	ts,
	type Identifier,
	type ImportDeclaration,
	type ImportSpecifier,
	type SourceFile
} from "ts-morph";

import { WarningCode, type TranspilerContext } from "~/types";
import { warn } from "~/utils";

import { transpileTemplate } from "./transpileTemplate";

export function transpileFile(context: TranspilerContext, file: SourceFile) {
	// find imports from the pyxis library
	const alreadyImported = new Map<string, ImportSpecifier>();
	let pyxisImportNode!: ImportDeclaration | undefined;
	let templateFactoryNode!: Identifier | undefined;

	file.getImportDeclarations().forEach(decl => {
		if (decl.isTypeOnly() || decl.getModuleSpecifierValue() !== context.options.pyxisImportId) {
			return;
		}

		// find the template factory import
		decl.getNamedImports().forEach(spec => {
			const name = spec.getNameNode().getText();
			alreadyImported.set(name, spec);

			if (spec.isTypeOnly() || name !== context.options.templateFactoryId) {
				return;
			}

			const id = spec.getAliasNode() ?? spec.getNameNode().asKind(ts.SyntaxKind.Identifier);
			if (!id) {
				return;
			}

			if (templateFactoryNode) {
				warn(context, WarningCode.MULTIPLE_IMPORTS, "Multiple template factory imports were found.", spec);
			}

			pyxisImportNode = decl;
			templateFactoryNode = id;
		});
	});

	// transpile templates where factory calls are found
	templateFactoryNode?.findReferencesAsNodes()?.forEach(ref => {
		const parent = ref.getParent();
		if (parent?.isKind(ts.SyntaxKind.CallExpression)) {
			transpileTemplate(context, parent);
		}
	});

	// inject needed imports
	if (pyxisImportNode && context.imports.size > 0) {
		context.changes.push(() => {
			context.imports.forEach((meta, name) => {
				const spec = alreadyImported.get(name);
				if (!spec) {
					pyxisImportNode!.addNamedImport({
						name,
						isTypeOnly: meta.isTypeOnly,
					});
				}
				else if (!meta.isTypeOnly && spec.isTypeOnly()) {
					spec.setIsTypeOnly(false);
				}
			});
		});
	}
}
