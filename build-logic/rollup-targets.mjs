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
				output: {
					comments: false,
				},
			}))
		.output("Main", out => out
			.configure({
				format: "es",
				entryFileNames: "[name].js",
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
		.plugin(Plugin.NodeResolve)
		.plugin(Plugin.Terser
			.enable(inEnv("prod"))
			.configure({
				output: {
					comments: false,
				},
			}))
		.output("Main", out => out
			.configure({
				format: "iife",
				entryFileNames: "[name].js",
			}))
	)
);

export const Target = { PyxisApplication, TypeScriptLibrary };
