declare global {
	var __pyxisRegistry: PyxisComponentRegistry | undefined;
}

interface HotComponentEntry {
	hash: string;
	component: unknown;
	dirty: boolean;
	lh?: HotComponentListener | null;
	lt?: HotComponentListener | null;
}

interface HotComponentListener {
	readonly fn: HotComponentListenerFn;
	readonly entry: HotComponentEntry;
	lp?: HotComponentListener | null;
	ln?: HotComponentListener | null;
}

interface HotComponentListenerFn {
	(component: unknown): void;
}

export default class PyxisComponentRegistry {
	private readonly components = new Map<string, HotComponentEntry>();
	private isPendingUpdate = false;

	public on(hash: string, fn: HotComponentListenerFn): HotComponentListener {
		const entry = this.components.get(hash);
		if (!entry) {
			throw new Error(`no component was registered under "${hash}"`);
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

		listener.ln = null;
		listener.lp = null;
	}

	public upsert(hash: string, component: unknown) {
		const entry = this.components.get(hash);
		if (!entry) {
			this.components.set(hash, {
				hash,
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


	public static get current() {
		return (globalThis.__pyxisRegistry ??= new PyxisComponentRegistry());
	}
}
