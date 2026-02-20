import type { Nil } from "~/support/types";

import { notify, S_ATOM, type Atom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { getLifecycle } from "./Lifecycle";

/**
 * Describes a Context distributing data throughout the Component hierarchy.
 * @see {@link createContext}
 */
export interface Context<T> {
	/** @internal */
	readonly $symbol: symbol;

	/**
	 * A fake property kept for TypeScript to properly type-check Context compatibility.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly __type?: T;
}

/**
 * Creates a typed Context that can be used to propagate observable data throughout entire component
 * trees without "prop drilling."
 * @see {@link context}
 */
export function createContext<T>(): Context<T>;

export function createContext<T>(devId?: string): Context<T> {
	let $symbol = Symbol();
	if (__DEV__) {
		$symbol = globalThis.__PYXIS_HMR__.state.restore(createContext, devId) ?? $symbol;
		globalThis.__PYXIS_HMR__.state.preserve(createContext, devId, $symbol);
	}

	return { $symbol };
}


/** @internal */
export interface ContextContainer {
	[key: symbol]: unknown;
	readonly $parent?: Nil<ContextContainer>;
}

let currentContainer: ContextContainer | undefined;
let isNewContainer = false;

/** @internal */
export function getCurrentContainer() {
	return currentContainer;
}

/** @internal */
export function setCurrentContainer(container: ContextContainer | undefined) {
	currentContainer = container;
	isNewContainer = false;
}


interface ContextAtom<T> extends Atom<T> {
	$dep?: Nil<Dependency>;
	$ancestor?: Nil<Atom<T>>;
	$value?: T;
}

/**
 * Gets a consumer Atom for the given Context. This atom will be read-only.
 * @see {@link providerOf}
 */
export function consumerOf<T>(context: Context<T>) {
	const { $symbol } = context;
	let ptr: Nil<ContextContainer> = currentContainer;
	let atom;
	while (ptr && !(atom = ptr[$symbol] as Atom<T> | undefined)) {
		ptr = ptr.$parent;
	}

	if (__DEV__ && isNewContainer && ptr === currentContainer) {
		throw new Error("Component declares the same Context multiple times.");
	}

	return atom;
}

/**
 * Gets a provider Atom for the given Context. Any descendant components will be
 * able to consume the value and react to its updates.
 * @see {@link consumerOf}
 */
export function providerOf<T>(context: Context<T>, defaultValue?: T, devId?: string) {
	if (!isNewContainer || !currentContainer) {
		// split context, current component becomes a provider
		isNewContainer = true;
		currentContainer = {
			$parent: currentContainer,
		};
	}

	const lifecycle = getLifecycle();
	if (__DEV__) {
		globalThis.__PYXIS_HMR__.state.restore(lifecycle, devId, value => {
			defaultValue = value;
		});
	}

	const localAtom: ContextAtom<T> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		$tracksValue: true,
		$value: defaultValue,
		$get: getLocalValue,
		$set: setValue,
	};

	if (defaultValue === undefined) {
		const ancestorAtom = consumerOf(context);
		if (ancestorAtom) {
			localAtom.$get = getAncestorValue;
			localAtom.$ancestor = ancestorAtom;
			link(lifecycle, ancestorAtom, localAtom.$dep = {
				$fn: notify<T>,
				$a0: localAtom,
			});
		}
	}

	if (__DEV__) {
		localAtom.$devId = devId;
	}

	currentContainer[context.$symbol] = localAtom;
	return localAtom;
}

function getAncestorValue<T>(this: ContextAtom<T>) {
	return this.$ancestor!.$get();
}

function getLocalValue<T>(this: ContextAtom<T>) {
	return this.$value!;
}

function setValue<T>(this: ContextAtom<T>, value: T) {
	let oldValue = this.$value;
	if (this.$ancestor) {
		oldValue = this.$ancestor.$get();
		unlink(this.$dep!);
		this.$dep = null;
		this.$ancestor = null;
		this.$get = getLocalValue;
	}

	this.$value = value;
	if (__DEV__) {
		globalThis.__PYXIS_HMR__.state.preserve(this.$lifecycle, this.$devId, value);
	}

	return oldValue !== value;
}

