import type { Plugin } from "vite";

import type { PyxisHmrPluginOptions } from "~/types";

export function pyxisHmrResolvePlugin(options: Required<PyxisHmrPluginOptions>): Plugin {
	return {
		name: `${__THIS_MODULE__}:resolve`,
		config: () => ({
			resolve: {
				alias: [
					{
						find: `${options.pyxisModule}/core`,
						replacement: `${options.pyxisModule}/core-dev`,
					},
				]
			},
		}),
	};
}
