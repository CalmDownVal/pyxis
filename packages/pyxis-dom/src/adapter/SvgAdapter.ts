import type { Adapter } from "@calmdown/pyxis";

import type { IntrinsicElements } from "../jsx/baked";
import { insert, remove } from "./common";

export const SvgAdapter: Adapter<Node, IntrinsicElements> = {
	native,
	insert,
	remove,
	set,
	tick: queueMicrotask,
};

const NS = "http://www.w3.org/2000/svg";

function native(tagName: string | undefined) {
	// undefined only comes from the <Svg> component
	return document.createElementNS(NS, tagName ?? "svg");
}

function set(node: Node, attr: string, value: unknown) {
	if (node.nodeType === Node.ELEMENT_NODE) {
		if (value === null || value === undefined) {
			(node as SVGElement).removeAttribute(attr);
		}
		else {
			(node as SVGElement).setAttribute(attr, value.toString());
		}
	}
}
