export { Text, type TextProps } from "./component/Text";

export { BemBlockExtension, BemElementExtension, BemModifierExtension, type BemDynamicExtensionType, type BemStaticExtensionType } from "./extension/BemExtension";
export { ClassListExtension, type ClassListExtensionType } from "./extension/ClassListExtension";
export { EventExtension, type EventExtensionType, type ExtendedEvent } from "./extension/EventExtension";
export { ResizeObserverExtension, type ResizeObserverExtensionType } from "./extension/ResizeObserverExtension";

export type * from "./jsx/baked.ts";

export { DomAdapter } from "./DomAdapter";
