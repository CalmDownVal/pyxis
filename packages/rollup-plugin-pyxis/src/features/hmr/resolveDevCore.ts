import type { ResolvedId } from "rolldown";
import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "~/options";

export function resolveDevCore(options: ResolvedPyxisPluginOptions): Plugin {
	const coreProd = `${options.pyxisModule}/core`;
	const coreDev = `${options.pyxisModule}/core-dev`;

	let coreDevId: ResolvedId | null = null;
	return {
		name: `${__THIS_MODULE__}:DevResolver`,
		enforce: "pre",
		config() {
			// mix in resolution alias (Vite only)
			return {
				resolve: {
					alias: {
						[coreProd]: coreDev,
					},
				},
			};
		},
		resolveId: {
			filter: {
				id: /\/core$/,
			},
			order: "pre",
			async handler(source, importer, extraOptions) {
				if (source !== coreProd) {
					return null;
				}

				coreDevId ??= await this.resolve(coreDev, importer, {
					isEntry: extraOptions.isEntry,
					kind: extraOptions.kind,
					skipSelf: true,
				});

				return coreDevId;
			},
		},
	};
}
