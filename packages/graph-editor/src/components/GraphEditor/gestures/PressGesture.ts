import { slot, trigger, type Slot } from "@calmdown/pyxis";

import type { Gesture, Pointer } from "~/components/EditorView";
import { distance } from "~/support/math";

export interface PressGestureOptions {
	/**
	 * How long in milliseconds to wait before a long press is recognized.
	 *
	 * Defaults to 800.
	 */
	longPressDelay?: number;

	/**
	 * The maximum distance in logical pixels a pointer is allowed to move to
	 * still be recognized as a press.
	 *
	 * Defaults to 10.
	 */
	maxPressDistance?: number;

	/**
	 * The maximum time in milliseconds between pointer events to be recognized
	 * as multi-press.
	 *
	 * Defaults to 400.
	 */
	multiPressDelay?: number;
}

export interface PressGesture extends Gesture, Required<Readonly<PressGestureOptions>> {
	readonly press: Slot;
	readonly longPress: Slot;
	readonly multiPress: Slot;
}

export function createPressGesture(options?: PressGestureOptions): Gesture {
	const gesture: PressGestureInternal = {
		press: slot(),
		longPress: slot(),
		multiPress: slot(),
		longPressDelay: options?.longPressDelay ?? 800,
		maxPressDistance: options?.maxPressDistance ?? 10,
		multiPressDelay: options?.multiPressDelay ?? 400,
		multiPressTime: 0,
		multiPressCount: 0,
		state: S_IDLE,
		start,
		move,
		stop,
	};

	return gesture;
}

const S_IDLE = 0;
const S_PENDING = 1;
const S_MOVED_TOO_FAR = 2;
const S_LONG_PRESS = 3;
const S_COMPLEX_GESTURE = 4;

type PressGestureState =
	| typeof S_IDLE
	| typeof S_PENDING
	| typeof S_MOVED_TOO_FAR
	| typeof S_LONG_PRESS
	| typeof S_COMPLEX_GESTURE;

interface PressGestureInternal extends PressGesture {
	multiPressTime: number;
	multiPressCount: number;
	state: PressGestureState;
	primary?: Pointer;
	longPressHandle?: ReturnType<typeof setTimeout>;
}

function start(this: PressGestureInternal, current: Pointer) {
	if (this.primary) {
		setState(this, S_COMPLEX_GESTURE);
		return false;
	}

	this.primary = current;
	this.state = S_PENDING;
	this.longPressHandle = setTimeout(
		() => {
			this.longPressHandle = undefined;
			setState(this, S_LONG_PRESS);
			trigger(this.longPress);
		},
		this.longPressDelay,
	);

	checkMultiPress(this, false);
	return true;
}

function move(this: PressGestureInternal, current: Pointer) {
	if (this.primary !== current) {
		return;
	}

	const dist = distance(current.start, current);
	if (dist > this.maxPressDistance) {
		setState(this, S_MOVED_TOO_FAR);
	}
}

function stop(this: PressGestureInternal, current: Pointer) {
	if (this.primary !== current) {
		return;
	}

	if (this.state === S_PENDING) {
		trigger(this.press);
		checkMultiPress(this, true);
	}

	setState(this, S_IDLE);
}

function setState(gesture: PressGestureInternal, state: PressGestureState) {
	if (gesture.longPressHandle !== undefined) {
		clearTimeout(gesture.longPressHandle);
		gesture.longPressHandle = undefined;
	}

	gesture.state = state;
}

function checkMultiPress(gesture: PressGestureInternal, isUp: boolean) {
	const now = performance.now();
	if (now - gesture.multiPressTime > gesture.multiPressDelay) {
		gesture.multiPressCount = 0;
	}
	else if (isUp && ++gesture.multiPressCount >= 2) {
		trigger(gesture.multiPress);
	}

	gesture.multiPressTime = now;
}
