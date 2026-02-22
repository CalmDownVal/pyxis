import type { ResolvedPyxisPluginOptions } from "~/options";
import { transpile } from "~/transpiler";

import { CLASS_NAME_MAP_KEY } from "./common";
import { transformCssModules } from "./transformCssModules";
import { transpileClassNames } from "./transpileClassNames";

export function pyxisCssModules(options: ResolvedPyxisPluginOptions) {
	if (!options.cssModules) {
		return [];
	}

	return [
		transformCssModules(options),
		transpile({
			include: /\.m?[jt]sx?$/i,
			exclude: [],
			async run(call) {
				await transpileClassNames(call, options, async source => {
					const resolved = await this.resolve(source, call.moduleId, {
						isEntry: false,
						kind: "import-statement",
					});

					if (!resolved) {
						return {};
					}

					const module = await this.load({ id: resolved.id });
					return module.meta[CLASS_NAME_MAP_KEY] ?? {};
				});
			},
		})
	];
}
