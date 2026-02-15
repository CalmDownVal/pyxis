import { component, write } from "@calmdown/pyxis";
import { Text, type TextProps } from "@calmdown/pyxis-dom";

type ExtendedInputProps = JSX.IntrinsicElements["input"];

export interface CheckBoxProps extends Omit<ExtendedInputProps, "children" | "on:input" | "type" | "value"> {
	children?: TextProps["children"];
}

export const CheckBox = component((props: CheckBoxProps) => (
	<label>
		<input
			type="checkbox"
			name={props.name ?? ""}
			checked={props.checked}
			on:input={(e) => {
				write(props.checked, e.currentTarget.checked === true);
			}}
		/>
		<Text>{props.children}</Text>
	</label>
));
