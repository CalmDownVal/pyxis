import { EMPTY_ARRAY, Fragment, render, type Component } from "@calmdown/pyxis";

export { Fragment };


export function jsx(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
	key?: any,
): any;

export function jsx<TProps extends {}>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): any;

export function jsx(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	const { children } = props;
	props.children = children === undefined ? EMPTY_ARRAY : [ children ];
	props.key ??= key;

	return render(componentOrTagName as string, props);
}


export function jsxs(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
	key?: any,
): any;

export function jsxs<TProps extends {}>(
	component: Component<TProps>,
	props: TProps,
	key?: any,
): any;

export function jsxs(
	componentOrTagName: Component<any> | string,
	props: any,
	key?: any,
) {
	props.key ??= key;
	return render(componentOrTagName as string, props);
}
