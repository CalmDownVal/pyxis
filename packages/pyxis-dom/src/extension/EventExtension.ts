import { reaction, read, type MaybeAtom } from "@calmdown/pyxis";

export type EventExtensionType = {
	[TType in keyof GlobalEventHandlersEventMap]: {
		setProp<TNode extends HTMLElement>(
			node: TNode,
			type: TType,
			listener: MaybeAtom<(e: ExtendedEvent<GlobalEventHandlersEventMap[TType], TType, TNode>) => any>,
		): void;
	};
}[keyof GlobalEventHandlersEventMap];

export type ExtendedEvent<TEvent, TType, TNode> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly type: TType;
		readonly currentTarget: TNode;
	};

export const EventExtension: EventExtensionType = {
	setProp: (
		node: HTMLElement,
		type: string,
		listenerAtom: MaybeAtom<(e: any) => any>,
	) => {
		reaction(() => {
			const listener = read(listenerAtom);
			node.addEventListener(type, listener);
			return () => {
				node.removeEventListener(type, listener);
			};
		});
	},
};
