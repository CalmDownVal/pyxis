import { invoke } from "~/support/common";
import type { Nil } from "~/support/types";

import { getLifecycle, type Lifecycle } from "./Lifecycle";
import type { DependencyList } from "./Dependency";
import { createDelta, itemChanged, itemInserted, itemRemoved, listCleared, listSynced, type Equals, type ListDelta } from "./ListDelta";
import { reportAccess } from "./Reaction";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface List<T> extends DependencyList {
	readonly size: () => number;

	readonly get: (index: number) => T;
	readonly set: (index: number, item: T) => void;
	readonly clear: () => void;

	readonly insertAt: (index: number, item: T) => void;
	readonly insertFirst: (item: T) => void;
	readonly insertLast: (item: T) => void;

	readonly remove: (item: T) => boolean;
	readonly removeAt: (index: number) => T;
	readonly removeFirst: () => T;
	readonly removeLast: () => T;

	/** @internal */
	readonly $lifecycle: Lifecycle;

	/** @internal */
	$items: T[];

	/** @internal */
	$delta?: Nil<ListDelta<T>>;

	/** @internal */
	$notify?: UpdateCallback<[ self: List<T> ]>;
}

/**
 * Creates an empty List. This List emits deltas with each mutation which can be observed by
 * Components to efficiently update the rendered state.
 */
export function list<T>(source: null | undefined, lifecycle?: Lifecycle): List<T>;

/**
 * Creates a List initialized with items copied from the provided Iterable. This List emits deltas
 * with each mutation which can be observed by Components to efficiently update the rendered state.
 */
export function list<T>(source: Iterable<T>, lifecycle?: Lifecycle): List<T>;

export function list<T>(source: Nil<Iterable<T>>, lifecycle = getLifecycle()): List<T> {
	const items = source ? Array.from(source) : [];
	return {
		$lifecycle: lifecycle,
		$items: items,
		size,
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
	const oldState = list.$items;
	list.$items = source.slice();
	listSynced(list.$delta ??= createDelta(), oldState, source, eq);
	listMutated(list);
}

function size(this: List<any>) {
	reportAccess(this);
	return this.$items.length;
}

function get(this: List<any>, index: number) {
	assertIndex(this, index);
	reportAccess(this);
	return this.$items[index];
}

function set<T>(this: List<T>, index: number, item: T) {
	assertIndex(this, index);
	if (this.$items[index] === item) {
		return;
	}

	this.$items[index] = item;
	itemChanged(this.$delta ??= createDelta(), index, item);
	listMutated(this);
}

function clear(this: List<any>) {
	const count = this.$items.length;
	this.$items.length = 0;
	listCleared(this.$delta ??= createDelta(), count);
	listMutated(this);
}

function insertAt<T>(this: List<T>, index: number, item: T) {
	const { $items } = this;
	if (index === $items.length) {
		$items.push(item);
	}
	else {
		assertIndex(this, index);
		this.$items.splice(index, 0, item);
	}

	itemInserted(this.$delta ??= createDelta(), index, item);
	listMutated(this);
}

function insertFirst<T>(this: List<T>, item: T) {
	this.insertAt(0, item);
}

function insertLast<T>(this: List<T>, item: T) {
	this.insertAt(this.$items.length, item);
}

function remove<T>(this: List<any>, item: T) {
	const index = this.$items.indexOf(item);
	if (index === -1) {
		return false;
	}

	this.removeAt(index);
	return true;
}

function removeAt<T>(this: List<T>, index: number) {
	assertIndex(this, index);
	const removed = this.$items.splice(index, 1)[0];
	itemRemoved(this.$delta ??= createDelta(), index);
	listMutated(this);
	return removed;
}

function removeFirst<T>(this: List<T>) {
	return this.removeAt(0);
}

function removeLast<T>(this: List<T>) {
	return this.removeAt(this.$items.length - 1);
}

function assertIndex(list: List<any>, index: number) {
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

function listMutated(list: List<any>) {
	schedule(list.$lifecycle, list.$notify ??= {
		$fn: notify,
		$a0: list,
	});
}

function notify(list: List<any>) {
	let current = list.$dh;
	while (current) {
		invoke(current);
		current = current.$an;
	}

	list.$delta = null;
}
