/** @preserve */
import type { JsxChildren, MaybeAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis";

import type { PROP_MAP } from "./mapping";

// TODO: SVG support
// TODO: MathML support
// ...or maybe a generic xmlns support?

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

/** applies custom field overrides O over the given type T */
type ApplyOverrides<T, O> = Omit<T, keyof O> & Pick<O, { [K in keyof O]: O[K] extends never ? never : K }[keyof O]>;

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


// #region CSS

/** @bake */
export type CSSStyleDeclarationProps = Finalize<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<CSSStyleDeclaration>>>, CSSPropOverrides>>>;

interface CSSPropOverrides {
	anchorName: string;
	clip: never;
	fontStretch: never;
	gridColumnGap: never;
	gridGap: never;
	gridRowGap: never;
	imageOrientation: never;
	pageBreakAfter: never;
	pageBreakBefore: never;
	pageBreakInside: never;
	positionAnchor: string;
	webkitAlignContent: never;
	webkitAlignItems: never;
	webkitAlignSelf: never;
	webkitAnimation: never;
	webkitAnimationDelay: never;
	webkitAnimationDirection: never;
	webkitAnimationDuration: never;
	webkitAnimationFillMode: never;
	webkitAnimationIterationCount: never;
	webkitAnimationName: never;
	webkitAnimationPlayState: never;
	webkitAnimationTimingFunction: never;
	webkitAppearance: never;
	webkitBackfaceVisibility: never;
	webkitBackgroundClip: never;
	webkitBackgroundOrigin: never;
	webkitBackgroundSize: never;
	webkitBorderBottomLeftRadius: never;
	webkitBorderBottomRightRadius: never;
	webkitBorderRadius: never;
	webkitBorderTopLeftRadius: never;
	webkitBorderTopRightRadius: never;
	webkitBoxAlign: never;
	webkitBoxFlex: never;
	webkitBoxOrdinalGroup: never;
	webkitBoxOrient: never;
	webkitBoxPack: never;
	webkitBoxShadow: never;
	webkitBoxSizing: never;
	webkitFilter: never;
	webkitFlex: never;
	webkitFlexBasis: never;
	webkitFlexDirection: never;
	webkitFlexFlow: never;
	webkitFlexGrow: never;
	webkitFlexShrink: never;
	webkitFlexWrap: never;
	webkitJustifyContent: never;
	webkitMask: never;
	webkitMaskBoxImage: never;
	webkitMaskBoxImageOutset: never;
	webkitMaskBoxImageRepeat: never;
	webkitMaskBoxImageSlice: never;
	webkitMaskBoxImageSource: never;
	webkitMaskBoxImageWidth: never;
	webkitMaskClip: never;
	webkitMaskComposite: never;
	webkitMaskImage: never;
	webkitMaskOrigin: never;
	webkitMaskPosition: never;
	webkitMaskRepeat: never;
	webkitMaskSize: never;
	webkitOrder: never;
	webkitPerspective: never;
	webkitPerspectiveOrigin: never;
	webkitTextSizeAdjust: never;
	webkitTransform: never;
	webkitTransformOrigin: never;
	webkitTransformStyle: never;
	webkitTransition: never;
	webkitTransitionDelay: never;
	webkitTransitionDuration: never;
	webkitTransitionProperty: never;
	webkitTransitionTimingFunction: never;
	webkitUserSelect: never;
	wordWrap: never;
}

// #endregion

// #region HTML

type HTMLProps<T> = Finalize<{ readonly [S_NODE_TYPE]?: T } & MapProps<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<T>>>, HTMLPropOverrides>>, typeof PROP_MAP>>;

interface HTMLPropOverrides {
	children: JsxChildren;
	classList: never;
	innerHTML: never;
	innerText: never;
	nodeValue: never;
	outerHTML: never;
	outerText: never;
	part: string;
	style: never;
	textContent: never;
}

/** @bake */
export type HTMLAnchorElementProps = HTMLProps<HTMLAnchorElement>;

/** @bake */
export type HTMLElementProps = HTMLProps<HTMLElement>;

/** @bake */
export type HTMLAreaElementProps = HTMLProps<HTMLAreaElement>;

/** @bake */
export type HTMLAudioElementProps = HTMLProps<HTMLAudioElement>;

/** @bake */
export type HTMLBaseElementProps = HTMLProps<HTMLBaseElement>;

/** @bake */
export type HTMLQuoteElementProps = HTMLProps<HTMLQuoteElement>;

// /** @bake */
// export type HTMLBodyElementProps = HTMLProps<HTMLBodyElement>;

/** @bake */
export type HTMLBRElementProps = HTMLProps<HTMLBRElement>;

/** @bake */
export type HTMLButtonElementProps = HTMLProps<HTMLButtonElement>;

/** @bake */
export type HTMLCanvasElementProps = HTMLProps<HTMLCanvasElement>;

/** @bake */
export type HTMLTableCaptionElementProps = HTMLProps<HTMLTableCaptionElement>;

/** @bake */
export type HTMLTableColElementProps = HTMLProps<HTMLTableColElement>;

/** @bake */
export type HTMLDataElementProps = HTMLProps<HTMLDataElement>;

/** @bake */
export type HTMLDataListElementProps = HTMLProps<HTMLDataListElement>;

/** @bake */
export type HTMLModElementProps = HTMLProps<HTMLModElement>;

/** @bake */
export type HTMLDetailsElementProps = HTMLProps<HTMLDetailsElement>;

/** @bake */
export type HTMLDialogElementProps = HTMLProps<HTMLDialogElement>;

/** @bake */
export type HTMLDivElementProps = HTMLProps<HTMLDivElement>;

/** @bake */
export type HTMLDListElementProps = HTMLProps<HTMLDListElement>;

/** @bake */
export type HTMLEmbedElementProps = HTMLProps<HTMLEmbedElement>;

/** @bake */
export type HTMLFieldSetElementProps = HTMLProps<HTMLFieldSetElement>;

/** @bake */
export type HTMLFormElementProps = HTMLProps<HTMLFormElement>;

/** @bake */
export type HTMLHeadingElementProps = HTMLProps<HTMLHeadingElement>;

// /** @bake */
// export type HTMLHeadElementProps = HTMLProps<HTMLHeadElement>;

/** @bake */
export type HTMLHRElementProps = HTMLProps<HTMLHRElement>;

// /** @bake */
// export type HTMLHtmlElementProps = HTMLProps<HTMLHtmlElement>;

/** @bake */
export type HTMLIFrameElementProps = HTMLProps<HTMLIFrameElement>;

/** @bake */
export type HTMLImageElementProps = HTMLProps<HTMLImageElement>;

/** @bake */
export type HTMLInputElementProps = HTMLProps<HTMLInputElement>;

/** @bake */
export type HTMLLabelElementProps = HTMLProps<HTMLLabelElement>;

/** @bake */
export type HTMLLegendElementProps = HTMLProps<HTMLLegendElement>;

/** @bake */
export type HTMLLIElementProps = HTMLProps<HTMLLIElement>;

// /** @bake */
// export type HTMLLinkElementProps = HTMLProps<HTMLLinkElement>;

/** @bake */
export type HTMLMapElementProps = HTMLProps<HTMLMapElement>;

/** @bake */
export type HTMLMenuElementProps = HTMLProps<HTMLMenuElement>;

// /** @bake */
// export type HTMLMetaElementProps = HTMLProps<HTMLMetaElement>;

/** @bake */
export type HTMLMeterElementProps = HTMLProps<HTMLMeterElement>;

/** @bake */
export type HTMLObjectElementProps = HTMLProps<HTMLObjectElement>;

/** @bake */
export type HTMLOListElementProps = HTMLProps<HTMLOListElement>;

/** @bake */
export type HTMLOptGroupElementProps = HTMLProps<HTMLOptGroupElement>;

/** @bake */
export type HTMLOptionElementProps = HTMLProps<HTMLOptionElement>;

/** @bake */
export type HTMLOutputElementProps = HTMLProps<HTMLOutputElement>;

/** @bake */
export type HTMLParagraphElementProps = HTMLProps<HTMLParagraphElement>;

/** @bake */
export type HTMLPictureElementProps = HTMLProps<HTMLPictureElement>;

/** @bake */
export type HTMLPreElementProps = HTMLProps<HTMLPreElement>;

/** @bake */
export type HTMLProgressElementProps = HTMLProps<HTMLProgressElement>;

// /** @bake */
// export type HTMLScriptElementProps = HTMLProps<HTMLScriptElement>;

/** @bake */
export type HTMLSelectElementProps = HTMLProps<HTMLSelectElement>;

/** @bake */
export type HTMLSlotElementProps = HTMLProps<HTMLSlotElement>;

/** @bake */
export type HTMLSourceElementProps = HTMLProps<HTMLSourceElement>;

/** @bake */
export type HTMLSpanElementProps = HTMLProps<HTMLSpanElement>;

// /** @bake */
// export type HTMLStyleElementProps = HTMLProps<HTMLStyleElement>;

/** @bake */
export type HTMLTableElementProps = HTMLProps<HTMLTableElement>;

/** @bake */
export type HTMLTableSectionElementProps = HTMLProps<HTMLTableSectionElement>;

/** @bake */
export type HTMLTableCellElementProps = HTMLProps<HTMLTableCellElement>;

/** @bake */
export type HTMLTemplateElementProps = HTMLProps<HTMLTemplateElement>;

/** @bake */
export type HTMLTextAreaElementProps = HTMLProps<HTMLTextAreaElement>;

/** @bake */
export type HTMLTimeElementProps = HTMLProps<HTMLTimeElement>;

// /** @bake */
// export type HTMLTitleElementProps = HTMLProps<HTMLTitleElement>;

/** @bake */
export type HTMLTableRowElementProps = HTMLProps<HTMLTableRowElement>;

/** @bake */
export type HTMLTrackElementProps = HTMLProps<HTMLTrackElement>;

/** @bake */
export type HTMLUListElementProps = HTMLProps<HTMLUListElement>;

/** @bake */
export type HTMLVideoElementProps = HTMLProps<HTMLVideoElement>;

// #endregion

// #region SVG

type SVGProps<T> = Finalize<{ readonly [S_NODE_TYPE]?: T } & MapProps<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<SVGElement>>>, SVGPropOverrides>>, typeof PROP_MAP>>;

interface SVGPropOverrides {
	children: JsxChildren;
	classList: never;
	innerHTML: never;
	nodeValue: never;
	outerHTML: never;
	part: string;
	style: never;
	textContent: never;

	// attribute list taken from:
	// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute
	accumulate: string;
	additive: string;
	"alignment-baseline": string;
	amplitude: string;
	attributeName: string;
	attributeType: string;
	autofocus: string;
	azimuth: string;
	baseFrequency: string;
	"baseline-shift": string;
	baseProfile: string;
	begin: string;
	bias: string;
	by: string;
	calcMode: string;
	class: string;
	clip: string;
	clipPathUnits: string;
	"clip-path": string;
	"clip-rule": string;
	color: string;
	"color-interpolation": string;
	"color-interpolation-filters": string;
	crossorigin: string;
	cursor: string;
	cx: string;
	cy: string;
	d: string;
	decoding: string;
	diffuseConstant: string;
	direction: string;
	display: string;
	divisor: string;
	"dominant-baseline": string;
	dur: string;
	dx: string;
	dy: string;
	edgeMode: string;
	elevation: string;
	end: string;
	exponent: string;
	fetchpriority: string;
	fill: string;
	"fill-opacity": string;
	"fill-rule": string;
	filter: string;
	filterUnits: string;
	"flood-color": string;
	"flood-opacity": string;
	"font-family": string;
	"font-size": string;
	"font-size-adjust": string;
	"font-stretch": string;
	"font-style": string;
	"font-variant": string;
	"font-weight": string;
	fr: string;
	from: string;
	fx: string;
	fy: string;
	"glyph-orientation-horizontal": string;
	"glyph-orientation-vertical": string;
	gradientTransform: string;
	gradientUnits: string;
	height: string;
	href: string;
	hreflang: string;
	id: string;
	"image-rendering": string;
	in: string;
	in2: string;
	intercept: string;
	k1: string;
	k2: string;
	k3: string;
	k4: string;
	kernelMatrix: string;
	kernelUnitLength: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	lang: string;
	lengthAdjust: string;
	"letter-spacing": string;
	"lighting-color": string;
	limitingConeAngle: string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	markerHeight: string;
	markerUnits: string;
	markerWidth: string;
	mask: string;
	maskContentUnits: string;
	maskUnits: string;
	max: string;
	media: string;
	method: string;
	min: string;
	mode: string;
	numOctaves: string;
	offset: string;
	opacity: string;
	operator: string;
	order: string;
	orient: string;
	origin: string;
	overflow: string;
	"paint-order": string;
	path: string;
	pathLength: string;
	patternContentUnits: string;
	patternTransform: string;
	patternUnits: string;
	ping: string;
	"pointer-events": string;
	points: string;
	pointsAtX: string;
	pointsAtY: string;
	pointsAtZ: string;
	preserveAlpha: string;
	preserveAspectRatio: string;
	primitiveUnits: string;
	r: string;
	radius: string;
	referrerPolicy: string;
	refX: string;
	refY: string;
	rel: string;
	repeatCount: string;
	repeatDur: string;
	requiredExtensions: string;
	requiredFeatures: string;
	restart: string;
	result: string;
	rotate: string;
	rx: string;
	ry: string;
	scale: string;
	seed: string;
	"shape-rendering": string;
	side: string;
	slope: string;
	spacing: string;
	specularConstant: string;
	specularExponent: string;
	spreadMethod: string;
	startOffset: string;
	stdDeviation: string;
	stitchTiles: string;
	"stop-color": string;
	"stop-opacity": string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": string;
	"stroke-linecap": string;
	"stroke-linejoin": string;
	"stroke-miterlimit": string;
	"stroke-opacity": string;
	"stroke-width": string;
	surfaceScale: string;
	systemLanguage: string;
	tabindex: string;
	tableValues: string;
	target: string;
	targetX: string;
	targetY: string;
	"text-anchor": string;
	"text-decoration": string;
	"text-overflow": string;
	"text-rendering": string;
	textLength: string;
	to: string;
	transform: string;
	"transform-origin": string;
	type: string;
	"unicode-bidi": string;
	values: string;
	"vector-effect": string;
	version: string;
	viewBox: string;
	visibility: string;
	"white-space": string;
	width: string;
	"word-spacing": string;
	"writing-mode": string;
	x: string;
	x1: string;
	x2: string;
	xChannelSelector: string;
	y: string;
	y1: string;
	y2: string;
	yChannelSelector: string;
	z: string;
	zoomAndPan: string;
}

/** @bake */
export type SVGAElementProps = SVGProps<SVGAElement>;

/** @bake */
export type SVGAnimateElementProps = SVGProps<SVGAnimateElement>;

/** @bake */
export type SVGAnimateMotionElementProps = SVGProps<SVGAnimateMotionElement>;

/** @bake */
export type SVGAnimateTransformElementProps = SVGProps<SVGAnimateTransformElement>;

/** @bake */
export type SVGCircleElementProps = SVGProps<SVGCircleElement>;

/** @bake */
export type SVGClipPathElementProps = SVGProps<SVGClipPathElement>;

/** @bake */
export type SVGDefsElementProps = SVGProps<SVGDefsElement>;

/** @bake */
export type SVGDescElementProps = SVGProps<SVGDescElement>;

/** @bake */
export type SVGEllipseElementProps = SVGProps<SVGEllipseElement>;

/** @bake */
export type SVGFEBlendElementProps = SVGProps<SVGFEBlendElement>;

/** @bake */
export type SVGFEColorMatrixElementProps = SVGProps<SVGFEColorMatrixElement>;

/** @bake */
export type SVGFEComponentTransferElementProps = SVGProps<SVGFEComponentTransferElement>;

/** @bake */
export type SVGFECompositeElementProps = SVGProps<SVGFECompositeElement>;

/** @bake */
export type SVGFEConvolveMatrixElementProps = SVGProps<SVGFEConvolveMatrixElement>;

/** @bake */
export type SVGFEDiffuseLightingElementProps = SVGProps<SVGFEDiffuseLightingElement>;

/** @bake */
export type SVGFEDisplacementMapElementProps = SVGProps<SVGFEDisplacementMapElement>;

/** @bake */
export type SVGFEDistantLightElementProps = SVGProps<SVGFEDistantLightElement>;

/** @bake */
export type SVGFEDropShadowElementProps = SVGProps<SVGFEDropShadowElement>;

/** @bake */
export type SVGFEFloodElementProps = SVGProps<SVGFEFloodElement>;

/** @bake */
export type SVGFEFuncAElementProps = SVGProps<SVGFEFuncAElement>;

/** @bake */
export type SVGFEFuncBElementProps = SVGProps<SVGFEFuncBElement>;

/** @bake */
export type SVGFEFuncGElementProps = SVGProps<SVGFEFuncGElement>;

/** @bake */
export type SVGFEFuncRElementProps = SVGProps<SVGFEFuncRElement>;

/** @bake */
export type SVGFEGaussianBlurElementProps = SVGProps<SVGFEGaussianBlurElement>;

/** @bake */
export type SVGFEImageElementProps = SVGProps<SVGFEImageElement>;

/** @bake */
export type SVGFEMergeElementProps = SVGProps<SVGFEMergeElement>;

/** @bake */
export type SVGFEMergeNodeElementProps = SVGProps<SVGFEMergeNodeElement>;

/** @bake */
export type SVGFEMorphologyElementProps = SVGProps<SVGFEMorphologyElement>;

/** @bake */
export type SVGFEOffsetElementProps = SVGProps<SVGFEOffsetElement>;

/** @bake */
export type SVGFEPointLightElementProps = SVGProps<SVGFEPointLightElement>;

/** @bake */
export type SVGFESpecularLightingElementProps = SVGProps<SVGFESpecularLightingElement>;

/** @bake */
export type SVGFESpotLightElementProps = SVGProps<SVGFESpotLightElement>;

/** @bake */
export type SVGFETileElementProps = SVGProps<SVGFETileElement>;

/** @bake */
export type SVGFETurbulenceElementProps = SVGProps<SVGFETurbulenceElement>;

/** @bake */
export type SVGFilterElementProps = SVGProps<SVGFilterElement>;

/** @bake */
export type SVGForeignObjectElementProps = SVGProps<SVGForeignObjectElement>;

/** @bake */
export type SVGGElementProps = SVGProps<SVGGElement>;

/** @bake */
export type SVGImageElementProps = SVGProps<SVGImageElement>;

/** @bake */
export type SVGLineElementProps = SVGProps<SVGLineElement>;

/** @bake */
export type SVGLinearGradientElementProps = SVGProps<SVGLinearGradientElement>;

/** @bake */
export type SVGMarkerElementProps = SVGProps<SVGMarkerElement>;

/** @bake */
export type SVGMaskElementProps = SVGProps<SVGMaskElement>;

/** @bake */
export type SVGMetadataElementProps = SVGProps<SVGMetadataElement>;

/** @bake */
export type SVGMPathElementProps = SVGProps<SVGMPathElement>;

/** @bake */
export type SVGPathElementProps = SVGProps<SVGPathElement>;

/** @bake */
export type SVGPatternElementProps = SVGProps<SVGPatternElement>;

/** @bake */
export type SVGPolygonElementProps = SVGProps<SVGPolygonElement>;

/** @bake */
export type SVGPolylineElementProps = SVGProps<SVGPolylineElement>;

/** @bake */
export type SVGRadialGradientElementProps = SVGProps<SVGRadialGradientElement>;

/** @bake */
export type SVGRectElementProps = SVGProps<SVGRectElement>;

/** @bake */
export type SVGScriptElementProps = SVGProps<SVGScriptElement>;

/** @bake */
export type SVGSetElementProps = SVGProps<SVGSetElement>;

/** @bake */
export type SVGStopElementProps = SVGProps<SVGStopElement>;

/** @bake */
export type SVGStyleElementProps = SVGProps<SVGStyleElement>;

/** @bake */
export type SVGSVGElementProps = SVGProps<SVGSVGElement>;

/** @bake */
export type SVGSwitchElementProps = SVGProps<SVGSwitchElement>;

/** @bake */
export type SVGSymbolElementProps = SVGProps<SVGSymbolElement>;

/** @bake */
export type SVGTextElementProps = SVGProps<SVGTextElement>;

/** @bake */
export type SVGTextPathElementProps = SVGProps<SVGTextPathElement>;

/** @bake */
export type SVGTitleElementProps = SVGProps<SVGTitleElement>;

/** @bake */
export type SVGTSpanElementProps = SVGProps<SVGTSpanElement>;

/** @bake */
export type SVGUseElementProps = SVGProps<SVGUseElement>;

/** @bake */
export type SVGViewElementProps = SVGProps<SVGViewElement>;

// #endregion

// #region IntrinsicElements

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

	// a: SVGAElementProps; // TODO: how can these coexist???
	// animate: SVGAnimateElementProps;
	// animateMotion: SVGAnimateMotionElementProps;
	// animateTransform: SVGAnimateTransformElementProps;
	// circle: SVGCircleElementProps;
	// clipPath: SVGClipPathElementProps;
	// defs: SVGDefsElementProps;
	// desc: SVGDescElementProps;
	// ellipse: SVGEllipseElementProps;
	// feBlend: SVGFEBlendElementProps;
	// feColorMatrix: SVGFEColorMatrixElementProps;
	// feComponentTransfer: SVGFEComponentTransferElementProps;
	// feComposite: SVGFECompositeElementProps;
	// feConvolveMatrix: SVGFEConvolveMatrixElementProps;
	// feDiffuseLighting: SVGFEDiffuseLightingElementProps;
	// feDisplacementMap: SVGFEDisplacementMapElementProps;
	// feDistantLight: SVGFEDistantLightElementProps;
	// feDropShadow: SVGFEDropShadowElementProps;
	// feFlood: SVGFEFloodElementProps;
	// feFuncA: SVGFEFuncAElementProps;
	// feFuncB: SVGFEFuncBElementProps;
	// feFuncG: SVGFEFuncGElementProps;
	// feFuncR: SVGFEFuncRElementProps;
	// feGaussianBlur: SVGFEGaussianBlurElementProps;
	// feImage: SVGFEImageElementProps;
	// feMerge: SVGFEMergeElementProps;
	// feMergeNode: SVGFEMergeNodeElementProps;
	// feMorphology: SVGFEMorphologyElementProps;
	// feOffset: SVGFEOffsetElementProps;
	// fePointLight: SVGFEPointLightElementProps;
	// feSpecularLighting: SVGFESpecularLightingElementProps;
	// feSpotLight: SVGFESpotLightElementProps;
	// feTile: SVGFETileElementProps;
	// feTurbulence: SVGFETurbulenceElementProps;
	// filter: SVGFilterElementProps;
	// foreignObject: SVGForeignObjectElementProps;
	// g: SVGGElementProps;
	// image: SVGImageElementProps;
	// line: SVGLineElementProps;
	// linearGradient: SVGLinearGradientElementProps;
	// marker: SVGMarkerElementProps;
	// mask: SVGMaskElementProps;
	// metadata: SVGMetadataElementProps;
	// mpath: SVGMPathElementProps;
	// path: SVGPathElementProps;
	// pattern: SVGPatternElementProps;
	// polygon: SVGPolygonElementProps;
	// polyline: SVGPolylineElementProps;
	// radialGradient: SVGRadialGradientElementProps;
	// rect: SVGRectElementProps;
	// script: SVGScriptElementProps;
	// set: SVGSetElementProps;
	// stop: SVGStopElementProps;
	// style: SVGStyleElementProps;
	// svg: SVGSVGElementProps;
	// switch: SVGSwitchElementProps;
	// symbol: SVGSymbolElementProps;
	// text: SVGTextElementProps;
	// textPath: SVGTextPathElementProps;
	// title: SVGTitleElementProps;
	// tspan: SVGTSpanElementProps;
	// use: SVGUseElementProps;
	// view: SVGViewElementProps;
}

// #endregion
