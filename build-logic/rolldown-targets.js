import { defineTarget, Env } from "@calmdown/rolldown-workspace";

import * as Plugin from "./rolldown-plugins.js";

export const TypeScriptLibrary = defineTarget("TypeScriptLibrary", target => target
	.configure((_, context) => ({
		platform: "neutral",
		tsconfig: "./tsconfig.json",
		transform: {
			define: {
				__DEV__: JSON.stringify(context.env === Env.Development),
			},
		},
	}))
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.configure({
				targets: "./dist/**/*",
			})
		)
		.plugin(Plugin.Declarations)
		.output("Main", out => out
			.configure((_, context) => ({
				dir: "./dist",
				format: "es",
				minify: context.env === Env.Production,
				sourcemap: context.env === Env.Development,
			}))
		)
	)
);

export const PyxisApplication = defineTarget("PyxisApplication", target => target
	.configure((_, context) => ({
		platform: "browser",
		tsconfig: "./tsconfig.json",
		transform: {
			define: {
				__DEV__: JSON.stringify(context.env === Env.Development),
			},
		},
	}))
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.configure({
				runOnce: true,
				targets: "./dist/**/*",
			})
		)
		.plugin(Plugin.ImportFile
			.configure({
				output: "./dist/assets",
				extensions: /\.(svg|web[pma]|wasm)$/,
			})
		)
		.plugin(Plugin.LoadText
			.configure({
				include: "**/*.glsl",
			})
		)
		.plugin(Plugin.LiveReload
			.enable((_, context) => context.isWatching)
			.configure({
				delay: 300,
				verbose: false,
			})
		)
		.plugin(Plugin.Serve
			.enable((_, context) => context.isWatching)
			.configure({
				contentBase: "./dist",
				host: "0.0.0.0",
				port: 8080,
				verbose: false,
			})
		)
		.output("Main", out => out
			.configure((_, context) => ({
				dir: "./dist",
				format: "iife",
				minify: context.env === Env.Production,
				sourcemap: context.env === Env.Development,
			}))
		)
	)
);
