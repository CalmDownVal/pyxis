import { Native, S_TAG_NAME } from "~/component/Native";
import type { PropsType } from "~/support/types";
import type { Component, JsxResult } from "~/Component";
import { S_COMPONENT } from "~/Renderer";

const EMPTY_ARRAY = Object.freeze([] as const);

export function jsx(
	tagName: string,
	props: PropsType,
	key?: any,
): JsxResult;

export function jsx<TProps extends PropsType>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): JsxResult;

export function jsx(
	componentOrTagName: Component<PropsType> | string,
	props: any,
	key?: any,
) {
	const { children } = props;

	// the `jsx` (dynamic) variant is called without wrapping arrays around
	// children, however it is also used for children provided from a variable
	// which may itself be an array, so we have to check
	props.children = children === undefined
		? EMPTY_ARRAY
		: Array.isArray(children)
			? children
			: [ children ];

	// put back the `key` prop
	props.key ??= key;

	// attach component info
	if (typeof componentOrTagName === "string") {
		props[S_COMPONENT] = Native;
		props[S_TAG_NAME] = componentOrTagName;
	}
	else {
		props[S_COMPONENT] = componentOrTagName;
	}

	return props;
}


export function jsxs(
	tagName: string,
	props: PropsType,
	key?: any,
): JsxResult;

export function jsxs<TProps extends PropsType>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): JsxResult;

export function jsxs(
	componentOrTagName: Component<PropsType> | string,
	props: any,
	key?: any,
) {
	// the `jsxs` (static) variant is called with a wrapping array around
	// children, so we don't have to check it.

	// put back the `key` prop
	props.key ??= key;

	// attach component info
	if (typeof componentOrTagName === "string") {
		props[S_COMPONENT] = Native;
		props[S_TAG_NAME] = componentOrTagName;
	}
	else {
		props[S_COMPONENT] = componentOrTagName;
	}

	return props;
}
