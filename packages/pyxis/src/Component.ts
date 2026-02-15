import type { S_TAG_NAME } from "~/component/Native";
import { getCurrentContainer, setCurrentContainer } from "~/data/Context";
import type { Nil, PropsType } from "~/support/types";

import { mountJsx, S_COMPONENT, type HierarchyNodeInternal } from "./Renderer";

/**
 * Represents a Pyxis Component function responsible for setting up a view model and returning a
 * chunk of JSX to be rendered.
 */
export interface Component<TProps extends PropsType = {}> {
	(props: TProps): JsxResult;
}

export type PropsOf<T> = T extends Component<infer TProps> ? TProps : unknown;

/**
 * Represents a Template function returning a chunk of JSX to be rendered. Templates receive no
 * props and have no lifecycle. As such Templates cannot create any atoms, reactions etc.
 */
export interface Template {
	(): JsxChildren;
}

/**
 * Represents a DataTemplate function returning a chunk of JSX to be rendered with specific input
 * data. DataTemplates only receive the data, but no props and have no lifecycle. As such
 * DataTemplates cannot create any atoms, reactions etc.
 */
export interface DataTemplate<TData> {
	(data: TData): JsxChildren;
}

export function component<TPropsArg extends [ {} ]>(
	block: (...args: TPropsArg) => JsxResult,
): (...args: [ props: JsxProps<TPropsArg[0]> ]) => JsxResult;

export function component(
	block: (props: PropsType) => JsxResult,
): ComponentHandler {
	return (jsx, parent, before) => {
		const context = getCurrentContainer();
		mountJsx(block(jsx), parent, before);
		setCurrentContainer(context);
	};
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
export type JsxResult = Nil<{
	[propName: string]: unknown;
	readonly children: readonly unknown[];

	/** @internal */
	readonly [S_COMPONENT]: ComponentHandler;

	/** @internal */
	readonly [S_TAG_NAME]?: string;
}>;

/**
 * The type of JSX elements accepted as individual children by common components.
 */
export type JsxChildren = JsxResult | readonly JsxChildren[];

/**
 * Utility type adding the standard `children` prop to the given props type.
 */
export type WithChildren<T extends PropsType> = { children: JsxChildren } & T;

/** @internal */
export interface ComponentHandler {
	<TNode>(
		jsx: NonNullable<JsxResult>,
		parent: HierarchyNodeInternal<TNode>,
		before: TNode | null,
	): void;
}
