import { getLifecycle, peek, unmounted, withLifecycle, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis/core";

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
	| (AddEventListenerOptions & { capture?: false } & {
		readonly listener: MaybeAtom<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>;
	})
	| (AddEventListenerOptions & { capture: true } & {
		readonly listener: MaybeAtom<(e: ExtendedEvent<TEvent, EventTarget | null, TEventName>) => void>;
	});

export type ExtendedEvent<TEvent, TNode = EventTarget, TEventName = string> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly currentTarget: TNode;
		readonly type: TEventName;
	};

/**
 * Extension adding EventListener access to any Element. Recommended prefix:
 * `"on"`
 *
 * All standard DOM events can be subscribed using this extension. You can pass
 * a function directly to add a simple listener, or pass an object to
 * additionally specify listener options. In both cases the listener can be an
 * atom, allowing to dynamically change the listener callback. Listener options
 * cannot be dynamically changed.
 *
 * Example usage:
 * ```tsx
 * <div
 *   on:contextmenu={e => {
 *     // ...
 *   }}
 *   on:scroll={{
 *     passive: true,
 *     listener: e => {
 *       // ...
 *     },
 *   }}
 * />
 * ```
 */
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

		const maybeOptions = peek(listener);
		if (typeof maybeOptions === "object") {
			listenerAtom = maybeOptions.listener as ListenerAtom;
			options = maybeOptions;
		}

		if (!listenerAtom) {
			return;
		}

		// listen
		const lifecycle = getLifecycle();
		const listenerWithLifecycle = (e: unknown) => {
			withLifecycle(lifecycle, peek(listenerAtom), e);
		};

		node.addEventListener(type, listenerWithLifecycle, options);
		unmounted(() => {
			node.removeEventListener(type, listenerWithLifecycle, options);
		}, lifecycle);
	},
} as EventExtensionType;
