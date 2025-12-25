export type EventExtensionType = {
	[E in keyof GlobalEventHandlersEventMap]: {
		setProp(node: HTMLElement, type: E, listener: (e: GlobalEventHandlersEventMap[E]) => any): void;
	};
}[keyof GlobalEventHandlersEventMap];

export const EventExtension: EventExtensionType = {
	setProp: (
		node: EventTarget,
		prop: string,
		value: (e: any) => any,
	) => {
		node.addEventListener(prop, value);
	},
};
