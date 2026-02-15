import * as Target from "build-logic/targets";

Target.TypeScriptLibrary.build((target, context) => {
	target.entry("index", "./src/index.ts");
	target.entry("registry", "./src/registry.ts");

	target.configure({
		external: [ "node:path" ],
		transform: {
			define: {
				__THIS_MODULE__: JSON.stringify(context.moduleName),
				__REGISTRY_MODULE__: JSON.stringify(`${context.moduleName}/registry`),
			},
		},
	});
});
