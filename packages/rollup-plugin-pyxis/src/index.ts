import type { Plugin } from "rolldown";

import { pyxisCssModules } from "./features/cssModules";
import { pyxisHMR } from "./features/hmr";
import { resolveOptions, type PyxisPluginOptions } from "./options";

export type * from "./options";

export default function pyxis(pluginOptions?: PyxisPluginOptions) {
	const options = resolveOptions(pluginOptions);

	// some features gracefully detect Vite, but it is not required
	// the plugin runs just fine under Rollup/Rolldown
	// -> force the typings
	return [
		...pyxisCssModules(options),
		...pyxisHMR(options),
	] as Plugin[];
}
