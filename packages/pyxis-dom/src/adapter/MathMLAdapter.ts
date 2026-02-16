import type { Adapter } from "@calmdown/pyxis";

import type { IntrinsicElements } from "../jsx/baked";
import { insert, remove, setAttr } from "./common";

export const MathMLAdapter: Adapter<Node, IntrinsicElements> = {
	native,
	insert,
	remove,
	set: setAttr,
	tick: queueMicrotask,
};

const NS = "http://www.w3.org/1998/Math/MathML";

function native(tagName: string | undefined) {
	// undefined only comes from the <Math> component
	return document.createElementNS(NS, tagName ?? "math");
}
