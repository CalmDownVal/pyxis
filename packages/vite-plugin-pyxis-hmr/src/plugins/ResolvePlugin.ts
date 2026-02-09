import * as path from "node:path";

import type { Plugin } from "vite";

import { PLUGIN_NAME, REGISTRY_IMPORT } from "~/common";

export function pyxisHmrResolvePlugin(): Plugin {
	// we're running inside of ./dist/index.js
	// so we can simply get the path to the adjacent registry.js
	const registryPath = path.join(import.meta.dirname, "./registry.js");
	return {
		name: `${PLUGIN_NAME}:resolve`,
		resolveId: {
			handler: () => registryPath,
			filter: {
				id: new RegExp(`^${REGISTRY_IMPORT}$`),
			},
		},
	};
}
