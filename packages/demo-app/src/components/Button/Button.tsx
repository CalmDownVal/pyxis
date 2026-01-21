import { component, type JsxResult, type MaybeAtom } from "@calmdown/pyxis";

export interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children?: JsxResult[];
	disabled?: MaybeAtom<boolean>;
	onclick: () => void;
}

export const Button = component((props: ButtonProps) => (
	<button
		type={props.type ?? "button"}
		disabled={props.disabled}
		children={props.children}
		on:click={props.onclick}
	/>
));
