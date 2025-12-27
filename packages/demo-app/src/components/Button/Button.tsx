import { component } from "@calmdown/pyxis";

export interface ButtonProps {
	readonly type?: "button" | "submit" | "reset";
	readonly children?: JSX.Child[];
	readonly onclick: () => void;
}

export const Button = component((props: ButtonProps) => (
	<button
		type={props.type ?? "button"}
		children={props.children}
		on:click={props.onclick}
	/>
));
