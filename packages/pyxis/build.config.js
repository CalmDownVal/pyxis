import * as Target from "build-logic/targets";
import * as Plugin from "build-logic/plugins";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");
	target.entry("jsx-runtime", "./src/jsx/runtime.ts");
	target.entry("jsx-dev-runtime", "./src/jsx/runtimeDev.ts");

	target.configure({
		external: [ "@calmdown/pyxis" ],
	});

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					destination: "./dist",
					include: "./src/jsx/jsx-{dev-,}runtime.*",
				},
			],
		})
	);
});
