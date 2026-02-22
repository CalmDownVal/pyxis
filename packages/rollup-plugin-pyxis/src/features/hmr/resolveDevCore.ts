import type { Plugin, ResolvedId } from "rolldown";

import type { ResolvedPyxisPluginOptions } from "~/options";

export function resolveDevCore(options: ResolvedPyxisPluginOptions): Plugin {
	const coreProd = `${options.pyxisModule}/core`;
	const coreDev = `${options.pyxisModule}/core-dev`;

	let devCoreId: ResolvedId | null = null;
	return {
		name: `${__THIS_MODULE__}:DevResolver`,
		resolveId: {
			filter: {
				id: /\/core$/,
			},
			async handler(source, importer, extraOptions) {
				if (source !== coreProd) {
					return null;
				}

				devCoreId ??= await this.resolve(coreDev, importer, {
					isEntry: extraOptions.isEntry,
					kind: extraOptions.kind,
					skipSelf: true,
				});

				return devCoreId;
			},
		},
	};
}
