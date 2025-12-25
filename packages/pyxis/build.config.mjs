import { Target } from "build-logic/targets";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");
	target.entry("jsx-runtime", "./src/jsx-runtime.ts");

	// remove the "@calmdown/pyxis" path resolution to preserve imports
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
			include: [ "@calmdown/pyxis" ],
		});
});
