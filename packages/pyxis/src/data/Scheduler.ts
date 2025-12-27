import { invoke, type ArgsMax5, type Callback } from "~/support/Callback";
import type { Nil } from "~/support/types";

import type { Context } from "./Context";

/**
 * Manages a queue of scheduled updates.
 * @internal
 */
export interface Scheduler {
	readonly scheduleTick: () => void;
	isUpdating: boolean;
	epoch: number;
	uh?: Nil<UpdateCallback>;
	ut?: Nil<UpdateCallback>;
}

export interface TickFn {
	(onTick: () => void): void;
}

/** @internal */
export function createScheduler(tick: TickFn) {
	let isPending = false;
	const scheduler: Scheduler = {
		isUpdating: false,
		epoch: 1,
		scheduleTick: () => {
			if (isPending) {
				return;
			}

			isPending = true;
			tick(update);
		},
	};

	const update = () => {
		try {
			scheduler.isUpdating = true;

			let current = scheduler.uh;
			let tmp;
			while (current) {
				invoke(current);
				tmp = current.un;
				current.un = null;
				current = tmp;
			}
		}
		finally {
			isPending = false;
			scheduler.isUpdating = false;
			scheduler.uh = null;
			scheduler.ut = null;
			scheduler.epoch += 1;
		}
	};

	return scheduler;
}

/**
 * An update callback that can be scheduled.
 * @see {@link Scheduler}
 * @internal
 */
export interface UpdateCallback<TArgs extends ArgsMax5 = ArgsMax5> extends Callback<TArgs> {
	un?: Nil<UpdateCallback>;
	epoch?: number;
}

/**
 * Adds the provided callback to the update queue. Does nothing if already queued.
 * @internal
 */
export function schedule(context: Context, callback: UpdateCallback): void;
export function schedule({ scheduler }: Context, callback: UpdateCallback) {
	if (callback.epoch === scheduler.epoch) {
		if (__DEV__ && scheduler.isUpdating) {
			throw new Error("Refusing to reschedule an update as it may cause an infinite loop. Are you mutating an Atom inside a reaction that depends on it?");
		}

		// if the epoch matches but scheduler is not yet updating, it simply means the same update
		// was requested multiple times, e.g. an Atom being set twice, this is OK
		return;
	}

	if (scheduler.ut) {
		scheduler.ut.un = callback;
	}
	else {
		scheduler.uh = callback;
	}

	scheduler.ut = callback;
	callback.epoch = scheduler.epoch;
	scheduler.scheduleTick();
}
