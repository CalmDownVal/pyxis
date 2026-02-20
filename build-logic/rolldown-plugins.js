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
