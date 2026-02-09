import type { PyxisHmrPluginOptions } from "./common";
import { pyxisHmrResolvePlugin } from "./plugins/ResolvePlugin";
import { pyxisHmrTransformPlugin } from "./plugins/TransformPlugin";

export function pyxisHotReload(pluginOptions?: PyxisHmrPluginOptions) {
	const normalizedOptions: Required<PyxisHmrPluginOptions> = {
		pyxisModule: "@calmdown/pyxis",
		componentFactory: "component",
		...pluginOptions,
	};

	return [
		pyxisHmrResolvePlugin(),
		pyxisHmrTransformPlugin(normalizedOptions),
	];
}
