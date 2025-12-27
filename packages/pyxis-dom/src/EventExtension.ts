export type EventExtensionType = {
	[TType in keyof GlobalEventHandlersEventMap]: {
		setProp<TNode extends HTMLElement>(
			node: TNode,
			type: TType,
			listener: (e: ExtendedEvent<GlobalEventHandlersEventMap[TType], TType, TNode>) => any,
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
		node: EventTarget,
		prop: string,
		value: (e: any) => any,
	) => {
		node.addEventListener(prop, value);
	},
};
