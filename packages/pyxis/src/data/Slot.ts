import type { ArgsMax5 } from "~/support/Callback";
import type { Nil } from "~/support/types";

import { unmounted } from "./Context";

/**
 * Pyxis Slot type guard marker.
 */
export const S_SLOT = Symbol.for("pyxis:slot");

export interface Slot<TArgs extends ArgsMax5 = []> {
	/**
	 * Pyxis Slot type guard marker.
	 */
	readonly [S_SLOT]: true;

	/**
	 * The head of the listeners linked list.
	 * @internal
	 */
	lh?: Nil<Listener<TArgs>>;

	/**
	 * The tail of the listeners linked list.
	 * @internal
	 */
	lt?: Nil<Listener<TArgs>>;
}

/** @internal */
export interface Listener<TArgs extends ArgsMax5 = []> {
	readonly fn: (...args: TArgs) => void;
	lp?: Nil<Listener<TArgs>>;
	ln?: Nil<Listener<TArgs>>;
}

export function slot<TArgs extends ArgsMax5>(): Slot<TArgs> {
	return { [S_SLOT]: true };
}

export function trigger<TArgs extends ArgsMax5>(slot: Slot<TArgs>, ...args: TArgs): void;
export function trigger(slot: Slot<ArgsMax5>, a0: any, a1: any, a2: any, a3: any, a4: any) {
	let current = slot.lh;
	while (current) {
		current.fn(a0, a1, a2, a3, a4);
		current = current.ln;
	}
}

export function on<TArgs extends ArgsMax5>(slot: Slot<TArgs>, listener: (...args: TArgs) => void) {
	const obj: Listener<TArgs> = { fn: listener };
	if (slot.lt) {
		slot.lt.ln = obj;
		obj.lp = slot.lt;
	}
	else {
		slot.lh = obj;
	}

	slot.lt = obj;

	unmounted(() => {
		if (obj.lp) {
			obj.lp.ln = obj.ln;
		}
		else if (slot.lh === obj) {
			slot.lh = obj.ln;
		}

		if (obj.ln) {
			obj.ln.lp = obj.lp;
		}
		else if (slot.lt === obj) {
			slot.lt = obj.lp;
		}

		obj.lp = null;
		obj.ln = null;
	});
}
