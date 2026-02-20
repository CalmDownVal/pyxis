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

	public restore<T = any>(handle: WeakKey | undefined, devId: string | undefined): T;
	public restore<T>(handle: WeakKey | undefined, devId: string | undefined, block: (value: any) => T): T | undefined;
	public restore(handle: WeakKey | undefined, devId: string | undefined, block?: (value: any) => any) {
		if (!handle || !devId) {
			return undefined;
		}

		const map = this.state.get(handle);
		if (!map || !Object.hasOwn(map, devId)) {
			return undefined;
		}

		return block
			? block(map[devId])
			: map[devId];
	}
}
