import * as path from "node:path";

import type { PluginContext, TransformPluginContext } from "rolldown";
import type { Plugin } from "vite";

import { getShortModuleId, isPathWithin } from "~/utils";

import type { AST } from "./ast";
import { Transpiler } from "./Transpiler";

export interface TranspileRoutine<TContext> {
	include: MaybeArray<RegExp | string>;
	exclude?: MaybeArray<RegExp | string>;
	order?: "pre" | "post";
	init?: (this: PluginContext) => Promise<TContext> | TContext;
	process: (this: TransformPluginContext, call: TranspileCall<TContext>) => Promise<void> | void;
}

export interface TranspileCall<TContext = {}> {
	readonly code: string;
	readonly context: TContext;
	readonly ast: AST.Program;
	readonly transpiler: Transpiler;
	readonly moduleId: string;
	readonly shortModuleId: string;
}

export type MaybeArray<T> = T[] | T;

export function transpile<TInit = void>(routine: TranspileRoutine<TInit>): Plugin {
	let init!: TInit;
	let root!: string;
	let isVite = false;

	return {
		name: `${__THIS_MODULE__}:Transpiler`,
		enforce: routine.order,
		configResolved(config) {
			// Vite only
			root = config.root;
			isVite = true;
		},
		async buildStart(inputOptions) {
			// Rollup/Rolldown or Vite
			root ??= inputOptions.cwd ?? process.cwd();
			init = await routine.init?.call(this as unknown as PluginContext)!;
		},
		transform: {
			filter: {
				id: {
					include: routine.include,
					exclude: routine.exclude,
				},
			},
			order: routine.order,
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
				await routine.process.call(this as unknown as TransformPluginContext, {
					code,
					context: init,
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
						sources: [ isVite ? moduleId : shortModuleId ],
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
