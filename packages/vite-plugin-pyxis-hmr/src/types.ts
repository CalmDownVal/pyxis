export interface PyxisHmrPluginOptions {
	/**
	 * The name of the Pyxis module.
	 * @default "@calmdown/pyxis"
	 */
	pyxisModule?: string;

	/**
	 * Paths or globs of files to exclude from HMR.
	 * @default []
	 */
	exclude?: (string | RegExp)[] | string | RegExp;
}
