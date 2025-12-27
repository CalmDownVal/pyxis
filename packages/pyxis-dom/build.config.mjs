import { Target } from "build-logic/targets";
import { Plugin } from "build-logic/plugins";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					destination: "./dist",
					include: "./src/jsx.d.ts",
				},
			],
		}));

	// remove the "@calmdown/pyxis-dom" path resolution to preserve imports
	const compilerOptions = {
		paths: {
			"~/*": [ "*" ],
		},
	};

	target.pipelines.Code.plugins.BundleDts
		.configure({ compilerOptions });

	target.pipelines.Code.plugins.TypeScript
		.configure({ compilerOptions });

	target.pipelines.Code.plugins.Externals
		.configure({
			include: [ "@calmdown/pyxis-dom" ],
		});
});
