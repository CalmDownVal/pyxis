import { atom, createRenderer, derivation, read, Show, update } from "@calmdown/pyxis";
import { BemBlockExtension, BemElementExtension, BemModifierExtension, ClassListExtension, DomAdapter, EventExtension, Text, type EventExtensionType, type ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

import { Button } from "~/components/Button";
import { CheckBox } from "~/components/CheckBox";
import { TextInput } from "~/components/TextInput";
import { RadioGroup, RadioItem } from "~/components/RadioGroup";

const extensions = {
	on: EventExtension,
	cl: ClassListExtension,
	blk: BemBlockExtension,
	elm: BemElementExtension,
	mod: BemModifierExtension,
};

const renderer = createRenderer({
	adapter: DomAdapter,
	tick: queueMicrotask,
	extensions,
});

declare global {
	namespace JSX {
		type Child = Node;
		type IntrinsicElements = ExtendedIntrinsicElements<typeof extensions>;
	}
}

const inc = (value: number) => value + 1;
const dec = (value: number) => value - 1;

const TestApp = () => {
	const a = atom(0);
	const b = atom(0);
	const sum = derivation(() => read(a) + read(b));

	const text = atom("");
	const showDetails = atom(false);
	const choice = atom<"a" | "b" | "c">("a");

	return (
		<>
			<Button onclick={() => update(a, dec)}>
				<Text>a -= 1</Text>
			</Button>
			<Button onclick={() => update(a, inc)}>
				<Text>a += 1</Text>
			</Button>
			<Button onclick={() => update(b, dec)}>
				<Text>b -= 1</Text>
			</Button>
			<Button onclick={() => update(b, inc)}>
				<Text>b += 1</Text>
			</Button>
			<span>
				<Text>a + b = {sum}</Text>
			</span>

			<TextInput value={text} masked />
			<Text>written: "{text}"</Text>

			<CheckBox checked={showDetails}>
				Show Details
			</CheckBox>
			<Show when={showDetails}>
				{() => (
					<Text>This some crazy detail right here!</Text>
				)}
			</Show>

			<RadioGroup value={choice}>
				<RadioItem value="a">A</RadioItem>
				<RadioItem value="b">B</RadioItem>
				<RadioItem value="c">C</RadioItem>
			</RadioGroup>
			<Text>Choice: "{choice}"</Text>
		</>
	);
};

renderer.mount(document.body, TestApp);
