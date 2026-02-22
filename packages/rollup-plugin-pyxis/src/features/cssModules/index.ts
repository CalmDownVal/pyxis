import type { ResolvedPyxisPluginOptions } from "~/options";
import { transpile } from "~/transpiler";
import { createModuleChecker } from "~/utils";

import { CLASS_NAME_MAP_KEY } from "./common";
import { transformCssModules } from "./transformCssModules";
import { transpileClassNames, type TranspileClassNamesContext } from "./transpileClassNames";

export function pyxisCssModules(options: ResolvedPyxisPluginOptions) {
	if (!options.cssModules) {
		return [];
	}

	return [
		transformCssModules(options),
		transpile({
			include: /\.m?[jt]sx?$/i,
			exclude: [],
			order: "post",
			async init(): Promise<TranspileClassNamesContext> {
				return {
					isPyxisModule: await createModuleChecker(this, [
						options.pyxisModule,
						`${options.pyxisModule}/core`,
						`${options.pyxisModule}/core-dev`,
						`${options.pyxisModule}/jsx-runtime`,
						`${options.pyxisModule}/jsx-dev-runtime`,
					]),
					resolveCssExports: async (source, moduleId) => {
						const resolved = await this.resolve(source, moduleId, {
							isEntry: false,
							kind: "import-statement",
						});

						if (!resolved) {
							return {};
						}

						const module = await this.load({
							id: resolved.id,
							resolveDependencies: false,
						});

						return module.meta[CLASS_NAME_MAP_KEY] ?? {};
					},
				};
			},
			process: call => transpileClassNames(options, call),
		})
	];
}
