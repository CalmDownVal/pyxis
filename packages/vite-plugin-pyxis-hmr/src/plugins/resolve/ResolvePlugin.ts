import * as path from "node:path";

import type { Plugin } from "vite";

export function pyxisHmrResolvePlugin(): Plugin {
	// we're running inside of ./dist/index.js
	// so we can simply get the path to the adjacent registry.js
	const registryPath = path.join(import.meta.dirname, "./registry.js");
	return {
		name: `${__THIS_MODULE__}:resolve`,
		resolveId: {
			handler: () => registryPath,
			filter: {
				id: new RegExp(`^${__REGISTRY_MODULE__}$`),
			},
		},
	};
}
