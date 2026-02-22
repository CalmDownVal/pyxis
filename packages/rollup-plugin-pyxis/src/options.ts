import type { CSSModulesConfig, TransformOptions } from "lightningcss";

export interface PyxisPluginOptions {
	/**
	 * The name of the Pyxis module.
	 * @default "@calmdown/pyxis"
	 */
	pyxisModule?: string;

	/**
	 * Whether to enable transformations for CSS modules. A string may be passed
	 * to specify a glob to match CSS module files.
	 *
	 * Note that to use this feature, the optional `lightningcss` dependency
	 * **must be installed**.
	 *
	 * @default false
	 */
	cssModules?: PyxisCssModulesOptions | null | boolean;

	/**
	 * Whether to apply transformations to enable hot module replacement (HMR)
	 * with Vite dev server.
	 * @default false
	 */
	hmr?: PyxisHMROptions | null | boolean;
}

export interface PyxisCssModulesOptions {
	/**
	 * Regular expression(s) matching file names to consider as CSS sources.
	 * @default /\.css$/i
	 */
	include?: RegExp;

	/**
	 * Regular expression(s) matching files NOT to consider as CSS sources.
	 * @default undefined
	 */
	exclude?: RegExp;

	/**
	 * Regular expression matching CSS sources to consider as CSS modules.
	 * @default /\.module\.css$/i
	 */
	modulePattern?: RegExp;

	/**
	 * The prefix of the `ClassListExtension` to rewrite class names.
	 * @default "cl"
	 */
	cssExtensionPrefix?: string;

	/**
	 * Custom Lightning CSS option overrides.
	 * @default {}
	 */
	lightningcss?: Omit<TransformOptions<any>, "code" | "cssModules" | "filename" | "projectRoot" | "sourceMap"> & {
		cssModules?: CSSModulesConfig | true;
	};
}

export interface PyxisHMROptions {
	/**
	 * Paths or globs to include in HMR.
	 * @default /\.m?[jt]sx?$/i
	 */
	include?: (string | RegExp)[] | string | RegExp;

	/**
	 * Paths or globs to exclude from HMR.
	 * @default []
	 */
	exclude?: (string | RegExp)[] | string | RegExp;
}

/** @internal */
export type ResolvedPyxisPluginOptions = ReturnType<typeof resolveOptions>;

/** @internal */
export function resolveOptions(options?: PyxisPluginOptions) {
	const cssModules = defaultObject(options?.cssModules);
	const hmr = defaultObject(options?.hmr);
	return {
		pyxisModule: options?.pyxisModule ?? "@calmdown/pyxis",
		cssModules: cssModules && {
			include: cssModules.include ?? /\.css$/i,
			exclude: cssModules.exclude ?? undefined,
			modulePattern: cssModules.modulePattern ?? /\.module\.css$/i,
			cssExtensionPrefix: cssModules.cssExtensionPrefix ?? "cl",
			lightningcss: cssModules.lightningcss ?? {},
		},
		hmr: hmr && {
			include: hmr.include ?? /\.m?[jt]sx?$/i,
			exclude: hmr.exclude ?? undefined,
		},
	} satisfies PyxisPluginOptions;
}

function defaultObject<T>(value: T | boolean | undefined) {
	switch (typeof value) {
		case "boolean":
			return value ? {} as T : null;

		case "object":
			return value;

		default:
			return null;
	}
}
