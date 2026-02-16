import { unmounted, write, type Atom, type ElementsType, type ExtensionProps } from "@calmdown/pyxis";

export interface ResizeObserverExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly block?: Atom<number> }>
		);
	};

	set: (node: Element, kind: "block" | "inline", size: Atom<number>) => void;
}

interface SizeObservation {
	block?: Atom<number>;
	inline?: Atom<number>;
}

const observations = new WeakMap<Element, SizeObservation>();
const options: ResizeObserverOptions = { box: "border-box" };
let observer: ResizeObserver | null = null;

function updateObservations(entries: readonly ResizeObserverEntry[]) {
	const { length } = entries;
	let index = 0;
	let entry;
	let observation;
	let size;
	for (; index < length; index += 1) {
		entry = entries[index];
		if (observation = observations.get(entry.target)) {
			size = entry.borderBoxSize[0];
			write(observation.block, size.blockSize);
			write(observation.inline, size.inlineSize);
		}
	}
}

export const ResizeObserverExtension = {
	set: (
		node: Element,
		type: "block" | "inline",
		size: Atom<number>,
	) => {
		let observation = observations.get(node);
		if (!observation) {
			observations.set(node, observation = {});
		}

		observation[type] = size;
		observer ??= new ResizeObserver(updateObservations);
		observer.observe(node, options);

		unmounted(() => {
			observer!.unobserve(node);
		});
	},
} as ResizeObserverExtensionType;
