import { Target } from "build-logic/targets";
import { Plugin } from "build-logic/plugins";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");

	target.pipelines.Code.plugins.Terser
		.configure({
			mangle: {
				properties: {
					regex: /^\$.+$/,
				},
			},
		});

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					destination: "./dist",
					include: [
						"./src/jsx/jsx-runtime.js",
						"./src/jsx/jsx-runtime.d.ts",
					],
				},
			],
		}));
});
