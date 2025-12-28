import type { Nil } from "~/support/types";

import { atom, write, type Atom } from "./Atom";
import { getContext, type Context } from "./Context";
import type { DependencyList } from "./Dependency";
import { createDelta, itemChanged, itemInserted, itemRemoved, listCleared, listSynced, type Equals, type ListDelta } from "./ListDelta";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface List<T> extends DependencyList<[ delta: ListDelta<T> ]> {
	/** @internal */
	readonly context: Context;

	/**
	 * @internal
	 * @readonly
	 */
	items: T[];

	/** @internal */
	delta?: Nil<ListDelta<T>>;

	/** @internal */
	notify?: UpdateCallback<[ self: List<T> ]>;

	readonly size: number;
	readonly sizeAtom: Atom<number>;

	get(index: number): T;
	set(index: number, item: T): void;
	clear(): void;
	sync(source: readonly T[], eq?: Equals<T>): void;

	insertAt(index: number, item: T): void;
	insertFirst(item: T): void;
	insertLast(item: T): void;

	remove(item: T): boolean;
	removeAt(index: number): T;
	removeFirst(): T;
	removeLast(): T;
}

/**
 * Creates an empty List. This List emits deltas with each mutation which can be observed by
 * Components to efficiently update the rendered state.
 */
export function list<T>(): List<T>;

/**
 * Creates a List initialized with items copied from the provided Iterable. This List emits deltas
 * with each mutation which can be observed by Components to efficiently update the rendered state.
 */
export function list<T>(source?: Iterable<T>): List<T>;

/** @internal */
export function list<T>(source: Iterable<T> | undefined, context: Context): List<T>;

export function list<T>(source?: Iterable<T> | undefined, context = getContext()): List<T> {
	const items = source ? Array.from(source) : [];
	return {
		context,
		items,
		size: items.length,
		sizeAtom: atom(items.length, context),
		get,
		set,
		clear,
		sync,
		insertAt,
		insertFirst,
		insertLast,
		remove,
		removeAt,
		removeFirst,
		removeLast,
	};
}

function get(this: List<any>, index: number) {
	assertIndex(this, index);
	return this.items[index];
}

function set<T>(this: List<T>, index: number, item: T) {
	assertIndex(this, index);
	if (this.items[index] === item) {
		return;
	}

	this.items[index] = item;
	itemChanged(this.delta ??= createDelta(), index, item);
	listMutated(this);
}

function clear(this: List<any>) {
	const count = this.items.length;
	this.items.length = 0;
	listCleared(this.delta ??= createDelta(), count);
	listMutated(this);
}

function sync<T>(this: List<T>, source: readonly T[], eq: Equals<T> = defaultEquals) {
	const oldState = this.items;
	this.items = source.slice();
	listSynced(this.delta ??= createDelta(), oldState, source, eq);
	listMutated(this);
}

function insertAt<T>(this: List<T>, index: number, item: T) {
	const { items } = this;
	if (index === items.length) {
		items.push(item);
	}
	else {
		assertIndex(this, index);
		this.items.splice(index, 0, item);
	}

	itemInserted(this.delta ??= createDelta(), index, item);
	listMutated(this);
}

function insertFirst<T>(this: List<T>, item: T) {
	this.insertAt(0, item);
}

function insertLast<T>(this: List<T>, item: T) {
	this.insertAt(this.items.length, item);
}

function remove<T>(this: List<any>, item: T) {
	const index = this.items.indexOf(item);
	if (index === -1) {
		return false;
	}

	this.removeAt(index);
	return true;
}

function removeAt<T>(this: List<T>, index: number) {
	assertIndex(this, index);
	const removed = this.items.splice(index, 1)[0];
	itemRemoved(this.delta ??= createDelta(), index);
	listMutated(this);
	return removed;
}

function removeFirst<T>(this: List<T>) {
	return this.removeAt(0);
}

function removeLast<T>(this: List<T>) {
	return this.removeAt(this.items.length - 1);
}

function assertIndex(list: List<any>, index: number) {
	if (index >= list.items.length || index < 0) {
		throw new RangeError("index out of bounds");
	}
}

function defaultEquals<T>(item0: T, item1: T) {
	return item0 === item1;
}

function listMutated(list: List<any>) {
	(list as any).size = list.items.length;
	write(list.sizeAtom, list.items.length);
	schedule(list.context, list.notify ??= {
		fn: notify,
		a0: list,
	});
}

function notify(list: List<any>) {
	const { delta } = list;
	list.delta = null;

	let current = list.dh;
	while (current) {
		current.fn(delta!);
		current = current.an;
	}
}
