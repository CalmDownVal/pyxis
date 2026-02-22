import * as Target from "build-logic/targets";

Target.TypeScriptLibrary.build((target, context) => {
	target.entry("index", "./src/index.ts");

	target.configure({
		external: [ "node:path", "lightningcss" ],
		transform: {
			define: {
				__THIS_MODULE__: JSON.stringify(context.moduleName),
			},
		},
	});
});
