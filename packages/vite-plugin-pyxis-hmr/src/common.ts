export const PLUGIN_NAME = "vite-plugin-pyxis-hmr";
export const REGISTRY_IMPORT = "@calmdown/vite-plugin-pyxis-hmr/registry";

export interface PyxisHmrPluginOptions {
	/**
	 * The name of the Pyxis module.
	 * @default "@calmdown/pyxis"
	 */
	pyxisModule?: string;

	/**
	 * The name of the Pyxis component factory.
	 * @default "component"
	 */
	componentFactory?: string;
}
