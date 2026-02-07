import { definePlugin } from "@calmdown/rolldown-workspace";

export const Copy = definePlugin(
	"Copy",
	async () => (await import("@calmdown/rollup-plugin-copy")).default,
);

export const Declarations = definePlugin(
	"Declarations",
	async () => (await import("rolldown-plugin-dts")).dts,
);

export const Delete = definePlugin(
	"Delete",
	async () => (await import("@calmdown/rollup-plugin-delete")).default,
);

export const ImportFile = definePlugin(
	"ImportFile",
	async () => (await import("rollup-plugin-import-file")).default,
);

export const LiveReload = definePlugin(
	"LiveReload",
	async () => (await import("rollup-plugin-livereload")).default,
);

export const LoadText = definePlugin(
	"LoadText",
	async () => (await import("@calmdown/rollup-plugin-text-loader")).default,
);

export const Serve = definePlugin(
	"Serve",
	async () => (await import("rollup-plugin-serve")).default,
);
