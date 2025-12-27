import { component, write, type MaybeAtom } from "@calmdown/pyxis";

export interface TextInputProps {
	name?: string;
	masked?: boolean;
	value: MaybeAtom<string>;
}

export const TextInput = component((props: TextInputProps) => (
	<input
		type={props.masked ? "password" : "text"}
		name={props.name ?? ""}
		value={props.value}
		on:input={(e) => {
			write(props.value, (e.target as HTMLInputElement).value);
		}}
	/>
));
