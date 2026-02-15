import { invokeAll } from "~/support/common";
import type { ArgsMax2, Callback, Nil } from "~/support/types";

import type { LifecycleInternal } from "./Lifecycle";

/**
 * Manages a queue of scheduled updates.
 * @internal
 */
export interface Scheduler {
	readonly $scheduleTick: () => void;
	$isUpdating: boolean;
	$epoch: number;
	$pending?: Nil<UpdateCallback[]>;
}

/**
 * An update callback that can be scheduled.
 * @see {@link Scheduler}
 * @internal
 */
export interface UpdateCallback<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	$epoch?: number;
}

/**
 * A function able to schedule a callback to be executed at a later time, e.g. `queueMicrotask`.
 * The function must guarantee that the callback will be eventually executed.
 */
export interface TickFn {
	(onTick: () => void): void;
}

/** @internal */
export function createScheduler(tick: TickFn) {
	let isPending = false;
	const scheduler: Scheduler = {
		$isUpdating: false,
		$epoch: 1,
		$scheduleTick: () => {
			if (isPending) {
				return;
			}

			isPending = true;
			tick(update);
		},
	};

	const update = () => {
		try {
			scheduler.$isUpdating = true;
			invokeAll(scheduler.$pending);
		}
		finally {
			isPending = false;
			scheduler.$isUpdating = false;
			scheduler.$pending = null;
			scheduler.$epoch += 1;
		}
	};

	return scheduler;
}

/**
 * Adds the provided callback to the update queue. Does nothing if already queued.
 * @internal
 */
export function schedule({ $scheduler }: LifecycleInternal, callback: UpdateCallback) {
	if (callback.$epoch === $scheduler.$epoch) {
		if (__DEV__ && $scheduler.$isUpdating) {
			throw new Error("Refusing to reschedule an update as it may cause an infinite loop. Are you mutating an Atom inside a reaction that depends on it?");
		}

		// if the epoch matches but scheduler is not yet updating, it simply means the same update
		// was requested multiple times, e.g. an Atom being set twice, this is OK
		return;
	}

	callback.$epoch = $scheduler.$epoch;
	($scheduler.$pending ??= []).push(callback);
	$scheduler.$scheduleTick();
}
