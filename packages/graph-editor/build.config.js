import * as Target from "build-logic/targets";

Target.PyxisApplication.build(target => {
	target.entry("app", "./src/index.tsx");
});
