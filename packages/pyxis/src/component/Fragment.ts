import { component } from "~/Component";
import type { Nil } from "~/support/types";
import "~/jsx";

// FUTURE: currently TypeScript has a bug causing it to skip checking fragment props in "react-jsx" mode
//         allowing users to supply fragment with invalid children
//         https://github.com/microsoft/TypeScript/issues/62358?referrer=grok.com

export interface FragmentProps {
	children?: Nil<JSX.Child>[];
}

export const Fragment = component((props: FragmentProps) => props.children);
