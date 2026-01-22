import { atom, component, context, createContext, Show, type Context, type JsxChildren } from "@calmdown/pyxis";
import { Text } from "@calmdown/pyxis-dom";

import { TextInput } from "./components/TextInput";
import { CheckBox } from "./components/CheckBox";

const c1 = createContext<string>("C1");
const c2 = createContext<string>("C2");


interface DisplayProps {
	context: Context<string>;
}

const Display = component((props: DisplayProps) => {
	const value = context(props.context);
	return (
		<Text>{props.context.name}: {value}</Text>
	);
});


interface ProviderProps {
	context: Context<string>;
	children?: JsxChildren;
}

const Provider = component((props: ProviderProps) => {
	const value = context.mutable(props.context, "???");
	return (
		<>
			<Text>{props.context.name}:</Text>
			<TextInput value={value} />
			{props.children}
		</>
	);
});


interface ToggleProps {
	children?: JsxChildren;
}

const Toggle = component((props: ToggleProps) => {
	const shown = atom(true);
	return (
		<>
			<CheckBox checked={shown} />
			<Show when={shown}>
				{() => props.children}
			</Show>
		</>
	);
});


export const ContextTest = component(() => (
	<Provider context={c1}>
		<Provider context={c2}>
			<div css:paddingLeft="2rem">
				<Display context={c1} />
				<Display context={c2} />
				<div css:paddingLeft="2rem">
					<Provider context={c1}>
						<Toggle>
							<Display context={c1} />
							<Display context={c2} />
						</Toggle>
					</Provider>
				</div>
				<div css:paddingLeft="2rem">
					<Provider context={c2}>
						<Toggle>
							<Display context={c1} />
							<Display context={c2} />
						</Toggle>
					</Provider>
				</div>
			</div>
		</Provider>
	</Provider>
));
