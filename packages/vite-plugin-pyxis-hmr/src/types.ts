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

	/**
	 * Paths or globs of files to exclude from HMR.
	 * @default []
	 */
	exclude?: (string | RegExp)[] | string | RegExp;
}
