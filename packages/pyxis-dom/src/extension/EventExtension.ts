import { getLifecycle, reaction, read, unmounted, withLifecycle, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis";

export interface EventExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly [TEventName in keyof GlobalEventHandlersEventMap]?: MaybeAtom<(e: ExtendedEvent<GlobalEventHandlersEventMap[TEventName], TEventName, NodeType<TElements[TElementName]>>) => any>;
		}>;
	};

	set: (node: HTMLElement, className: string, toggle: MaybeAtom<(e: unknown) => unknown>) => void;
}

export type ExtendedEvent<TEvent, TEventName, TNode> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly type: TEventName;
		readonly currentTarget: TNode;
	};

export const EventExtension = {
	set: (
		node: HTMLElement,
		type: string,
		listener: MaybeAtom<(e: unknown) => unknown>,
	) => {
		let callback: (e: unknown) => unknown;

		const lifecycle = getLifecycle();
		const listenerWithLifecycle = (e: unknown) => {
			withLifecycle(lifecycle, callback!, e);
		};

		reaction(() => {
			callback = read(listener);
		}, lifecycle);

		node.addEventListener(type, listenerWithLifecycle);
		unmounted(() => {
			node.removeEventListener(type, listenerWithLifecycle);
		}, lifecycle);
	},
} as EventExtensionType;
