import type { ExtensionMap, ExtensionProps, MaybeAtom, Nil } from "@calmdown/pyxis";

import type { PROP_MAP } from "./props";

// TODO: SVG support
// TODO: MathML support
// ...or maybe a generic xmlns support?

export type ExtendedIntrinsicElements<TExtensions extends ExtensionMap> = {
	[N in keyof Elements]: BasePropsOf<Elements[N]> & ExtensionProps<Elements[N], TExtensions>;
};

export type BasePropsOf<T> = Partial<
	& { children: Node | readonly Node[] }
	& MapProps<WrapProps<OmitBanned<OmitFunctions<OmitReadonly<T>>>>, typeof PROP_MAP>
>;

export type OmitReadonly<T> = Pick<T, { [K in keyof T] -?: Equals<{ -readonly [_ in K]: T[K] }, { [_ in K]: T[K] }, K, never> }[keyof T]>;

export type Equals<A, B, Y, N> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? Y : N;

export type OmitFunctions<T> = Pick<T, { [K in keyof T] -?: T[K] extends Nil<(...args: any) => any> ? never : K }[keyof T]>;

export type OmitBanned<T> = Omit<T, "children" | "innerHTML" | "outerHTML" | "innerText" | "outerText" | "textContent" | "nodeValue">;

export type WrapProps<T> = { [K in keyof T]: MaybeAtom<T[K]> };

export type MapProps<T, M extends { [K in string]: string }> = {
	[K in MappedPropKeys<T, M>]: K extends keyof M
		? M[K] extends keyof T
			? T[M[K]]
			: never
		: K extends keyof T
			? T[K]
			: never;
};

export type MappedPropKeys<T, M extends { [K in string]: string }> =
	Exclude<keyof T, M[keyof M]> | { [K in keyof M]: M[K] extends keyof T ? K : never }[keyof M];

export interface Elements {
	a: HTMLAnchorElement;
	abbr: HTMLElement;
	address: HTMLElement;
	area: HTMLAreaElement;
	article: HTMLElement;
	aside: HTMLElement;
	audio: HTMLAudioElement;
	b: HTMLElement;
	base: HTMLBaseElement;
	bdi: HTMLElement;
	bdo: HTMLElement;
	blockquote: HTMLQuoteElement;
	// body: HTMLBodyElement;
	br: HTMLBRElement;
	button: HTMLButtonElement;
	canvas: HTMLCanvasElement;
	caption: HTMLTableCaptionElement;
	cite: HTMLElement;
	code: HTMLElement;
	col: HTMLTableColElement;
	colgroup: HTMLTableColElement;
	data: HTMLDataElement;
	datalist: HTMLDataListElement;
	dd: HTMLElement;
	del: HTMLModElement;
	details: HTMLDetailsElement;
	dfn: HTMLElement;
	dialog: HTMLDialogElement;
	div: HTMLDivElement;
	dl: HTMLDListElement;
	dt: HTMLElement;
	em: HTMLElement;
	embed: HTMLEmbedElement;
	fieldset: HTMLFieldSetElement;
	figcaption: HTMLElement;
	figure: HTMLElement;
	footer: HTMLElement;
	form: HTMLFormElement;
	h1: HTMLHeadingElement;
	h2: HTMLHeadingElement;
	h3: HTMLHeadingElement;
	h4: HTMLHeadingElement;
	h5: HTMLHeadingElement;
	h6: HTMLHeadingElement;
	// head: HTMLHeadElement;
	header: HTMLElement;
	hgroup: HTMLElement;
	hr: HTMLHRElement;
	// html: HTMLHtmlElement;
	i: HTMLElement;
	iframe: HTMLIFrameElement;
	img: HTMLImageElement;
	input: HTMLInputElement;
	ins: HTMLModElement;
	kbd: HTMLElement;
	label: HTMLLabelElement;
	legend: HTMLLegendElement;
	li: HTMLLIElement;
	// link: HTMLLinkElement;
	main: HTMLElement;
	map: HTMLMapElement;
	mark: HTMLElement;
	menu: HTMLMenuElement;
	// meta: HTMLMetaElement;
	meter: HTMLMeterElement;
	nav: HTMLElement;
	noscript: HTMLElement;
	object: HTMLObjectElement;
	ol: HTMLOListElement;
	optgroup: HTMLOptGroupElement;
	option: HTMLOptionElement;
	output: HTMLOutputElement;
	p: HTMLParagraphElement;
	picture: HTMLPictureElement;
	pre: HTMLPreElement;
	progress: HTMLProgressElement;
	q: HTMLQuoteElement;
	rp: HTMLElement;
	rt: HTMLElement;
	ruby: HTMLElement;
	s: HTMLElement;
	samp: HTMLElement;
	// script: HTMLScriptElement;
	search: HTMLElement;
	section: HTMLElement;
	select: HTMLSelectElement;
	slot: HTMLSlotElement;
	small: HTMLElement;
	source: HTMLSourceElement;
	span: HTMLSpanElement;
	strong: HTMLElement;
	// style: HTMLStyleElement;
	sub: HTMLElement;
	summary: HTMLElement;
	sup: HTMLElement;
	table: HTMLTableElement;
	tbody: HTMLTableSectionElement;
	td: HTMLTableCellElement;
	template: HTMLTemplateElement;
	textarea: HTMLTextAreaElement;
	tfoot: HTMLTableSectionElement;
	th: HTMLTableCellElement;
	thead: HTMLTableSectionElement;
	time: HTMLTimeElement;
	// title: HTMLTitleElement;
	tr: HTMLTableRowElement;
	track: HTMLTrackElement;
	u: HTMLElement;
	ul: HTMLUListElement;
	var: HTMLElement;
	video: HTMLVideoElement;
	wbr: HTMLElement;
}
