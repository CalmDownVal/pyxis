// The Myers diff algorithm is adapted from the implementation by Logan R. Kearsley, MIT license.
// https://github.com/gliese1337/fast-myers-diff
//
//
// Copyright 2021 Logan R. Kearsley
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/** @internal */
export const K_CHANGE = 1;

/** @internal */
export const K_INSERT = 2;

/** @internal */
export const K_REMOVE = 3;

/** @internal */
export const K_CLEAR = 4;

/** @internal */
export interface ListDelta<T> {
	readonly $changes: ChangeType<T>[];
	$lengthDelta: number;
}

type ChangeType<T> = ItemChangedListDelta<T> | ItemInsertedListDelta<T> | ItemRemovedListDelta | ClearedListDelta;

interface ItemChangedListDelta<T> {
	$kind: typeof K_CHANGE;
	$index: number;
	$item: T;
}

interface ItemInsertedListDelta<T> {
	$kind: typeof K_INSERT;
	$index: number;
	$item: T;
}

interface ItemRemovedListDelta {
	$kind: typeof K_REMOVE;
	$index: number;
}

interface ClearedListDelta {
	$kind: typeof K_CLEAR;
	$index: number;
}

export interface Equals<T> {
	(item0: T, item1: T): boolean;
}

interface DiffState<T> {
	readonly $eq: Equals<T>;
	readonly $list0: readonly T[];
	readonly $list1: readonly T[];
	$index0: number;
	$index1: number;
	$N: number;
	$M: number;
	$Z: number;
	$c: number;
	readonly $buffer: Uint8Array | Uint16Array | Uint32Array;
	readonly $stack: number[];
	$stackTop: number;
	$pxs: number;
	$pxe: number;
	$pys: number;
	$pye: number;
	$oxs: number;
	$oxe: number;
	$oys: number;
	$oye: number;
}

/** @internal */
export function createDelta<T>(): ListDelta<T> {
	return {
		$changes: [],
		$lengthDelta: 0,
	};
}

/** @internal */
export function itemChanged<T>({ $changes }: ListDelta<T>, at: number, item: T) {
	const ci = binarySearch($changes, at);
	if (ci < 0) {
		// nothing at this index, add new delta
		$changes.splice(~ci, 0, {
			$kind: K_CHANGE,
			$index: at,
			$item: item,
		});
	}
	else {
		// delta(s) exist at this index already, there can only be:
		// - change -> change item
		// - insert -> change item
		// - remove -> append change
		const current = $changes[ci];
		switch (current.$kind) {
			case K_CHANGE:
			case K_INSERT:
				current.$item = item;
				break;

			case K_REMOVE:
				$changes.splice(ci + 1, 0, {
					$kind: K_CHANGE,
					$index: at,
					$item: item,
				});

				break;
		}
	}
}

/** @internal */
export function itemInserted<T>(delta: ListDelta<T>, at: number, item: T) {
	const { $changes } = delta;

	let ci = binarySearch($changes, at);
	if (ci < 0) {
		// nothing at this index, add new delta
		ci = ~ci;
		$changes.splice(ci, 0, {
			$kind: K_INSERT,
			$index: at,
			$item: item,
		});
	}
	else {
		// delta(s) exist at this index already, there can only be:
		// - change -> prepend with insert
		// - insert -> append another
		// - remove -> replace with change
		const current = $changes[ci];
		switch (current.$kind) {
			case K_CHANGE:
				$changes.splice(ci, 0, {
					$kind: K_INSERT,
					$index: at,
					$item: item,
				});

				break;

			case K_INSERT:
				$changes.splice(ci + 1, 0, {
					$kind: K_INSERT,
					$index: at,
					$item: item,
				});

				break;

			case K_REMOVE:
				(current as any).$kind = K_CHANGE;
				(current as any).$item = item;
				break;
		}
	}

	// shift the indices of later changes
	const { length } = $changes;
	while (++ci < length) {
		$changes[ci].$index += 1;
	}

	// update the overall change in list length
	delta.$lengthDelta += 1;
}

