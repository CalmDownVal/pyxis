import { component } from "@calmdown/pyxis";
import type { TextProps } from "@calmdown/pyxis-dom";

export interface RadioItemProps<T extends string> {
	value?: T;
	children?: TextProps["children"];
}

export const RadioItem = component(<T extends string>(props: RadioItemProps<T>) => props);
