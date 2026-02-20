import { ComponentRegistry } from "./ComponentRegistry";
import { StateRegistry } from "./StateRegistry";

export interface PyxisHotReload {
	readonly component: ComponentRegistry;
	readonly state: StateRegistry;
}

declare global {
	var __PYXIS_HMR__: PyxisHotReload;
}

globalThis.__PYXIS_HMR__ = {
	component: new ComponentRegistry(),
	state: new StateRegistry(),
};
