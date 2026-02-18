import { defineTarget, inWatchMode, Env } from "@calmdown/rolldown-workspace";

import * as Plugin from "./rolldown-plugins.js";

export const TypeScriptLibrary = defineTarget("TypeScriptLibrary", target => target
	.configure({
		platform: "neutral",
		tsconfig: "./tsconfig.json",
	})
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.disable(inWatchMode)
			.configure({
				targets: "./dist/**/*",
			})
		)
		.plugin(Plugin.Declarations)
		.output("Main", out => out
			.configure({
				dir: "./dist",
				format: "es",
				minify: true,
				sourcemap: true,
			})
		)
	)
);

export const PyxisApplication = defineTarget("PyxisApplication", target => target
	.configure({
		platform: "browser",
		tsconfig: "./tsconfig.json",
	})
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.disable(inWatchMode)
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
		.plugin(Plugin.LoadText)
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
