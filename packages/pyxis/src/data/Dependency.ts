import type { ArgsMax2, Callback, Nil } from "~/support/types";

import type { LifecycleInternal } from "./Lifecycle";

/**
 * A dependency callback of an Atom. The callback will be run whenever the relevant Atom changes.
 * @internal
 */
export interface Dependency<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	$lifecycle?: Nil<DependencyList>;
	$target?: Nil<DependencyList<TArgs>>;

	/** Previous Dependency within an Atom's dependency list. */
	$ap?: Nil<Dependency<TArgs>>;

	/** Next Dependency within an Atom's dependency list. */
	$an?: Nil<Dependency<TArgs>>;

	/** Previous Dependency within a Lifecycle's dependency list. */
	$lp?: Nil<Dependency>;

	/** Next Dependency within an Lifecycle's dependency list. */
	$ln?: Nil<Dependency>;
}

/** @internal */
export interface DependencyList<TArgs extends ArgsMax2 = ArgsMax2> {
	/** The head of the dependencies linked list. */
	$dh?: Nil<Dependency<TArgs>>;

	/** The tail of the dependencies linked list. */
	$dt?: Nil<Dependency<TArgs>>;
}

/**
 * Links a Dependency to an Atom and Lifecycle.
 * @internal
 */
export function link<TArgs extends ArgsMax2>(lifecycle: LifecycleInternal, target: DependencyList<TArgs>, dep: Dependency<TArgs>) {
	// link to target
	if (target.$dt) {
		target.$dt.$an = dep;
		dep.$ap = target.$dt;
	}
	else {
		target.$dh = dep;
	}

	dep.$target = target;
	target.$dt = dep;

	// link to lifecycle
	if (lifecycle.$dt) {
		lifecycle.$dt.$ln = dep as Dependency;
		dep.$lp = lifecycle.$dt;
	}
	else {
		lifecycle.$dh = dep as Dependency;
	}

	dep.$lifecycle = lifecycle;
	lifecycle.$dt = dep as Dependency;
}

/**
 * Unlinks a Dependency from the Atom and Lifecycle it has been linked to.
 * @internal
 */
export function unlink(dep: Dependency) {
	// unlink from target
	const target = dep.$target!;
	if (dep.$ap) {
		dep.$ap.$an = dep.$an;
	}
	else if (target.$dh === dep) {
		target.$dh = dep.$an;
	}

	if (dep.$an) {
		dep.$an.$ap = dep.$ap;
	}
	else if (target.$dt === dep) {
		target.$dt = dep.$ap;
	}

	dep.$target = null;
	dep.$ap = null;
	dep.$an = null;

	// unlink from lifecycle
	const lifecycle = dep.$lifecycle!;
	if (dep.$lp) {
		dep.$lp.$ln = dep.$ln;
	}
	else if (lifecycle.$dh === dep) {
		lifecycle.$dh = dep.$ln;
	}

	if (dep.$ln) {
		dep.$ln.$lp = dep.$lp;
	}
	else if (lifecycle.$dt === dep) {
		lifecycle.$dt = dep.$lp;
	}

	dep.$lifecycle = null;
	dep.$lp = null;
	dep.$ln = null;
}
