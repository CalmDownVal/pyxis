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
});
