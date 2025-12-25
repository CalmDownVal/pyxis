export interface Component<TProps extends AnyProps = {}> {
	(props: TProps): any;
}

export type AnyProps = { [_ in string]?: any };

export function component<TPropsArg extends [ {} ], TReturn>(
	body: (...args: TPropsArg) => TReturn,
): (...args: [ props: JsxProps<TPropsArg[0]> ]) => TReturn {
	return body as any;
}

export type JsxProps<T> = { [K in keyof T]: K extends "children" ? JsxChildren<T[K]> : T[K] };

/**
 * When typing children as a single value tuple, it becomes unusable in 'react-jsx' mode. TS rejects
 * valid uses of such components with the error:
 *
 * \> This JSX tag's children prop expects type '[T]' which requires multiple children, but only a
 * \> single child was provided.
 *
 * Likely related to the fact that single children are passed to jsx() factory without wrapping
 * arrays.
 *
 * This utility type unwraps single value tuples, avoiding this problem.
 */
export type JsxChildren<T> = T extends readonly [ any, any, ...any[] ]
	// component requires 2+ children, safe to pass the type as-is
	? T
	: T extends readonly [ infer SC ]
		// component requires a single child, unwrap the tuple
		? SC
		: T extends readonly (infer C)[]
			// component requires any number of children, pass as-is, but also append the unwrapped
			// type to allow single child use
			? T | C
			// children typed as a non-array type, pass as-is
			: T;
