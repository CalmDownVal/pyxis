import { component, write } from "@calmdown/pyxis";

type ExtendedInputProps = JSX.IntrinsicElements["input"];

export interface TextInputProps extends Omit<ExtendedInputProps, "type"> {
	masked?: boolean;
}

export const TextInput = component((props: TextInputProps) => (
	<input
		type={props.masked ? "password" : "text"}
		name={props.name ?? ""}
		value={props.value}
		on:input={e => write(props.value, e.currentTarget.value)}
	/>
));
