import { Project, ts } from "ts-morph";

import { transpileFile } from "./transpiler/transpileFile";
import type { TranspilerContext, TranspilerOptions } from "./types";
import { noop } from "./utils";

export const DEFAULT_OPTIONS: Required<TranspilerOptions> = {
	pyxisImportId: "@calmdown/pyxis",
	templateFactoryId: "template",
	outputAs: "ts",
	warn: noop,
};

/**
 * Takes a JavaScript/TypeScript source, finds Pyxis templates within it and
 * transpiles them into object form.
 *
 * @returns the new source or null if nothing was transpiled.
 */
export function transpile(source: string, options: TranspilerOptions = {}) {
	const materializedOptions = {
		...DEFAULT_OPTIONS,
		...options,
	};

	const project = new Project({
		skipLoadingLibFiles: true,
		useInMemoryFileSystem: true,
		compilerOptions: {
			jsx: ts.JsxEmit.Preserve,
			module: ts.ModuleKind.ESNext,
			noCheck: true,
			target: ts.ScriptTarget.ESNext,
		},
	});

	const context: TranspilerContext = {
		options: materializedOptions,
		imports: new Map(),
		changes: [],
		indent: "",
	};

	const file = project.createSourceFile("./template.tsx", source);
	transpileFile(context, file);

	if (context.changes.length === 0) {
		return null;
	}

	context.changes.forEach(it => it());
	switch (materializedOptions.outputAs) {
		case "ts":
			return file.getFullText();

		case "js":
			return file.getEmitOutput().getOutputFiles()[0]?.getText();
	}
}
