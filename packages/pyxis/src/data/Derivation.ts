import { notify, S_ATOM, type Atom } from "./Atom";
import { getLifecycle } from "./Lifecycle";
import { unlink } from "./Dependency";
import { resolve, type Reaction, type ReactionDependency } from "./Reaction";
import { schedule } from "./Scheduler";

/**
 * Holds a value derived from values of other Atoms, managing reactions to their changes.
 * Derivations are read-only. Use the `read` function to access its value.
 * @see {@link read}
 */
export interface Derivation<T = unknown> extends Atom<T>, Reaction<T> {
	/** @internal */
	$dirty: boolean;

	/** @internal */
	$value?: T;
}

/**
 * Creates a Derivation - an Atom with a value computed from other Atoms. Derivations are updated
 * lazily, i.e. only when they're accessed and at least one of its source Atoms changed.
 */
export function derivation<T>(block: () => T, lifecycle = getLifecycle()): Derivation<T> {
	return {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		$dirty: true,
		$epoch: 0,
		$block: block,
		$react: scheduleNotify,
		$get: getValue,
		$set: setValue,
	};
}

function scheduleNotify(this: ReactionDependency, derivation: Derivation<any>, epoch: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the reaction.
	if (derivation.$epoch > epoch) {
		unlink(this);
		return;
	}

	// we're already within a scheduler tick; the reaction will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already scheduled updates and prevents
	// infinite loops when dependency cycles exist
	derivation.$dirty = true;
	schedule(derivation.$lifecycle, derivation.$notify ??= {
		$fn: notify,
		$a0: derivation,
	});
}

function getValue<T>(this: Derivation<T>): T {
	if (this.$dirty) {
		this.$value = resolve(this);
		this.$dirty = false;
	}

	return this.$value!;
}

function setValue() {
	return false;
}
