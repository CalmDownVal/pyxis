import type { Nil } from "~/support/types";

import { atom, write, type Atom } from "./Atom";
import { getContext, type Context, type ContextInternal } from "./Context";
import type { DependencyList } from "./Dependency";
import { createDelta, itemChanged, itemInserted, itemRemoved, listCleared, listSynced, type Equals, type ListDelta } from "./ListDelta";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface List<T> {
	readonly size: number;
	readonly sizeAtom: Atom<number>;

	get(index: number): T;
	set(index: number, item: T): void;
	clear(): void;

	insertAt(index: number, item: T): void;
	insertFirst(item: T): void;
	insertLast(item: T): void;

	remove(item: T): boolean;
	removeAt(index: number): T;
	removeFirst(): T;
	removeLast(): T;
}

/** @internal */
export interface ListInternal<T> extends List<T>, DependencyList<[ delta: ListDelta<T> ]> {
	readonly $context: ContextInternal;
	$items: T[];
	$delta?: Nil<ListDelta<T>>;
	$notify?: UpdateCallback<[ self: ListInternal<T> ]>;
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

export function list<T>(source?: Iterable<T> | undefined, context = getContext()): ListInternal<T> {
	const items = source ? Array.from(source) : [];
	return {
		$context: context as ContextInternal,
		$items: items,
		size: items.length,
		sizeAtom: atom(items.length, context),
		get,
		set,
		clear,
		insertAt,
		insertFirst,
		insertLast,
		remove,
		removeAt,
		removeFirst,
		removeLast,
	};
}

/**
 * Synchronizes the provided List with the given data source. After this operation, the list will
 * contain an exact copy of the source.
 *
 * Note: This function is separated and not rather than being a List method since the underlying diff
 * algorithm (Myers) is a relatively large chunk of code which would otherwise always get included
 * into bundled builds. This way, tools like Terser can eliminate the extra code when unused.
 */
export function sync<T>(list: List<T>, source: readonly T[], eq: Equals<T> = defaultEquals) {
	const oldState = (list as ListInternal<T>).$items;
	(list as ListInternal<T>).$items = source.slice();
	listSynced((list as ListInternal<T>).$delta ??= createDelta(), oldState, source, eq);
	listMutated(list as ListInternal<T>);
}

function get(this: ListInternal<any>, index: number) {
	assertIndex(this, index);
	return this.$items[index];
}

function set<T>(this: ListInternal<T>, index: number, item: T) {
	assertIndex(this, index);
	if (this.$items[index] === item) {
		return;
	}

	this.$items[index] = item;
	itemChanged(this.$delta ??= createDelta(), index, item);
	listMutated(this);
}

function clear(this: ListInternal<any>) {
	const count = this.$items.length;
	this.$items.length = 0;
	listCleared(this.$delta ??= createDelta(), count);
	listMutated(this);
}

function insertAt<T>(this: ListInternal<T>, index: number, item: T) {
	const { $items: items } = this;
	if (index === items.length) {
		items.push(item);
	}
	else {
		assertIndex(this, index);
		this.$items.splice(index, 0, item);
	}

	itemInserted(this.$delta ??= createDelta(), index, item);
	listMutated(this);
}

function insertFirst<T>(this: ListInternal<T>, item: T) {
	this.insertAt(0, item);
}

function insertLast<T>(this: ListInternal<T>, item: T) {
	this.insertAt(this.$items.length, item);
}

function remove<T>(this: ListInternal<any>, item: T) {
	const index = this.$items.indexOf(item);
	if (index === -1) {
		return false;
	}

	this.removeAt(index);
	return true;
}

function removeAt<T>(this: ListInternal<T>, index: number) {
	assertIndex(this, index);
	const removed = this.$items.splice(index, 1)[0];
	itemRemoved(this.$delta ??= createDelta(), index);
	listMutated(this);
	return removed;
}

function removeFirst<T>(this: ListInternal<T>) {
	return this.removeAt(0);
}

function removeLast<T>(this: ListInternal<T>) {
	return this.removeAt(this.$items.length - 1);
}

function assertIndex(list: ListInternal<any>, index: number) {
	if (index >= list.$items.length || index < 0) {
		if (__DEV__) {
			throw new RangeError("list index out of bounds");
		}
		else {
			throw new RangeError();
		}
	}
}

function defaultEquals<T>(item0: T, item1: T) {
	return item0 === item1;
}

function listMutated(list: ListInternal<any>) {
	(list as any).size = list.$items.length;
	write(list.sizeAtom, list.$items.length);
	schedule(list.$context, list.$notify ??= {
		$fn: notify,
		$a0: list,
	});
}

function notify(list: ListInternal<any>) {
	const { $delta: delta } = list;
	list.$delta = null;

	let current = list.$dh;
	while (current) {
		current.$fn(delta!);
		current = current.$an;
	}
}
