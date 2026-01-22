import type { ElementsType } from "~/support/types";

import type { Adapter, Extension, ExtensionsType } from "./Adapter";
import { createRenderer, type Renderer } from "./Renderer";

export interface PyxisBuilder<TNode, TIntrinsicElements extends ElementsType> {
	build: () => Renderer<TNode, TIntrinsicElements>;

	extend: <TExtensionKey extends string, TExtendedIntrinsicElements extends ElementsType>(
		extensionKey: TExtensionKey,
		extension: (extensionKey: TExtensionKey, intrinsicElements: TIntrinsicElements) => TExtendedIntrinsicElements,
	) => PyxisBuilder<TNode, TExtendedIntrinsicElements>;
}

export function pyxis<TNode, TIntrinsicElements extends ElementsType>(adapter: Adapter<TNode, TIntrinsicElements>) {
	const extensions: ExtensionsType<TNode> = {};
	const builder = {
		build: () => createRenderer(adapter, extensions),
		extend: (extensionKey: string, extension: Extension<TNode>) => {
			extensions[extensionKey] = extension;
			return builder;
		},
	};

	return builder as PyxisBuilder<TNode, TIntrinsicElements>;
}
