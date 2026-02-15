import type { Plugin } from "vite";

import type { PyxisHmrPluginOptions } from "~/types";

import { applyTransforms, generatePostamble, generatePreamble } from "./analysis/codegen";
import { findExportedComponents } from "./analysis/findExportedComponents";
import { findExportedSymbols } from "./analysis/findExportedSymbols";
import { generateCodeTransforms } from "./analysis/generateCodeTransforms";

export function pyxisHmrTransformPlugin(options: Required<PyxisHmrPluginOptions>): Plugin {
	return {
		name: `${__THIS_MODULE__}:transform`,
		transform: {
			filter: {
				id: {
					include: /\.m?[jt]sx?$/i,
					exclude: options.exclude,
				},
			},
			async handler(code, moduleId) {
				const ast = this.parse(code, { astType: "js" });

				const exportedSymbols = findExportedSymbols(ast);
				const exportedComponents = findExportedComponents(ast, exportedSymbols, options, moduleId);
				if (exportedSymbols.length === 0 || exportedComponents.length === 0) {
					return null;
				}

				const transforms = generateCodeTransforms(exportedSymbols, exportedComponents);
				const newCode = (
					generatePreamble(options) +
					applyTransforms(code, transforms) +
					generatePostamble(exportedSymbols)
				);

				return newCode;
			},
		},
	};
}
