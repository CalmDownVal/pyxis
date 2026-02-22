import * as path from "node:path";

import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "~/options";
import { replaceSourceIndex } from "~/transpiler";
import { getShortModuleId } from "~/utils";

import { CLASS_NAME_MAP_KEY, type ClassNameMap } from "./common";

interface CssChunk {
	readonly moduleId: string;
	readonly mappings: string;
	readonly originalCode: string;
	readonly transformedCode: string;
}

export function transformCssModules(options: ResolvedPyxisPluginOptions): Plugin {
	const bundleCssChunks = new Map<string, CssChunk>();
	const filter = {
		id: {
			include: options.cssModules!.include,
			exclude: options.cssModules!.exclude,
		},
	};

	let LightningCss!: typeof import("lightningcss");
	let root!: string;
	let isVite = false;

	return {
		name: `${__THIS_MODULE__}:CssModules`,
		enforce: "pre",
		config(config) {
			// when running in Vite, it is necessary to disable its own CSS modules feature, as it
			// would otherwise process modules twice
			if (config.css?.transformer !== "lightningcss") {
				this.warn({
					code: "E_CONFIG",
					message: "When using the cssModules feature, Vite should be used with LightningCss.",
				});
			}

			return {
				css: {
					...config.css,
					transformer: "lightningcss",
					lightningcss: {
						...config.css?.lightningcss,
						cssModules: false,
					},
				},
			};
		},
		configResolved(config) {
			// this hook is Vite-specific and will not be triggered in Rollup/Rolldown
			root = config.root;
			isVite = true;
		},
		async buildStart(inputOptions) {
			root ??= inputOptions.cwd ?? process.cwd();
			try {
				LightningCss = await import("lightningcss");
			}
			catch (ex) {
				this.error({
					cause: ex,
					code: "E_DEPENDENCY",
					message: "When using the cssModules feature, the LightningCss package must be installed.",
				});
			}
		},
		transform: {
			filter,
			order: "pre",
			handler(originalCode, moduleId) {
				// transform CSS module with Lightning CSS
				const isModule = options.cssModules!.modulePattern.test(moduleId);
				const result = LightningCss.transform({
					...options.cssModules!.lightningcss,
					code: Buffer.from(originalCode, "utf8"),
					filename: moduleId,
					projectRoot: root,
					sourceMap: true,
					cssModules: isModule && (
						typeof options.cssModules!.lightningcss?.cssModules === "object"
							? { ...options.cssModules!.lightningcss?.cssModules }
							: true
					),
				});

				// forward warnings
				for (const warning of result.warnings) {
					this.warn({
						code: warning.type,
						message: warning.message,
						loc: {
							column: warning.loc.column,
							line: warning.loc.line,
							file: warning.loc.filename,
						},
					});
				}

				// build and register CSS class name map
				const classNameMap: ClassNameMap = {};
				if (isModule) {
					Object
						.keys(result.exports!)
						.reduce((map, key) => (map[key] = result.exports![key].name, map), classNameMap);
				}

				// get source mappings
				let mappings;
				try {
					const sourcemap = JSON.parse((result.map as Buffer).toString("utf8"));
					if (sourcemap?.version !== 3) {
						throw new Error("expected sourcemap version 3");
					}

					mappings = sourcemap.mappings ?? "";
				}
				catch (ex) {
					this.warn({
						code: "E_SOURCEMAP",
						message: `failed to parse sourcemap, ${(ex as Error).message}`,
					});
				}

				// Vite handles the bundling, return CSS directly, no caching
				const transformedCode = (result.code as Buffer).toString("utf8");
				if (isVite) {
					return {
						code: transformedCode,
						meta: {
							[CLASS_NAME_MAP_KEY]: classNameMap,
						},
						map: {
							version: 3,
							sources: [ moduleId ],
							sourcesContent: [ originalCode ],
							names: [],
							mappings,
						},
					};
				}

				// for raw Rollup/Rolldown builds, cache CSS and instead return
				// a JS chunk with mappings
				bundleCssChunks.set(moduleId, {
					moduleId,
					mappings,
					originalCode,
					transformedCode,
				});

				return {
					moduleType: "js",
					code: `export default ${JSON.stringify(classNameMap)};`,
					moduleSideEffects: "no-treeshake",
					meta: {
						[CLASS_NAME_MAP_KEY]: classNameMap,
					},
				};
			},
		},
		generateBundle(outputOptions, bundleMap) {
			// do nothing when used with Vite
			if (isVite) {
				return;
			}

			const sourcemapEnabled = outputOptions.sourcemap ?? false;
			const baseDir = path.resolve(root, outputOptions.dir ?? "./dist");
			const baseUrl = outputOptions.sourcemapBaseUrl ? new URL(outputOptions.sourcemapBaseUrl) : null;
			const bundles = Object
				.values(bundleMap)
				.filter(bundle => bundle.type === "chunk");

			for (const bundle of bundles) {
				const fileName = `${path.parse(bundle.fileName).name}.css`;
				const chunks = bundle.moduleIds
					.map(moduleId => bundleCssChunks.get(moduleId)!)
					.filter(Boolean);

				// merge CSS code
				let code = chunks.map(chunk => chunk.transformedCode).join("\n");

				// merge source mappings if enabled
				if (sourcemapEnabled) {
					const sourcemap = {
						version: 3,
						sources: chunks.map(chunk => getShortModuleId(baseDir, chunk.moduleId)),
						sourcesContent: chunks.map(chunk => chunk.originalCode),
						names: [],
						mappings: chunks
							.map((chunk, sourceIndex) => replaceSourceIndex(chunk.mappings, sourceIndex))
							.join(";"),
					};

					// emit sourcemap chunk
					const sourcemapFileName = `${fileName}.map`;
					this.emitFile({
						type: "prebuilt-chunk",
						fileName: sourcemapFileName,
						code: JSON.stringify(sourcemap),
					});

					code += `\n/*# sourceMappingURL=${baseUrl ? new URL(sourcemapFileName, baseUrl) : sourcemapFileName} */`;
				}

				// emit CSS chunk
				this.emitFile({
					type: "prebuilt-chunk",
					fileName,
					code,
				});
			}
		},
	};
}
