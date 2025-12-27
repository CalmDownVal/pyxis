import { declarePlugin } from "@calmdownval/rollup-util";

export const Plugin = {
	BundleDts: declarePlugin(
		"BundleDts",
		async () => (await import("./plugins/BundleDts.mjs")).default,
	),

	Copy: declarePlugin(
		"Copy",
		async () => (await import("./plugins/Copy.mjs")).default,
	),

	Css: declarePlugin(
		"Css",
		async () => (await import("rollup-plugin-postcss")).default,
	),

	Delete: declarePlugin(
		"Delete",
		async () => (await import("./plugins/Delete.mjs")).default,
	),

	Externals: declarePlugin(
		"Externals",
		async () => (await import("rollup-plugin-node-externals")).default,
	),

	ImportFile: declarePlugin(
		"importFile",
		async () => (await import("rollup-plugin-import-file")).default,
	),

	LiveReload: declarePlugin(
		"liveReload",
		async () => (await import("rollup-plugin-livereload")).default,
	),

	NodeResolve: declarePlugin(
		"NodeResolve",
		async () => (await import("@rollup/plugin-node-resolve")).default,
	),

	Replace: declarePlugin(
		"Replace",
		async () => (await import("@rollup/plugin-replace")).default,
	),

	Serve: declarePlugin(
		"serve",
		async () => (await import("rollup-plugin-serve")).default,
	),

	SourceMaps: declarePlugin(
		"SourceMaps",
		async () => (await import("rollup-plugin-sourcemaps2")).default,
	),

	Terser: declarePlugin(
		"Terser",
		async () => (await import("@rollup/plugin-terser")).default,
	),

	TypeScript: declarePlugin(
		"TypeScript",
		async () => (await import("@rollup/plugin-typescript")).default,
	),
};
