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

export const LoadText = definePlugin(
	"LoadText",
	async () => (await import("@calmdown/rollup-plugin-text-loader")).default,
);
