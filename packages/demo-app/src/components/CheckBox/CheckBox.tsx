import { component, write, type MaybeAtom } from "@calmdown/pyxis";
import { Text, type TextProps } from "@calmdown/pyxis-dom";

export interface CheckBoxProps {
	name?: string;
	checked: MaybeAtom<boolean>;
	children?: TextProps["children"];
}

export const CheckBox = component((props: CheckBoxProps) => (
	<label>
		<input
			type="checkbox"
			name={props.name ?? ""}
			checked={props.checked}
			on:input={(e) => {
				write(props.checked, (e.currentTarget as HTMLInputElement).checked === true);
			}}
		/>
		<Text>{props.children}</Text>
	</label>
));
