import { component, type JsxChildren, type MaybeAtom } from "@calmdown/pyxis";

export interface ButtonProps {
	type?: "button" | "submit" | "reset";
	children?: JsxChildren;
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
