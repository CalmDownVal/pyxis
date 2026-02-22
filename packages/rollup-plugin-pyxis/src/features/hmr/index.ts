import type { ResolvedPyxisPluginOptions } from "~/options";
import { resolveDevCore } from "~/features/hmr/resolveDevCore";
import { transpile } from "~/transpiler";
import { createModuleChecker } from "~/utils";

import { transpileExportedSymbols } from "./transpileExportedSymbols";
import { transpileFactoryCalls, type TranspileFactoryCallsContext } from "./transpileFactoryCalls";

export function pyxisHMR(options: ResolvedPyxisPluginOptions) {
	if (!options.hmr) {
		return [];
	}

	return [
		resolveDevCore(options),
		transpile({
			include: options.hmr!.include,
			exclude: options.hmr!.exclude,
			order: "pre",
			async init(): Promise<TranspileFactoryCallsContext> {
				return {
					isPyxisModule: await createModuleChecker(this, [
						options.pyxisModule,
						`${options.pyxisModule}/core`,
						`${options.pyxisModule}/core-dev`,
					]),
				};
			},
			async process(call) {
				await transpileExportedSymbols(call);
				await transpileFactoryCalls(call);
			},
		}),
	];
}
