import type { ArgsMax5 } from "~/support/Callback";
import type { Nil } from "~/support/types";

import { unmounted } from "./Context";

/**
 * Pyxis Slot type guard marker.
 */
export const S_SLOT = __DEV__ ? Symbol.for("pyxis:slot") : Symbol();

export interface Slot<TArgs extends ArgsMax5 = []> {
	/**
	 * Pyxis Slot type guard marker.
	 */
	readonly [S_SLOT]: true;

	/**
	 * A fake property kept for TypeScript to properly type-check Slot compatibility.
	 * @deprecated Not to be used! Only holds the value type and does not actually exist at runtime.
	 */
	__slotType?: (...args: TArgs) => void;
}

interface SlotInternal<TArgs extends ArgsMax5> extends Slot<TArgs> {
	/** The head of the listeners linked list. */
	$lh?: Nil<Listener<TArgs>>;

	/** The tail of the listeners linked list. */
	$lt?: Nil<Listener<TArgs>>;
}

interface Listener<TArgs extends ArgsMax5 = []> {
	readonly $fn: (...args: TArgs) => void;
	$lp?: Nil<Listener<TArgs>>;
	$ln?: Nil<Listener<TArgs>>;
}

export function slot<TArgs extends ArgsMax5>(): Slot<TArgs> {
	return { [S_SLOT]: true };
}

export function trigger<TArgs extends ArgsMax5>(slot: Slot<TArgs>, ...args: TArgs): void;
export function trigger(slot: SlotInternal<ArgsMax5>, a0: any, a1: any, a2: any, a3: any, a4: any) {
	let current = slot.$lh;
	while (current) {
		current.$fn(a0, a1, a2, a3, a4);
		current = current.$ln;
	}
}

export function on<TArgs extends ArgsMax5>(slot: Slot<TArgs>, listener: (...args: TArgs) => void): void;
export function on<TArgs extends ArgsMax5>(slot: SlotInternal<TArgs>, listener: (...args: TArgs) => void) {
	const obj: Listener<TArgs> = { $fn: listener };
	if (slot.$lt) {
		slot.$lt.$ln = obj;
		obj.$lp = slot.$lt;
	}
	else {
		slot.$lh = obj;
	}

	slot.$lt = obj;

	unmounted(() => {
		if (obj.$lp) {
			obj.$lp.$ln = obj.$ln;
		}
		else if (slot.$lh === obj) {
			slot.$lh = obj.$ln;
		}

		if (obj.$ln) {
			obj.$ln.$lp = obj.$lp;
		}
		else if (slot.$lt === obj) {
			slot.$lt = obj.$lp;
		}

		obj.$lp = null;
		obj.$ln = null;
	});
}
