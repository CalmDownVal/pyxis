import { Fragment, render, type Component } from "@calmdown/pyxis";

export { Fragment };


const EMPTY_ARRAY = [] as const;

export function jsx(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
	key?: any,
): any;

export function jsx<TProps extends {}, TReturn>(
	component: Component<TProps, TReturn>,
	props: TProps,
	key?: any,
): TReturn;

export function jsx(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	const { children } = props;
	props.children = children === undefined
		? EMPTY_ARRAY
		: Array.isArray(children)
			? children
			: [ children ];

	props.key ??= key;
	return render(componentOrTagName as any, props);
}


export function jsxs(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
	key?: any,
): any;

export function jsxs<TProps extends {}, TReturn>(
	component: Component<TProps, TReturn>,
	props: TProps,
	key?: any,
): TReturn;

export function jsxs(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	props.key ??= key;
	return render(componentOrTagName as any, props);
}
