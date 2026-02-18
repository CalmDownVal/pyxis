import type { ComponentBlock } from "~/Component";

declare global {
	// we expect this global to exist in ~all environments
	function queueMicrotask(callback: () => void): void;
}

export interface HotComponentEntry {
	component: ComponentBlock;
	dirty: boolean;
	lh?: HotComponentListener | null;
	lt?: HotComponentListener | null;
}

export interface HotComponentListener {
	readonly fn: HotComponentListenerFn;
	readonly entry: HotComponentEntry;
	lp?: HotComponentListener | null;
	ln?: HotComponentListener | null;
}

export interface HotComponentListenerFn {
	(component: ComponentBlock): void;
}

export class ComponentRegistry {
	private readonly components = new Map<string, HotComponentEntry>();
	private isPendingUpdate = false;

	public on(id: string, fn: HotComponentListenerFn): HotComponentListener {
		const entry = this.components.get(id);
		if (!entry) {
			throw new Error(`no component was registered under "${id}"`);
		}

		const listener: HotComponentListener = { fn, entry };
		if (entry.lt) {
			entry.lt.ln = listener;
			listener.lp = entry.lt;
		}
		else {
			entry.lh = listener;
		}

		entry.lt = listener;
		fn(entry.component);

		return listener;
	}

	public off(listener: HotComponentListener) {
		const { entry } = listener;
		if (listener.lp) {
			listener.lp.ln = listener.ln;
		}
		else if (entry.lh === listener) {
			entry.lh = listener.ln;
		}

		if (listener.ln) {
			listener.ln.lp = listener.lp;
		}
		else if (entry.lt === listener) {
			entry.lt = listener.lp;
		}

		listener.lp = null;
		listener.ln = null;
	}

	public subscribe(id: string, fn: HotComponentListenerFn) {
		const listener = this.on(id, fn);
		return () => this.off(listener);
	}

	public upsert(id: string, component: ComponentBlock) {
		const entry = this.components.get(id);
		if (!entry) {
			this.components.set(id, {
				component,
				dirty: false,
			});

			return;
		}

		entry.component = component;
		entry.dirty = true;
		if (!this.isPendingUpdate) {
			queueMicrotask(this.update);
		}
	}

	private readonly update = () => {
		this.isPendingUpdate = false;
		this.components.forEach(entry => {
			if (!entry.dirty) {
				return;
			}

			let current = entry.lh;
			while (current) {
				current.fn(entry.component);
				current = current.ln;
			}

			entry.dirty = false;
		});
	};
}
