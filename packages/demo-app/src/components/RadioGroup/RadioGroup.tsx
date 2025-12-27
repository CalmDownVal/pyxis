import { component, derivation, read, write, type MaybeAtom } from "@calmdown/pyxis";
import { Text } from "@calmdown/pyxis-dom";

import type { RadioItemProps } from "./RadioItem";

export interface RadioGroupProps<T extends string> {
	name?: string;
	value?: MaybeAtom<string>;
	children: RadioItemProps<T>[];
}

export const RadioGroup = component(<T extends string>(props: RadioGroupProps<T>) => props.children.map(option => (
	<label>
		<input
			type="radio"
			name={props.name ?? ""}
			value={option.value}
			checked={derivation(() => read(props.value) === option.value)}
			on:input={() => {
				write(props.value, option.value);
			}}
		/>
		<Text>{option.children}</Text>
	</label>
)));
