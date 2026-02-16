import type { Nil } from "~/support/types";

import { isAtom, notify, S_ATOM, type Atom, type MaybeAtom } from "./Atom";
import { getLifecycle } from "./Lifecycle";
import { link, unlink, type Dependency } from "./Dependency";

export interface ProxyAtom<T> extends Atom<T> {
	/**
	 * Binds this ProxyAtom to a new value. If it is an Atom, the proxy will mirror it, otherwise it
	 * will be a read-only atom with a static value until rebound.
	 */
	use: (value: MaybeAtom<T>) => void;

	/** @internal */
	$dep?: Dependency;

	/** @internal */
	$bound?: Nil<Atom<T>>;

	/** @internal */
	$value?: Nil<T>;
}

/**
 * Creates a ProxyAtom bound to the provided initial value. If it is an Atom, the proxy will mirror
 * it, otherwise it will be a read-only atom with a static value until rebound.
 */
export function proxy<T>(initialValue: MaybeAtom<T>, lifecycle = getLifecycle()): ProxyAtom<T> {
	// $set is assigned by the use call below
	const self: Omit<ProxyAtom<T>, "$set"> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		use,
		$get: getStaticValue,
	};

	self.use(initialValue);
	return self as ProxyAtom<T>;
}

function use<T>(this: ProxyAtom<T>, value: MaybeAtom<T>) {
	if (this.$dep) {
		unlink(this.$dep);
	}

	const oldValue = this.$get();
	if (isAtom(value)) {
		this.$bound = value;
		this.$value = null;
		this.$get = getBoundValue;
		this.$set = setBoundValue;
		link(this.$lifecycle, value, this.$dep ??= {
			$fn: notify<T>,
			$a0: this,
		});
	}
	else {
		this.$bound = null;
		this.$value = value;
		this.$get = getStaticValue;
		this.$set = setStaticValue;
	}

	if (oldValue !== this.$get()) {
		notify(this);
	}
}

function getBoundValue<T>(this: ProxyAtom<T>) {
	return this.$bound!.$get();
}

function setBoundValue<T>(this: ProxyAtom<T>, value: T) {
	return this.$bound!.$set(value);
}

function getStaticValue<T>(this: ProxyAtom<T>) {
	return this.$value!;
}

function setStaticValue(this: ProxyAtom<any>) {
	return false;
}
