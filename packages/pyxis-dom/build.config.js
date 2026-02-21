import * as Target from "build-logic/targets";
import * as Plugin from "build-logic/plugins";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");

	target.configure({
		external: [ "@calmdown/pyxis/core", "@calmdown/pyxis-dom" ],
	});

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					dstDir: "./dist",
					include: "./src/jsx.d.ts",
				},
			],
		})
	);
});