/** @internal */
export function itemRemoved<T>(delta: ListDelta<T>, at: number) {
	const { $changes } = delta;

	let ci = binarySearch($changes, at);
	if (ci < 0) {
		// nothing at this index, add new delta
		ci = ~ci;
		$changes.splice(ci, 0, {
			$kind: K_REMOVE,
			$index: at,
		});
	}
	else {
		// delta(s) exist at this index already, there can only be:
		// - change -> replace with removal
		// - insert -> remove it
		// - remove -> append another
		const current = $changes[ci];
		switch (current.$kind) {
			case K_CHANGE:
				(current as any).$kind = K_REMOVE;
				(current as any).$item = undefined;
				break;

			case K_INSERT:
				$changes.splice(ci, 1);
				break;

			case K_REMOVE:
				$changes.splice(++ci, 0, {
					$kind: K_REMOVE,
					$index: at,
				});

				break;
		}
	}

	// shift the indices of later changes
	const { length } = $changes;
	while (++ci < length) {
		$changes[ci].$index -= 1;
	}

	// update the overall change in list length
	delta.$lengthDelta -= 1;
}

/** @internal */
export function listCleared<T>(delta: ListDelta<T>, count: number) {
	const { $changes } = delta;
	$changes.length = 0;
	$changes.push({
		$kind: K_CLEAR,
		$index: -1,
	});

	delta.$lengthDelta -= count;
}

/** @internal */
export function listSynced<T>(delta: ListDelta<T>, oldState: readonly T[], newState: readonly T[], eq: Equals<T>) {
	let index = 0;
	let N = oldState.length;
	let M = newState.length;

	// eliminate common prefix
	while (index < N && index < M && eq(oldState[index], newState[index])) {
		index += 1;
	}

	// check for list equality
	if (index === N && index === M) {
		return;
	}

	// eliminate common suffix
	do {
		N -= 1;
		M -= 1;
	}
	while (N > index && M > index && eq(oldState[N], newState[M]));

	// run Myers diff on the smallest possible sub-lists
	const Z = (Math.min(N, M) + 1) * 2;
	const L = N + M;
	const state: DiffState<T> = {
		$eq: eq,
		$list0: oldState,
		$list1: newState,
		$index0: index,
		$index1: index,
		$N: N,
		$M: M,
		$Z: Z,
		$c: 0,
		$buffer: new (L <= 0xff ? Uint8Array : L <= 0xffff ? Uint16Array : Uint32Array)(Z + Z),
		$stack: [],
		$stackTop: 0,
		$pxs: -1,
		$pxe: -1,
		$pys: -1,
		$pye: -1,
		$oxs: -1,
		$oxe: -1,
		$oys: -1,
		$oye: -1,
	};

	let offset = 0;
	let rs, re, is, ie, r, i;
	do {
		myersDiff(state);
		if (state.$c === 1) {
			rs = state.$oxs;
			re = state.$oxe;
			is = state.$oys;
			ie = state.$oye;
		}
		else if (state.$pxs >= 0) {
			rs = state.$pxs;
			re = state.$pxe;
			is = state.$pys;
			ie = state.$pye;
		}
		else {
			break;
		}

		for (r = rs; r < re; r += 1) {
			itemRemoved(delta, rs + offset);
		}

		for (i = is; i < ie; i += 1) {
			itemInserted(delta, rs + offset, newState[i]);
			offset += 1;
		}

		offset -= re - rs;
	}
	while (state.$c < 2);
}

function binarySearch<T>(changes: readonly ChangeType<T>[], index: number) {
	let min = 0;
	let max = changes.length;
	let mid;
	let tmp;

	while (min < max) {
		mid = (min + max) >>> 1;
		tmp = changes[mid].$index;

		if (index < tmp) {
			max = mid;
		}
		else if (index > tmp) {
			min = mid + 1;
		}
		else {
			// found matching index, but there may be more deltas with the same index
			// find the last one
			while (++mid < max && changes[mid].$index === index) ;
			return mid - 1;
		}
	}

	return ~min;
}

