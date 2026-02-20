import * as path from "node:path";

import type { Plugin } from "vite";

import type { PyxisHmrPluginOptions } from "~/types";

import { Transpiler } from "./transpiler/Transpiler";
import { transpileExportedSymbols } from "./transpiler/transpileExportedSymbols";
import { transpileFactoryCalls } from "./transpiler/transpileFactoryCalls";


export function pyxisHmrTransformPlugin(pluginOptions: Required<PyxisHmrPluginOptions>): Plugin {
	let root: string;
	return {
		name: `${__THIS_MODULE__}:transform`,
		configResolved(config) {
			root = path.resolve(config.root);
		},
		transform: {
			filter: {
				id: {
					include: /\.m?[jt]sx?$/i,
					exclude: pluginOptions.exclude,
				},
			},
			handler(code, moduleId) {
				if (!isPathWithin(root, moduleId)) {
					return null;
				}

				const transpiler = new Transpiler();
				const shortModuleId = getShortModuleId(root, moduleId);
				const ast = this.parse(code, { astType: "js" });

				transpileExportedSymbols(transpiler, ast);
				transpileFactoryCalls(transpiler, ast, pluginOptions, shortModuleId);

				if (!transpiler.hasTransforms()) {
					return null;
				}

				const result = transpiler.transpile(code);
				return {
					code: result.transpiledCode,
					map: {
						version: 3,
						sources: [ shortModuleId ],
						sourcesContent: [ code ],
						names: [],
						mappings: result.sourcemap,
					},
				};
			},
		},
	};
}

function isPathWithin(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId);
	return (
		relative &&
		!relative.startsWith("..") &&
		!path.isAbsolute(relative)
	);
}

function getShortModuleId(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId).replace(/\\/g, "/");
	return path.posix.normalize(relative);
}
