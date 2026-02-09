import * as Target from "build-logic/targets";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");
	target.entry("registry", "./src/registry.ts");

	target.configure({
		external: [ "node:crypto", "node:path" ],
	});
});
