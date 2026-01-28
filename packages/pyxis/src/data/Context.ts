import type { Nil } from "~/support/types";

import { notify, S_ATOM, type Atom, type AtomInternal } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { getLifecycle, type LifecycleInternal } from "./Lifecycle";

/**
 * Describes a Context distributing data throughout the Component hierarchy.
 * @see {@link createContext}
 */
export interface Context<T> {
	/** @internal */
	readonly $symbol: symbol;

	/**
	 * The name of this Context, if specified during creation.
	 */
	readonly name?: string;

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
export function createContext<T>(name?: string): Context<T> {
	return {
		$symbol: Symbol(),
		name,
	};
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


interface ContextAtomInternal<T> extends AtomInternal<T> {
	$dep?: Nil<Dependency>;
	$ancestor?: Nil<AtomInternal<T>>;
	$value?: T;
}

function getReadOnlyContext<T>(context: Context<T>) {
	const { $symbol } = context;
	let ptr: Nil<ContextContainer> = currentContainer;
	let atom;
	while (ptr && !(atom = ptr[$symbol] as AtomInternal<T> | undefined)) {
		ptr = ptr.$parent;
	}

	if (__DEV__ && isNewContainer && ptr === currentContainer) {
		throw new Error("Component declares the same Context multiple times.");
	}

	return atom;
}

function getMutableContext<T>(context: Context<T>, defaultValue?: T) {
	if (!isNewContainer || !currentContainer) {
		isNewContainer = true;
		currentContainer = {
			$parent: currentContainer,
		};
	}

	const lifecycle = getLifecycle() as LifecycleInternal;
	const localAtom: ContextAtomInternal<T> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		$tracksValue: true,
		$value: defaultValue,
		$get: getLocalValue,
		$set: setValue,
	};

	if (defaultValue === undefined) {
		const ancestorAtom = getReadOnlyContext(context);
		if (ancestorAtom) {
			localAtom.$get = getAncestorValue;
			localAtom.$ancestor = ancestorAtom;
			link(lifecycle, ancestorAtom, localAtom.$dep = {
				$fn: notify<T>,
				$a0: localAtom,
			});
		}
	}

	currentContainer[context.$symbol] = localAtom;
	return localAtom;
}

function getAncestorValue<T>(this: ContextAtomInternal<T>) {
	return this.$ancestor!.$get();
}

function getLocalValue<T>(this: ContextAtomInternal<T>) {
	return this.$value!;
}

function setValue<T>(this: ContextAtomInternal<T>, value: T) {
	let oldValue = this.$value;
	if (this.$ancestor) {
		oldValue = this.$ancestor.$get();
		unlink(this.$dep!);
		this.$dep = null;
		this.$ancestor = null;
		this.$get = getLocalValue;
	}

	this.$value = value;
	return oldValue !== value;
}

export interface ContextAccess {
	/**
	 * Gets a **read-only** Atom from the current Component's context.
	 * @see {@link createContext}
	 */
	<T>(context: Context<T>): Atom<T> | undefined;

	/**
	 * Creates a **mutable** Atom bound to the current Component's context. The current Component
	 * will automatically act as a provider for the given Context. Any descendants will be able to
	 * read the Atom and react to its updates.
	 * @see {@link createContext}
	 */
	readonly mutable: <T>(context: Context<T>, defaultValue?: T) => Atom<T>;
}

getReadOnlyContext.mutable = getMutableContext;

export const context: ContextAccess = getReadOnlyContext;
