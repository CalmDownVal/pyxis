type StateMap = { [K in string]?: unknown };

export class StateRegistry {
	private readonly state = new WeakMap<WeakKey, StateMap>();

	public preserve(handle: WeakKey | undefined, devId: string | undefined, value: any) {
		if (!handle || !devId) {
			return;
		}

		let map = this.state.get(handle);
		if (!map) {
			this.state.set(handle, map = {});
		}

		map[devId] = value;
	}

	public restore(handle: WeakKey | undefined, devId: string | undefined, block: (value: any) => void) {
		if (!handle || !devId) {
			return;
		}

		const map = this.state.get(handle);
		if (!map) {
			return;
		}

		if (Object.hasOwn(map, devId)) {
			block(map[devId]);
		}
	}
}
