import { atom, createRenderer, update } from "@calmdown/pyxis";
import { DomAdapter, EventExtension, Text, type EventExtensionType, type ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

declare global {
	namespace JSX {
		export type Element = Node;
		export type IntrinsicElements = ExtendedIntrinsicElements<{ on: EventExtensionType }>;
	}
}

const renderer = createRenderer({
	adapter: DomAdapter,
	tick: queueMicrotask,
	extensions: {
		on: EventExtension,
	},
});

const inc = (value: number) => value + 1;
const dec = (value: number) => value - 1;

renderer.mount(document.body, () => {
	const count = atom(0);
	return (
		<>
			<span>
				<Text>{count}</Text>
			</span>
			<button type="button" on:click={() => update(count, inc)}>
				<Text>+1</Text>
			</button>
			<button type="button" on:click={() => update(count, dec)}>
				<Text>-1</Text>
			</button>
		</>
	);
});
