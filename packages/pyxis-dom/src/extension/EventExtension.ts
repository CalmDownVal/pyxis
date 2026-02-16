import { getLifecycle, isAtom, reaction, read, unmounted, withLifecycle, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis";

export interface EventExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			TElements[TElementName] & ExtensionProps<TExtensionKey, {
				readonly [TEventName in keyof GlobalEventHandlersEventMap]?: EventListenerType<GlobalEventHandlersEventMap[TEventName], NodeType<TElements[TElementName]>, TEventName>;
			}>
		);
	};

	set: (node: HTMLElement, className: string, toggle: EventListenerType<unknown, unknown, string>) => void;
}

export type EventListenerType<TEvent, TNode = EventTarget, TEventName = string> =
	| MaybeAtom<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>
	| (AddEventListenerOptions & {
		readonly listener: MaybeAtom<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>;
	});

export type ExtendedEvent<TEvent, TNode = EventTarget, TEventName = string> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly currentTarget: TNode;
		readonly type: TEventName;
	};

export const EventExtension = {
	set: (
		node: HTMLElement,
		type: string,
		listener: EventListenerType<unknown, unknown, string>,
	) => {
		// see if listener options have been given
		type ListenerAtom = MaybeAtom<(e: unknown) => unknown>;
		let listenerAtom = listener as ListenerAtom;
		let options: AddEventListenerOptions | undefined;

		const maybeOptions = read(listener);
		if (typeof maybeOptions === "object") {
			listenerAtom = maybeOptions.listener as ListenerAtom;
			options = maybeOptions;
		}

		if (!listenerAtom) {
			return;
		}

		// keep callback up to date
		let callback: (e: unknown) => unknown;
		const lifecycle = getLifecycle();
		if (isAtom(listenerAtom)) {
			reaction(() => {
				callback = read(listenerAtom);
			}, lifecycle);
		}
		else {
			callback = listenerAtom;
		}

		// listen
		const listenerWithLifecycle = (e: unknown) => {
			withLifecycle(lifecycle, callback!, e);
		};

		node.addEventListener(type, listenerWithLifecycle, options);
		unmounted(() => {
			node.removeEventListener(type, listenerWithLifecycle, options);
		}, lifecycle);
	},
} as EventExtensionType;
