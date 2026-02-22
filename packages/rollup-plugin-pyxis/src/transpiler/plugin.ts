import * as path from "node:path";

import type { Plugin, TransformPluginContext } from "rolldown";

import { getShortModuleId, isPathWithin } from "~/utils";

import type { AST } from "./ast";
import { Transpiler } from "./Transpiler";

export interface TranspileRoutine {
	include: MaybeArray<RegExp | string>;
	exclude?: MaybeArray<RegExp | string>;
	run: (this: TransformPluginContext, call: TranspileCall) => Promise<void> | void;
}

export interface TranspileCall {
	readonly ast: AST.Program;
	readonly transpiler: Transpiler;
	readonly moduleId: string;
	readonly shortModuleId: string;
}

export type MaybeArray<T> = T[] | T;

export function transpile(routine: TranspileRoutine): Plugin {
	let root: string;
	return {
		name: `${__THIS_MODULE__}:Transpiler`,
		buildStart(inputOptions) {
			root = inputOptions.cwd ?? process.cwd();
		},
		transform: {
			filter: {
				id: {
					include: routine.include,
					exclude: routine.exclude,
				},
			},
			order: "post",
			async handler(code, moduleId) {
				if (!isPathWithin(root, moduleId)) {
					return null;
				}

				const lang = detectLang(moduleId);
				if (!lang) {
					return null;
				}

				const transpiler = new Transpiler();
				const shortModuleId = getShortModuleId(root, moduleId);
				await routine.run.call(this, {
					ast: this.parse(code, {
						astType: "js",
						lang,
					}),
					transpiler,
					moduleId,
					shortModuleId,
				});

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

function detectLang(moduleId: string) {
	const ext = path.extname(moduleId);
	if (/^\.[cm]?tsx?$/i.test(ext)) {
		return ext.endsWith("x") ? "tsx" : "ts";
	}
	else if (/^\.[cm]?jsx?$/i.test(ext)) {
		return ext.endsWith("x") ? "jsx" : "js";
	}

	return null;
}
