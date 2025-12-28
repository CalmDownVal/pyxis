import { invoke } from "~/support/Callback";
import type { Nil } from "~/support/types";

import { isAtom, S_ATOM, type Atom, type MaybeAtom } from "./Atom";
import { getContext } from "./Context";
import { link, unlink, type Dependency } from "./Dependency";

export interface ProxyAtom<T> extends Atom<T> {
	/** @internal */
	dep?: Dependency;

	/** @internal */
	bound?: Nil<Atom<T>>;

	/** @internal */
	value?: Nil<T>;

	/**
	 * Binds this ProxyAtom to a new value. If it is an Atom, the proxy will mirror it, otherwise it
	 * will be a read-only atom with a static value until rebound.
	 */
	bind(value: MaybeAtom<T>): void;
}

/**
 * Creates a ProxyAtom bound to the provided initial value. If it is an Atom, the proxy will mirror
 * it, otherwise it will be a read-only atom with a static value until rebound.
 */
export function proxy<T>(initialValue: MaybeAtom<T>, context = getContext()) {
	const self = {
		[S_ATOM]: true,
		context,
		bind,
		get: getStaticValue,
	} as ProxyAtom<T>;

	self.bind(initialValue);
	return self;
}

function bind<T>(this: ProxyAtom<T>, value: MaybeAtom<T>) {
	if (this.dep) {
		unlink(this.dep);
	}

	const oldValue = this.get();
	if (isAtom(value)) {
		this.bound = value;
		this.value = null;
		this.get = getBoundValue;
		this.set = setBoundValue;
		link(this.context, value, this.dep ??= {
			fn: notify,
			a0: this,
		});
	}
	else {
		this.bound = null;
		this.value = value;
		this.get = getStaticValue;
		this.set = setStaticValue;
	}

	if (oldValue !== this.get()) {
		notify(this);
	}
}

function getBoundValue<T>(this: ProxyAtom<T>) {
	return this.bound!.get();
}

function setBoundValue<T>(this: ProxyAtom<T>, value: T) {
	return this.bound!.set(value);
}

function getStaticValue<T>(this: ProxyAtom<T>) {
	return this.value!;
}

function setStaticValue(this: ProxyAtom<any>) {
	return false;
}

function notify(input: ProxyAtom<any>) {
	let current = input.dh;
	while (current) {
		invoke(current);
		current = current.an;
	}
}
