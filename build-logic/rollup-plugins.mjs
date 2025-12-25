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

	Delete: declarePlugin(
		"Delete",
		async () => (await import("./plugins/Delete.mjs")).default,
	),

	Externals: declarePlugin(
		"Externals",
		async () => (await import("rollup-plugin-node-externals")).default,
	),

	NodeResolve: declarePlugin(
		"NodeResolve",
		async () => (await import("@rollup/plugin-node-resolve")).default,
	),

	Replace: declarePlugin(
		"Replace",
		async () => (await import("@rollup/plugin-replace")).default,
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
