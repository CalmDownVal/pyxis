import * as Target from "build-logic/targets";
import * as Plugin from "build-logic/plugins";

Target.PyxisApplication.build(target => {
	target.entry("app", "./src/index.tsx");

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					dstDir: "./dist",
					include: "./static/**",
				},
			],
		})
	);
});
