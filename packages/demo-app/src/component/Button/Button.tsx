import { component } from "@calmdown/pyxis";

type ExtendedButtonProps = JSX.IntrinsicElements["button"];

export const Button = component((props: ExtendedButtonProps) => (
	<button
		{...props}
		type={props.type ?? "button"}
	/>
));