function myersDiff<T>(state: DiffState<T>) {
	const { $list0, $list1, $buffer, $stack, $eq } = state;
	let { $index0, $index1, $N, $M, $Z, $c, $stackTop } = state;
	let W, L, parity, offsetX, offsetY, z, h, hMax, k, kMin, kMax, gkm, gkp, u, v, x, y, pkm, pkp, sx;

	while (true) {
		switch ($c) {
			case 0: {
				Z_block: while ($N > 0 && $M > 0) {
					W = $N - $M;
					L = $N + $M;
					parity = L & 1;
					offsetX = $index0 + $N - 1;
					offsetY = $index1 + $M - 1;
					hMax = (L + parity) / 2;

					$buffer.fill(0, 0, $Z + $Z);
					h_loop: for (h = 0; h <= hMax; h += 1) {
						kMin = 2 * Math.max(0, h - $M) - h;
						kMax = h - 2 * Math.max(0, h - $N);

						// forward pass
						for (k = kMin; k <= kMax; k += 2) {
							gkm = $buffer[k - 1 - $Z * Math.floor((k - 1)/$Z)];
							gkp = $buffer[k + 1 - $Z * Math.floor((k + 1)/$Z)];
							u = (k === -h || (k !== h && gkm < gkp)) ? gkp : gkm + 1;
							v = u - k;
							x = u;
							y = v;
							while (x < $N && y < $M && $eq($list0[$index0 + x], $list1[$index1 + y])) {
								x += 1;
								y += 1;
							}

							$buffer[k - $Z * Math.floor(k / $Z)] = x;
							if (parity === 1 && (z = W - k) >= 1 - h && z < h && x + $buffer[$Z + z - $Z * Math.floor(z / $Z)] >= $N) {
								if (h > 1 || x !== u) {
									$stack[$stackTop++] = $index0 + x;
									$stack[$stackTop++] = $index1 + y;
									$stack[$stackTop++] = $N - x;
									$stack[$stackTop++] = $M - y;
									$N = u;
									$M = v;
									$Z = 2 * (Math.min($N, $M) + 1);
									continue Z_block;
								}
								else {
									break h_loop;
								}
							}
						}

						// reverse pass
						for (k = kMin; k <= kMax; k += 2) {
							pkm = $buffer[$Z + k - 1 - $Z * Math.floor((k - 1)/$Z)];
							pkp = $buffer[$Z + k + 1 - $Z * Math.floor((k + 1)/$Z)];
							u = (k === -h || (k !== h && pkm < pkp)) ? pkp : pkm + 1;
							v = u - k;
							x = u;
							y = v;
							while (x < $N && y < $M && $eq($list0[offsetX - x], $list1[offsetY - y])) {
								x += 1;
								y += 1;
							}

							$buffer[$Z + k - $Z * Math.floor(k/$Z)] = x;
							if (parity === 0 && (z = W - k) >= -h && z <= h && x + $buffer[z - $Z * Math.floor(z/$Z)] >= $N) {
								if (h > 0 || x !== u) {
									$stack[$stackTop++] = $index0 + $N - u;
									$stack[$stackTop++] = $index1 + $M - v;
									$stack[$stackTop++] = u;
									$stack[$stackTop++] = v;
									$N = $N - x;
									$M = $M - y;
									$Z = 2 * (Math.min($N, $M) + 1);
									continue Z_block;
								}
								else {
									break h_loop;
								}
							}
						}
					}

					if ($N === $M) {
						continue;
					}

					if ($M > $N) {
						$index0 += $N;
						$index1 += $N;
						$M -= $N;
						$N = 0;
					}
					else {
						$index0 += $M;
						$index1 += $M;
						$N -= $M;
						$M = 0;
					}

					// we already know either N or M is zero, so we can skip the extra check at the top of the loop
					break;
				}

				// yield delete_start, delete_end, insert_start, insert_end
				// at this point, at least one of N & M is zero, or we wouldn't have gotten out of the preceding loop yet
				if ($N + $M !== 0) {
					if (state.$pxe === $index0 || state.$pye === $index1) {
						// it is a contiguous difference, extend the existing one
						state.$pxe = $index0 + $N;
						state.$pye = $index1 + $M;
					} else {
						sx = state.$pxs;
						state.$oxs = state.$pxs;
						state.$oxe = state.$pxe;
						state.$oys = state.$pys;
						state.$oye = state.$pye;

						// defer this one until we can check the next one
						state.$pxs = $index0;
						state.$pxe = $index0 + $N;
						state.$pys = $index1;
						state.$pye = $index1 + $M;

						if (sx >= 0) {
							state.$index0 = $index0;
							state.$index1 = $index1;
							state.$N = $N;
							state.$M = $M;
							state.$Z = $Z;
							state.$stackTop = $stackTop;
							state.$c = 1;
							return;
						}
					}
				}
			}

			case 1: {
				if ($stackTop === 0) {
					state.$c = 2;
					return;
				}

				$M = $stack[--$stackTop];
				$N = $stack[--$stackTop];
				$index1 = $stack[--$stackTop];
				$index0 = $stack[--$stackTop];
				$Z = 2 * (Math.min($N, $M) + 1);
				$c = 0;
			}
		}
	}
}
