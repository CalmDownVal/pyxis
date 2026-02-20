import * as path from "node:path";

import { normalizePath, type Plugin } from "vite";

import type { PyxisHmrPluginOptions } from "~/types";

import { Transpiler } from "./transpiler/Transpiler";
import { transpileExportedSymbols } from "./transpiler/transpileExportedSymbols";
import { transpileFactoryCalls } from "./transpiler/transpileFactoryCalls";


export function pyxisHmrTransformPlugin(pluginOptions: Required<PyxisHmrPluginOptions>): Plugin {
	let root: string;
	return {
		name: `${__THIS_MODULE__}:transform`,
		configResolved(config) {
			root = config.root;
		},
		transform: {
			filter: {
				id: {
					include: /\.m?[jt]sx?$/i,
					exclude: pluginOptions.exclude,
				},
			},
			handler(code, moduleId) {
				if (!(root && moduleId.startsWith(root))) {
					return null;
				}

				if (!moduleId.endsWith("TestApp.tsx")) {
					return null;
				}

				const ast = this.parse(code, { astType: "js" });
				const transpiler = new Transpiler();
				const shortModuleId = normalizePath(path.relative(root, moduleId));

				transpileExportedSymbols(transpiler, ast);
				transpileFactoryCalls(transpiler, ast, pluginOptions, shortModuleId);

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
