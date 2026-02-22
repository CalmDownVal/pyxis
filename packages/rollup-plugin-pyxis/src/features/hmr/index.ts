import type { ResolvedPyxisPluginOptions } from "~/options";
import { resolveDevCore } from "~/features/hmr/resolveDevCore";
import { transpile } from "~/transpiler";

import { transpileExportedSymbols } from "./transpileExportedSymbols";
import { transpileFactoryCalls } from "./transpileFactoryCalls";

export function pyxisHMR(options: ResolvedPyxisPluginOptions) {
	return options.hmr
		? [
			resolveDevCore(options),
			transpile({
				include: options.hmr!.include,
				exclude: options.hmr!.exclude,
				run(call) {
					transpileExportedSymbols(call);
					transpileFactoryCalls(call, options);
				},
			}),
		]
		: [];
}
