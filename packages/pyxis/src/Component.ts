import { mountJsx, S_COMPONENT, type MountingGroup } from "./Renderer";
import type { S_TAG_NAME } from "~/component/Native";
import type { Nil, PropsType } from "~/support/types";

export interface Component<TProps extends PropsType = {}> {
	(props: TProps): JsxResult;
}

export type PropsOf<T> = T extends Component<infer TProps> ? TProps : unknown;

export interface Template {
	(): JsxChildrenProp<Nil<JsxResult>>;
}

export interface DataTemplate<TData> {
	(data: TData): JsxChildrenProp<Nil<JsxResult>>;
}

export function component<TPropsArg extends [ {} ]>(
	block: (...args: TPropsArg) => JsxResult,
): (...args: [ props: JsxProps<TPropsArg[0]> ]) => JsxResult;

export function component(
	block: (props: PropsType) => JsxResult,
): ComponentHandler {
	return (group, jsx, parent, before, level) => {
		mountJsx(group, block(jsx), parent, before, level);
	};
}

export function isType(jsx: JsxResult, component: Component<any>) {
	return jsx[S_COMPONENT] === component;
}

/**
 * Infers the props object for use with JSX. Because Pyxis always supplies components with child
 * arrays (or tuples), the type needs to be adjusted to reflect the internal mechanics.
 */
export type JsxProps<T> =
	& { readonly [K in keyof T]: K extends "children" ? JsxChildrenProp<T[K]> : T[K] }
	& ("children" extends keyof T ? {} : { readonly children?: [] });

/**
 * When typing children as a single value tuple, it becomes unusable in 'react-jsx' mode. TS rejects
 * valid uses of such components with the error: "This JSX tag's children prop expects type '[T]'
 * which requires multiple children, but only a single child was provided."
 *
 * Likely related to the fact that single children are passed to jsx() factory without wrapping
 * arrays.
 *
 * This utility type unwraps single value tuples, avoiding the problem.
 */
export type JsxChildrenProp<T> = T extends readonly [ any, any, ...any[] ]
	// component requires 2+ children, safe to pass the type as-is, just attach the readonly modifier
	? T extends readonly [ ...infer C ]
		? readonly [ ...C ]
		: T
	: T extends readonly [ infer SC ]
		// component requires a single child, unwrap the tuple
		? SC
		: T extends readonly (infer C)[]
			// component requires any number of children, pass as-is, but also append the unwrapped
			// type to allow single child use
			? readonly C[] | C
			// children typed as a non-array type, pass as-is
			: T;

/**
 * Describes the objects returned by JSX factories.
 *
 * Pyxis uses very lightweight factories returning the props object directly,
 * adding a few extra props:
 *
 * - S_COMPONENT ... hidden, contains a reference to the ComponentHandler function
 * - S_TAG_NAME ... hidden, specifies the tag name, only populated for native elements
 * - children ... always present and always an array, empty array for childless components
 */
export interface JsxResult {
	[propName: string]: unknown;
	readonly children: readonly unknown[];

	/** @internal */
	readonly [S_COMPONENT]: ComponentHandler;

	/** @internal */
	readonly [S_TAG_NAME]?: string;
}

/** @internal */
export interface ComponentHandler {
	<TNode>(
		group: MountingGroup,
		jsx: JsxResult,
		parent: TNode,
		before: TNode | null,
		level: number,
	): void;
}
