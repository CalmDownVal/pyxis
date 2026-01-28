/** @preserve */
import type { JsxChildren, MaybeAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis";

import type { PROP_MAP } from "./mapping";

// TODO: SVG support
// TODO: MathML support
// ...or maybe a generic xmlns support?

/** infers the usable props of a DOM element from its native typings */
type BasePropsOf<T> = Finalize<
	& MapProps<WrapProps<OmitBanned<OmitFunctions<OmitReadonly<OmitIndex<T>>>>>, typeof PROP_MAP>
	& {
		readonly [S_NODE_TYPE]?: T;
		children: JsxChildren;
	}
>;

/** omits any catch-all index signatures from T */
type OmitIndex<T> = {
	[K in keyof T as (
		string extends K
			? never
			: number extends K
				? never
				: symbol extends K
					? never
					: K
	)]: T[K];
};

/** omits any readonly properties from an object type */
type OmitReadonly<T> = Pick<T, { [K in keyof T] -?: Equals<{ -readonly [_ in K]: T[K] }, { [_ in K]: T[K] }, K, never> }[keyof T]>;

/** checks whether types A and B are equal - resolves to type Y if they are, otherwise resolves to N - this is a utility type used by OmitReadonly */
type Equals<A, B, Y, N> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? Y : N;

/** omits any functions from an object type */
type OmitFunctions<T> = Pick<T, { [K in keyof T] -?: T[K] extends Nil<(...args: any) => any> ? never : K }[keyof T]>;

/** omits a select set of "banned" properties, mainly direct HTML or text manipulation as that should be done via Pyxis' own mechanics */
type OmitBanned<T> = Omit<T, "children" | "classList" | "style" | "innerHTML" | "outerHTML" | "innerText" | "outerText" | "textContent" | "nodeValue">;

/** wraps each property type in MaybeAtom to allow the use of atoms on properties of intrinsic elements */
type WrapProps<T> = { [K in keyof T]: MaybeAtom<T[K]> };

/** renames props according to the given mapping */
type MapProps<T, M extends { [K in string]: string }> = {
	[K in MappedPropKeys<T, M>]: K extends keyof M
		? M[K] extends keyof T
			? T[M[K]]
			: never
		: K extends keyof T
			? T[K]
			: never;
};

/** infers the new keys of an object afte remapping properties - this is a utility type used by MapProps */
type MappedPropKeys<T, M extends { [K in string]: string }> =
	Exclude<keyof T, M[keyof M]> | { [K in keyof M]: M[K] extends keyof T ? K : never }[keyof M];

/** makes all props optional and readonly */
type Finalize<T> = { readonly [K in keyof T]?: T[K] };


/** @bake */
export type CSSStyleDeclarationProps = Finalize<WrapProps<OmitFunctions<OmitReadonly<OmitIndex<CSSStyleDeclaration>>>>>;


/** @bake */
export type HTMLAnchorElementProps = BasePropsOf<HTMLAnchorElement>;

/** @bake */
export type HTMLElementProps = BasePropsOf<HTMLElement>;

/** @bake */
export type HTMLAreaElementProps = BasePropsOf<HTMLAreaElement>;

/** @bake */
export type HTMLAudioElementProps = BasePropsOf<HTMLAudioElement>;

/** @bake */
export type HTMLBaseElementProps = BasePropsOf<HTMLBaseElement>;

/** @bake */
export type HTMLQuoteElementProps = BasePropsOf<HTMLQuoteElement>;

// /** @bake */
// export type HTMLBodyElementProps = BasePropsOf<HTMLBodyElement>;

/** @bake */
export type HTMLBRElementProps = BasePropsOf<HTMLBRElement>;

/** @bake */
export type HTMLButtonElementProps = BasePropsOf<HTMLButtonElement>;

/** @bake */
export type HTMLCanvasElementProps = BasePropsOf<HTMLCanvasElement>;

/** @bake */
export type HTMLTableCaptionElementProps = BasePropsOf<HTMLTableCaptionElement>;

/** @bake */
export type HTMLTableColElementProps = BasePropsOf<HTMLTableColElement>;

/** @bake */
export type HTMLDataElementProps = BasePropsOf<HTMLDataElement>;

/** @bake */
export type HTMLDataListElementProps = BasePropsOf<HTMLDataListElement>;

/** @bake */
export type HTMLModElementProps = BasePropsOf<HTMLModElement>;

/** @bake */
export type HTMLDetailsElementProps = BasePropsOf<HTMLDetailsElement>;

/** @bake */
export type HTMLDialogElementProps = BasePropsOf<HTMLDialogElement>;

/** @bake */
export type HTMLDivElementProps = BasePropsOf<HTMLDivElement>;

/** @bake */
export type HTMLDListElementProps = BasePropsOf<HTMLDListElement>;

/** @bake */
export type HTMLEmbedElementProps = BasePropsOf<HTMLEmbedElement>;

/** @bake */
export type HTMLFieldSetElementProps = BasePropsOf<HTMLFieldSetElement>;

/** @bake */
export type HTMLFormElementProps = BasePropsOf<HTMLFormElement>;

/** @bake */
export type HTMLHeadingElementProps = BasePropsOf<HTMLHeadingElement>;

// /** @bake */
// export type HTMLHeadElementProps = BasePropsOf<HTMLHeadElement>;

/** @bake */
export type HTMLHRElementProps = BasePropsOf<HTMLHRElement>;

// /** @bake */
// export type HTMLHtmlElementProps = BasePropsOf<HTMLHtmlElement>;

/** @bake */
export type HTMLIFrameElementProps = BasePropsOf<HTMLIFrameElement>;

/** @bake */
export type HTMLImageElementProps = BasePropsOf<HTMLImageElement>;

/** @bake */
export type HTMLInputElementProps = BasePropsOf<HTMLInputElement>;

/** @bake */
export type HTMLLabelElementProps = BasePropsOf<HTMLLabelElement>;

/** @bake */
export type HTMLLegendElementProps = BasePropsOf<HTMLLegendElement>;

/** @bake */
export type HTMLLIElementProps = BasePropsOf<HTMLLIElement>;

// /** @bake */
// export type HTMLLinkElementProps = BasePropsOf<HTMLLinkElement>;

/** @bake */
export type HTMLMapElementProps = BasePropsOf<HTMLMapElement>;

/** @bake */
export type HTMLMenuElementProps = BasePropsOf<HTMLMenuElement>;

// /** @bake */
// export type HTMLMetaElementProps = BasePropsOf<HTMLMetaElement>;

/** @bake */
export type HTMLMeterElementProps = BasePropsOf<HTMLMeterElement>;

/** @bake */
export type HTMLObjectElementProps = BasePropsOf<HTMLObjectElement>;

/** @bake */
export type HTMLOListElementProps = BasePropsOf<HTMLOListElement>;

/** @bake */
export type HTMLOptGroupElementProps = BasePropsOf<HTMLOptGroupElement>;

/** @bake */
export type HTMLOptionElementProps = BasePropsOf<HTMLOptionElement>;

/** @bake */
export type HTMLOutputElementProps = BasePropsOf<HTMLOutputElement>;

/** @bake */
export type HTMLParagraphElementProps = BasePropsOf<HTMLParagraphElement>;

/** @bake */
export type HTMLPictureElementProps = BasePropsOf<HTMLPictureElement>;

/** @bake */
export type HTMLPreElementProps = BasePropsOf<HTMLPreElement>;

/** @bake */
export type HTMLProgressElementProps = BasePropsOf<HTMLProgressElement>;

// /** @bake */
// export type HTMLScriptElementProps = BasePropsOf<HTMLScriptElement>;

/** @bake */
export type HTMLSelectElementProps = BasePropsOf<HTMLSelectElement>;

/** @bake */
export type HTMLSlotElementProps = BasePropsOf<HTMLSlotElement>;

/** @bake */
export type HTMLSourceElementProps = BasePropsOf<HTMLSourceElement>;

/** @bake */
export type HTMLSpanElementProps = BasePropsOf<HTMLSpanElement>;

// /** @bake */
// export type HTMLStyleElementProps = BasePropsOf<HTMLStyleElement>;

/** @bake */
export type HTMLTableElementProps = BasePropsOf<HTMLTableElement>;

/** @bake */
export type HTMLTableSectionElementProps = BasePropsOf<HTMLTableSectionElement>;

/** @bake */
export type HTMLTableCellElementProps = BasePropsOf<HTMLTableCellElement>;

/** @bake */
export type HTMLTemplateElementProps = BasePropsOf<HTMLTemplateElement>;

/** @bake */
export type HTMLTextAreaElementProps = BasePropsOf<HTMLTextAreaElement>;

/** @bake */
export type HTMLTimeElementProps = BasePropsOf<HTMLTimeElement>;

// /** @bake */
// export type HTMLTitleElementProps = BasePropsOf<HTMLTitleElement>;

/** @bake */
export type HTMLTableRowElementProps = BasePropsOf<HTMLTableRowElement>;

/** @bake */
export type HTMLTrackElementProps = BasePropsOf<HTMLTrackElement>;

/** @bake */
export type HTMLUListElementProps = BasePropsOf<HTMLUListElement>;

/** @bake */
export type HTMLVideoElementProps = BasePropsOf<HTMLVideoElement>;

/**
 * describes the props of all usable DOM elements
 * @preserve
 */
export interface IntrinsicElements {
	a: HTMLAnchorElementProps;
	abbr: HTMLElementProps;
	address: HTMLElementProps;
	area: HTMLAreaElementProps;
	article: HTMLElementProps;
	aside: HTMLElementProps;
	audio: HTMLAudioElementProps;
	b: HTMLElementProps;
	base: HTMLBaseElementProps;
	bdi: HTMLElementProps;
	bdo: HTMLElementProps;
	blockquote: HTMLQuoteElementProps;
	// body: HTMLBodyElementProps;
	br: HTMLBRElementProps;
	button: HTMLButtonElementProps;
	canvas: HTMLCanvasElementProps;
	caption: HTMLTableCaptionElementProps;
	cite: HTMLElementProps;
	code: HTMLElementProps;
	col: HTMLTableColElementProps;
	colgroup: HTMLTableColElementProps;
	data: HTMLDataElementProps;
	datalist: HTMLDataListElementProps;
	dd: HTMLElementProps;
	del: HTMLModElementProps;
	details: HTMLDetailsElementProps;
	dfn: HTMLElementProps;
	dialog: HTMLDialogElementProps;
	div: HTMLDivElementProps;
	dl: HTMLDListElementProps;
	dt: HTMLElementProps;
	em: HTMLElementProps;
	embed: HTMLEmbedElementProps;
	fieldset: HTMLFieldSetElementProps;
	figcaption: HTMLElementProps;
	figure: HTMLElementProps;
	footer: HTMLElementProps;
	form: HTMLFormElementProps;
	h1: HTMLHeadingElementProps;
	h2: HTMLHeadingElementProps;
	h3: HTMLHeadingElementProps;
	h4: HTMLHeadingElementProps;
	h5: HTMLHeadingElementProps;
	h6: HTMLHeadingElementProps;
	// head: HTMLHeadElementProps;
	header: HTMLElementProps;
	hgroup: HTMLElementProps;
	hr: HTMLHRElementProps;
	// html: HTMLHtmlElementProps;
	i: HTMLElementProps;
	iframe: HTMLIFrameElementProps;
	img: HTMLImageElementProps;
	input: HTMLInputElementProps;
	ins: HTMLModElementProps;
	kbd: HTMLElementProps;
	label: HTMLLabelElementProps;
	legend: HTMLLegendElementProps;
	li: HTMLLIElementProps;
	// link: HTMLLinkElementProps;
	main: HTMLElementProps;
	map: HTMLMapElementProps;
	mark: HTMLElementProps;
	menu: HTMLMenuElementProps;
	// meta: HTMLMetaElementProps;
	meter: HTMLMeterElementProps;
	nav: HTMLElementProps;
	noscript: HTMLElementProps;
	object: HTMLObjectElementProps;
	ol: HTMLOListElementProps;
	optgroup: HTMLOptGroupElementProps;
	option: HTMLOptionElementProps;
	output: HTMLOutputElementProps;
	p: HTMLParagraphElementProps;
	picture: HTMLPictureElementProps;
	pre: HTMLPreElementProps;
	progress: HTMLProgressElementProps;
	q: HTMLQuoteElementProps;
	rp: HTMLElementProps;
	rt: HTMLElementProps;
	ruby: HTMLElementProps;
	s: HTMLElementProps;
	samp: HTMLElementProps;
	// script: HTMLScriptElementProps;
	search: HTMLElementProps;
	section: HTMLElementProps;
	select: HTMLSelectElementProps;
	slot: HTMLSlotElementProps;
	small: HTMLElementProps;
	source: HTMLSourceElementProps;
	span: HTMLSpanElementProps;
	strong: HTMLElementProps;
	// style: HTMLStyleElementProps;
	sub: HTMLElementProps;
	summary: HTMLElementProps;
	sup: HTMLElementProps;
	table: HTMLTableElementProps;
	tbody: HTMLTableSectionElementProps;
	td: HTMLTableCellElementProps;
	template: HTMLTemplateElementProps;
	textarea: HTMLTextAreaElementProps;
	tfoot: HTMLTableSectionElementProps;
	th: HTMLTableCellElementProps;
	thead: HTMLTableSectionElementProps;
	time: HTMLTimeElementProps;
	// title: HTMLTitleElementProps;
	tr: HTMLTableRowElementProps;
	track: HTMLTrackElementProps;
	u: HTMLElementProps;
	ul: HTMLUListElementProps;
	var: HTMLElementProps;
	video: HTMLVideoElementProps;
	wbr: HTMLElementProps;
}
