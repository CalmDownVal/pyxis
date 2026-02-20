import * as Target from "build-logic/targets";
import * as Plugin from "build-logic/plugins";

// production build
Target.TypeScriptLibrary.build(target => {
	target.entry("core", "./src/exports/core.ts");
	target.configure({
		external: [ "@calmdown/pyxis", "@calmdown/pyxis/core" ],
		transform: {
			define: {
				__DEV__: "false",
			},
		},
	});

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					destination: "./dist",
					include: "./src/exports/*.{js,d.ts}",
				},
			],
		})
	);
});

// development build
Target.TypeScriptLibrary.build(target => {
	target.entry("core-dev", "./src/exports/core-dev.ts");
	target.configure({
		external: [ "@calmdown/pyxis", "@calmdown/pyxis/core" ],
		transform: {
			define: {
				__DEV__: "true",
			},
		},
	});

	target.pipelines.Code.plugins.Delete.disable();
	target.pipelines.Code.outputs.Main.configure({
		minify: false,
	});
});
