import { declareTarget, inEnv } from "@calmdownval/rollup-util";

import { Plugin } from "./rollup-plugins.mjs";

const TypeScriptLibrary = declareTarget("TypeScriptLibrary", target => target
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.configure({
				// dryRun: true,
				targets: [
					{
						trigger: "before",
						include: "./dist/**/*",
					},
					{
						trigger: "after",
						include: "./dist/types/**",
					},
				],
			}))
		.plugin(Plugin.BundleDts
			.configure({
				baseDir: "./src",
				declarationDir: "./dist/types",
			})
			.suppress("console-writing-dts-rollup")
			.suppress("console-preamble")
			.suppress("ae-missing-release-tag"))
		.plugin(Plugin.Externals)
		.plugin(Plugin.TypeScript
			.configure({
				compilerOptions: {
					declaration: true,
					declarationMap: true,
					declarationDir: "./dist/types",
				},
			}))
		.plugin(Plugin.Replace
			.configure((_, context) => ({
				__DEV__: JSON.stringify(context.targetEnv === "dev"),
				preventAssignment: true,
			})))
		.plugin(Plugin.Terser
			.enable(inEnv("prod"))
			.configure({
				compress: {
					ecma: 2020,
					module: true,
					passes: 3,
				},
				format: {
					comments: false,
				},
				mangle: {
					toplevel: true,
				},
			}))
		.output("Main", out => out
			.configure({
				format: "es",
				entryFileNames: "[name].js",
				sourcemap: true,
			}))
	)
);

const PyxisApplication = declareTarget("PyxisApplication", target => target
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.configure({
				// dryRun: true,
				targets: [
					{
						trigger: "before",
						include: "./dist/**/*",
					},
				],
			}))
		.plugin(Plugin.TypeScript)
		.plugin(Plugin.Css)
		.plugin(Plugin.NodeResolve)
		.plugin(Plugin.ImportFile
			.configure({
				output: "./dist/assets",
				extensions: /\.(svg|web[pma]|wasm)$/,
			}))
		.plugin(Plugin.SourceMaps)
		.plugin(Plugin.Terser
			.enable(inEnv("prod"))
			.configure({
				compress: {
					ecma: 2020,
					passes: 3,
				},
				format: {
					comments: false,
				},
				mangle: {
					toplevel: true,
				},
			}))
		.plugin(Plugin.LiveReload
			.enable((_, context) => context.targetEnv === "dev" && context.isWatching)
			.configure({
				delay: 300,
				verbose: false,
			}))
		.plugin(Plugin.Serve
			.enable((_, context) => context.targetEnv === "dev" && context.isWatching)
			.configure({
				contentBase: "./dist",
				host: "localhost",
				port: 8080,
				verbose: false,
			}))
		.output("Main", out => out
			.configure((config, context) => ({
				...config,
				format: "iife",
				entryFileNames: "[name].js",
				sourcemap: context.targetEnv === "dev",
			})))
	)
);

export const Target = { PyxisApplication, TypeScriptLibrary };
