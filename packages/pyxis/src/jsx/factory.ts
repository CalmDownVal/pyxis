import { Native, S_TAG_NAME } from "~/component/Native";
import { EMPTY_ARRAY } from "~/support/common";
import type { Component, JsxResult } from "~/Component";
import { S_COMPONENT } from "~/Renderer";

export function jsx(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
	key?: any,
): JsxResult;

export function jsx<TProps extends {}>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): JsxResult;

export function jsx(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	const { children } = props;

	// the `jsx` variant is called without wrapping arrays around children,
	// however it is also used for children provided from a variable which may
	// itself be an array, so we have to check anyway
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
	props: { readonly [_ in string]?: unknown },
	key?: any,
): JsxResult;

export function jsxs<TProps extends {}>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): JsxResult;

export function jsxs(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	// the `jsxs` variant is called with a wrapping array around children, so
	// we don't actually have to check it.

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
