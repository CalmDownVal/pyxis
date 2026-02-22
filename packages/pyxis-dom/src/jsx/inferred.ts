/** @preserve */
import type { JsxChildren, MaybeAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis/core";

import type { PROP_MAP } from "./mapping";

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


interface NodeTypeProp<T> {
	readonly [S_NODE_TYPE]?: T;
}

interface ChildrenProp {
	readonly children?: JsxChildren;
}

interface NoChildrenProp {
	readonly children?: never;
}

// #region CSS

/** @bake */
export type CSSStyleDeclarationProps = Finalize<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<CSSStyleDeclaration>>>, CSSPropOverrides>>>;

interface CSSPropOverrides {
	anchorName: string;
	positionAnchor: string;
	positionArea: string;

	clip: never;
	fontStretch: never;
	gridColumnGap: never;
	gridGap: never;
	gridRowGap: never;
	imageOrientation: never;
	pageBreakAfter: never;
	pageBreakBefore: never;
	pageBreakInside: never;
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

// #region ARIA

/** @bake */
export type ARIAProps = Finalize<ARIAMixin>;

// #endregion

// #region HTML

type HTMLProps<T, O = {}> = Finalize<NodeTypeProp<T> & ChildrenProp & Omit<HTMLRawProps<T, O>, keyof HTMLGlobalProps>>;
type HTMLPropsNoChildren<T, O = {}> = Finalize<NodeTypeProp<T> & NoChildrenProp & Omit<HTMLRawProps<T, O>, keyof HTMLGlobalProps>>;
type HTMLRawProps<T, O> = MapProps<WrapProps<ApplyOverrides<Omit<OmitFunctions<OmitReadonly<OmitIndex<T>>>, keyof ARIAProps>, HTMLPropOverrides & O>>, typeof PROP_MAP>;

interface HTMLPropOverrides {
	part: string;

	classList: never;
	innerHTML: never;
	innerText: never;
	nodeValue: never;
	outerHTML: never;
	outerText: never;
	style: never;
	textContent: never;
}

/** @bake */
export type HTMLGlobalProps = Finalize<HTMLRawProps<HTMLElement, {}>>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLAnchorElementProps = HTMLProps<HTMLAnchorElement, {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLAreaElementProps = HTMLPropsNoChildren<HTMLAreaElement, {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLAudioElementProps = HTMLProps<HTMLAudioElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLBaseElementProps = HTMLPropsNoChildren<HTMLBaseElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLElementProps = HTMLProps<HTMLElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLQuoteElementProps = HTMLProps<HTMLQuoteElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLBodyElementProps = HTMLProps<HTMLBodyElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLBRElementProps = HTMLPropsNoChildren<HTMLBRElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLButtonElementProps = HTMLProps<HTMLButtonElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLCanvasElementProps = HTMLProps<HTMLCanvasElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableCaptionElementProps = HTMLProps<HTMLTableCaptionElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableColElementProps = HTMLPropsNoChildren<HTMLTableColElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDataElementProps = HTMLProps<HTMLDataElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDataListElementProps = HTMLProps<HTMLDataListElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLModElementProps = HTMLProps<HTMLModElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDetailsElementProps = HTMLProps<HTMLDetailsElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDialogElementProps = HTMLProps<HTMLDialogElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDivElementProps = HTMLProps<HTMLDivElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLDListElementProps = HTMLProps<HTMLDListElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLEmbedElementProps = HTMLPropsNoChildren<HTMLEmbedElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLFieldSetElementProps = HTMLProps<HTMLFieldSetElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLFormElementProps = HTMLProps<HTMLFormElement, {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLHeadingElementProps = HTMLProps<HTMLHeadingElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLHeadElementProps = HTMLProps<HTMLHeadElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLHRElementProps = HTMLPropsNoChildren<HTMLHRElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLHtmlElementProps = HTMLProps<HTMLHtmlElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLIFrameElementProps = HTMLProps<HTMLIFrameElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLImageElementProps = HTMLPropsNoChildren<HTMLImageElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLInputElementProps = HTMLPropsNoChildren<HTMLInputElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLLabelElementProps = HTMLProps<HTMLLabelElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLLegendElementProps = HTMLProps<HTMLLegendElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLLIElementProps = HTMLProps<HTMLLIElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLLinkElementProps = HTMLPropsNoChildren<HTMLLinkElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLMapElementProps = HTMLProps<HTMLMapElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLMenuElementProps = HTMLProps<HTMLMenuElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLMetaElementProps = HTMLPropsNoChildren<HTMLMetaElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLMeterElementProps = HTMLProps<HTMLMeterElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLObjectElementProps = HTMLProps<HTMLObjectElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLOListElementProps = HTMLProps<HTMLOListElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLOptGroupElementProps = HTMLProps<HTMLOptGroupElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLOptionElementProps = HTMLProps<HTMLOptionElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLOutputElementProps = HTMLProps<HTMLOutputElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLParagraphElementProps = HTMLProps<HTMLParagraphElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLPictureElementProps = HTMLProps<HTMLPictureElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLPreElementProps = HTMLProps<HTMLPreElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLProgressElementProps = HTMLProps<HTMLProgressElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLScriptElementProps = HTMLProps<HTMLScriptElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLSelectElementProps = HTMLProps<HTMLSelectElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLSlotElementProps = HTMLProps<HTMLSlotElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLSourceElementProps = HTMLPropsNoChildren<HTMLSourceElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLSpanElementProps = HTMLProps<HTMLSpanElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLStyleElementProps = HTMLProps<HTMLStyleElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableElementProps = HTMLProps<HTMLTableElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableSectionElementProps = HTMLProps<HTMLTableSectionElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableCellElementProps = HTMLProps<HTMLTableCellElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTemplateElementProps = HTMLProps<HTMLTemplateElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTextAreaElementProps = HTMLProps<HTMLTextAreaElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTimeElementProps = HTMLProps<HTMLTimeElement>;

// /**
//  * @bake
//  * @extends HTMLGlobalProps
//  */
// export type HTMLTitleElementProps = HTMLProps<HTMLTitleElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTableRowElementProps = HTMLProps<HTMLTableRowElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLTrackElementProps = HTMLPropsNoChildren<HTMLTrackElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLUListElementProps = HTMLProps<HTMLUListElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLVideoElementProps = HTMLProps<HTMLVideoElement>;

/**
 * @bake
 * @extends HTMLGlobalProps
 */
export type HTMLWbrElementProps = HTMLPropsNoChildren<HTMLElement>;

/** @preserve */
export interface HTMLIntrinsicElements {
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
	wbr: HTMLWbrElementProps;
}

// #endregion

// #region SVG

// SVG attributes on MDN:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute

/** @bake */
export type SVGGlobalProps = Finalize<WrapProps<{
	autofocus: boolean;
	class: string;
	color: string;
	display: string;
	filter: string;
	id: string;
	lang: string;
	style: string;
	tabindex: number | string;
	transform: string;
	"transform-origin": string;
}>>;

type SVGProps<T, P = {}> = Finalize<NodeTypeProp<T> & ChildrenProp & WrapProps<P>>;
type SVGPropsNoChildren<T, P = {}> = Finalize<NodeTypeProp<T> & NoChildrenProp & WrapProps<P>>;

/** @preserve */
export type SVGAccumulate = "none" | "sum";

/** @preserve */
export type SVGAdditive = "replace" | "sum";

/** @preserve */
export type SVGAlignmentBaseline = "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "top" | "center" | "bottom";

/** @preserve */
export type SVGCalcMode = "discrete" | "linear" | "paced" | "spline";

/** @preserve */
export type SVGClipRule = "nonzero" | "evenodd" | "inherit";

/** @preserve */
export type SVGColorInterpolationFilters = "auto" | "sRGB" | "linearRGB";

/** @preserve */
export type SVGCrossOrigin = "" | "anonymous" | "use-credentials";

/** @preserve */
export type SVGTextDirection = "rtl" | "ltr";

/** @preserve */
export type SVGDominantBaseline = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top";

/** @preserve */
export type SVGEdgeMode = "duplicate" | "wrap" | "none";

/** @preserve */
export type SVGFillMode = "freeze" | "remove";

/** @preserve */
export type SVGFillRule = "nonzero" | "evenodd";

/** @preserve */
export type SVGFontStyle = "normal" | "italic" | "oblique";

/** @preserve */
export type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";

/** @preserve */
export type SVGLengthAdjust = "spacing" | "spacingAndGlyphs";

/** @preserve */
export type SVGOverflow = "visible" | "hidden" | "scroll" | "auto";

/** @preserve */
export type SVGPointerEvents = "bounding-box" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none";

/** @preserve */
export type SVGRestart = "always" | "whenNotActive" | "never";

/** @preserve */
export type SVGShapeRendering = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";

/** @preserve */
export type SVGSpreadMethod = "pad" | "reflect" | "repeat";

/** @preserve */
export type SVGStrokeLineCap = "butt" | "round" | "square";

/** @preserve */
export type SVGStrokeLineJoin = "arcs" | "bevel" | "miter" | "miter-clip" | "round";

/** @preserve */
export type SVGTextAnchor = "start" | "middle" | "end";

/** @preserve */
export type SVGUnicodeBidi = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";

/** @preserve */
export type SVGVectorEffect = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";

/** @preserve */
export type SVGVisibility = "visible" | "hidden" | "collapse";

/** @preserve */
export type SVGWhiteSpace = "normal" | "pre" | "nowrap" | "pre-wrap" | "break-space" | "pre-line";

/** @preserve */
export type SVGWritingMode = "horizontal-tb" | "vertical-rl" | "vertical-lr";

/** @preserve */
export type SVGColorChannel = "R" | "G" | "B" | "A";

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGAElementProps = SVGProps<SVGAElement, {
	"clip-path": string;
	cursor: string;
	href: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	referrerpolicy: ReferrerPolicy;
	rel: string;
	requiredExtensions: string;
	systemLanguage: string;
	target: string;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGAnimateElementProps = SVGProps<SVGAnimateElement, {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	attributeName: string;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGAnimateMotionElementProps = SVGProps<SVGAnimateMotionElement, {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	path: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	rotate: number | "auto" | "auto-reverse";
	systemLanguage: string;
	to: number | string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGAnimateTransformElementProps = SVGProps<SVGAnimateTransformElement, {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	attributeName: string;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
	type: string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGCircleElementProps = SVGPropsNoChildren<SVGCircleElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	cx: number | string;
	cy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	r: number | string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGClipPathElementProps = SVGProps<SVGClipPathElement, {
	"clip-path": string;
	clipPathUnits: SVGUnits;
	mask: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGDefsElementProps = SVGProps<SVGDefsElement, {
	cursor: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGDescElementProps = SVGProps<SVGDescElement, {
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGEllipseElementProps = SVGPropsNoChildren<SVGEllipseElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	cx: number | string;
	cy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	rx: number | string;
	ry: number | string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEBlendElementProps = SVGProps<SVGFEBlendElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	mode: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEColorMatrixElementProps = SVGProps<SVGFEColorMatrixElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	type: string;
	values: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEComponentTransferElementProps = SVGProps<SVGFEComponentTransferElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFECompositeElementProps = SVGProps<SVGFECompositeElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	k1: number | string;
	k2: number | string;
	k3: number | string;
	k4: number | string;
	operator: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEConvolveMatrixElementProps = SVGProps<SVGFEConvolveMatrixElement, {
	bias: number | string;
	"color-interpolation-filters": SVGColorInterpolationFilters;
	divisor: number | string;
	edgeMode: SVGEdgeMode;
	height: number | string;
	in: string;
	kernelMatrix: string;
	kernelUnitLength: number | string;
	order: number | string;
	preserveAlpha: boolean | string;
	result: string;
	targetX: number | string;
	targetY: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEDiffuseLightingElementProps = SVGProps<SVGFEDiffuseLightingElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	diffuseConstant: number | string;
	height: number | string;
	in: string;
	kernelUnitLength: number | string;
	"lighting-color": string;
	result: string;
	surfaceScale: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEDisplacementMapElementProps = SVGProps<SVGFEDisplacementMapElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	result: string;
	scale: number | string;
	width: number | string;
	x: number | string;
	xChannelSelector: SVGColorChannel;
	y: number | string;
	yChannelSelector: SVGColorChannel;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEDistantLightElementProps = SVGProps<SVGFEDistantLightElement, {
	azimuth: number | string;
	elevation: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEDropShadowElementProps = SVGProps<SVGFEDropShadowElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	dx: number | string;
	dy: number | string;
	"flood-color": string;
	"flood-opacity": number | string;
	height: number | string;
	in: string;
	result: string;
	stdDeviation: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEFloodElementProps = SVGProps<SVGFEFloodElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	"flood-color": string;
	"flood-opacity": number | string;
	height: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEFuncAElementProps = SVGProps<SVGFEFuncAElement, {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEFuncBElementProps = SVGProps<SVGFEFuncBElement, {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEFuncGElementProps = SVGProps<SVGFEFuncGElement, {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEFuncRElementProps = SVGProps<SVGFEFuncRElement, {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEGaussianBlurElementProps = SVGProps<SVGFEGaussianBlurElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	edgeMode: SVGEdgeMode;
	height: number | string;
	in: string;
	result: string;
	stdDeviation: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEImageElementProps = SVGProps<SVGFEImageElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	href: string;
	preserveAspectRatio: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEMergeElementProps = SVGProps<SVGFEMergeElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEMergeNodeElementProps = SVGProps<SVGFEMergeNodeElement, {
	in: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEMorphologyElementProps = SVGProps<SVGFEMorphologyElement, {
	height: number | string;
	in: string;
	operator: "erode" | "dilate";
	radius: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEOffsetElementProps = SVGProps<SVGFEOffsetElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	dx: number | string;
	dy: number | string;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFEPointLightElementProps = SVGProps<SVGFEPointLightElement, {
	x: number | string;
	y: number | string;
	z: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFESpecularLightingElementProps = SVGProps<SVGFESpecularLightingElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	kernelUnitLength: number | string;
	"lighting-color": string;
	result: string;
	specularConstant: number | string;
	specularExponent: number | string;
	surfaceScale: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFESpotLightElementProps = SVGProps<SVGFESpotLightElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	limitingConeAngle: number | string;
	pointsAtX: number | string;
	pointsAtY: number | string;
	pointsAtZ: number | string;
	specularExponent: number | string;
	x: number | string;
	y: number | string;
	z: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFETileElementProps = SVGProps<SVGFETileElement, {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFETurbulenceElementProps = SVGProps<SVGFETurbulenceElement, {
	baseFrequency: number | string;
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	numOctaves: number | string;
	result: string;
	seed: number | string;
	stitchTiles: "noStitch" | "stitch";
	type: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGFilterElementProps = SVGProps<SVGFilterElement, {
	filterUnits: SVGUnits;
	height: number | string;
	primitiveUnits: SVGUnits;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGForeignObjectElementProps = SVGProps<SVGForeignObjectElement, {
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGGElementProps = SVGProps<SVGGElement, {
	"clip-path": string;
	cursor: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGImageElementProps = SVGPropsNoChildren<SVGImageElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	crossorigin: SVGCrossOrigin;
	cursor: string;
	decoding: "auto" | "sync" | "async";
	height: number | string;
	href: string;
	"image-rendering": "auto" | "optimizeSpeed" | "optimizeQuality";
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGLineElementProps = SVGPropsNoChildren<SVGLineElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	orient: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	x1: number | string;
	x2: number | string;
	y1: number | string;
	y2: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGLinearGradientElementProps = SVGProps<SVGLinearGradientElement, {
	gradientTransform: string;
	gradientUnits: SVGUnits;
	href: string;
	spreadMethod: SVGSpreadMethod;
	x1: number | string;
	x2: number | string;
	y1: number | string;
	y2: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGMarkerElementProps = SVGProps<SVGMarkerElement, {
	"clip-path": string;
	cursor: string;
	markerHeight: number | string;
	markerUnits: "userSpaceOnUse" | "strokeWidth";
	markerWidth: number | string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	refX: number | string;
	refY: number | string;
	viewBox: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGMaskElementProps = SVGProps<SVGMaskElement, {
	"clip-path": string;
	cursor: string;
	height: number | string;
	mask: string;
	"mask-type": "alpha" | "luminance";
	maskContentUnits: SVGUnits;
	maskUnits: SVGUnits;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGMetadataElementProps = SVGProps<SVGMetadataElement, {
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGMPathElementProps = SVGProps<SVGMPathElement, {
	href: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGPathElementProps = SVGPropsNoChildren<SVGPathElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	d: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGPatternElementProps = SVGProps<SVGPatternElement, {
	"clip-path": string;
	cursor: string;
	height: number | string;
	href: string;
	mask: string;
	overflow: SVGOverflow;
	patternContentUnits: SVGUnits;
	patternTransform: string;
	patternUnits: SVGUnits;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	systemLanguage: string;
	viewBox: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGPolygonElementProps = SVGPropsNoChildren<SVGPolygonElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	points: string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGPolylineElementProps = SVGPropsNoChildren<SVGPolylineElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	points: string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGRadialGradientElementProps = SVGProps<SVGRadialGradientElement, {
	cx: number | string;
	cy: number | string;
	fr: number | string;
	fx: number | string;
	fy: number | string;
	gradientTransform: string;
	gradientUnits: SVGUnits;
	href: string;
	r: number | string;
	spreadMethod: SVGSpreadMethod;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGRectElementProps = SVGPropsNoChildren<SVGRectElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	height: number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	rx: number | string;
	ry: number | string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

// /**
//  * @bake
//  * @extends SVGGlobalProps
//  */
// export type SVGScriptElementProps = SVGProps<SVGScriptElement, {
// 	crossorigin: SVGCrossOrigin;
// 	href: string;
// 	type: string;
// }>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGSetElementProps = SVGProps<SVGSetElement, {
	attributeName: string;
	begin: string;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	href: string;
	keyPoints: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGStopElementProps = SVGPropsNoChildren<SVGStopElement, {
	"stop-color": string;
	"stop-opacity": number | string;
}>;

// /**
//  * @bake
//  * @extends SVGGlobalProps
//  */
// export type SVGStyleElementProps = SVGProps<SVGStyleElement, {
// 	media: string;
// 	type: string;
// }>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGSVGElementProps = SVGProps<SVGSVGElement, {
	"clip-path": string;
	cursor: string;
	fill: string;
	height: number | string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	stroke: string;
	systemLanguage: string;
	viewBox: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGSwitchElementProps = SVGProps<SVGSwitchElement, {
	cursor: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGSymbolElementProps = SVGProps<SVGSymbolElement, {
	"clip-path": string;
	cursor: string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	viewBox: string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGTextElementProps = SVGProps<SVGTextElement, {
	"alignment-baseline": SVGAlignmentBaseline;
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	dx: number | string;
	dy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"paint-order": string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	"text-rendering": "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGTextPathElementProps = SVGProps<SVGTextPathElement, {
	"alignment-baseline": SVGAlignmentBaseline;
	"baseline-shift": string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	href: string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	method: "align" | "stretch";
	opacity: number | string;
	"paint-order": string;
	path: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	spacing: "auto" | "exact";
	startOffset: number | string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGTitleElementProps = SVGProps<SVGTitleElement, {
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGTSpanElementProps = SVGProps<SVGTSpanElement, {
	"alignment-baseline": SVGAlignmentBaseline;
	"baseline-shift": string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	dx: number | string;
	dy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	opacity: number | string;
	"paint-order": string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGUseElementProps = SVGPropsNoChildren<SVGUseElement, {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	height: number | string;
	href: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGGlobalProps
 */
export type SVGViewElementProps = SVGProps<SVGViewElement, {
	preserveAspectRatio: string;
	viewBox: string;
}>;

/** @preserve */
export interface SVGIntrinsicElements {
	animate: SVGAnimateElementProps;
	animateMotion: SVGAnimateMotionElementProps;
	animateTransform: SVGAnimateTransformElementProps;
	circle: SVGCircleElementProps;
	clipPath: SVGClipPathElementProps;
	defs: SVGDefsElementProps;
	desc: SVGDescElementProps;
	ellipse: SVGEllipseElementProps;
	feBlend: SVGFEBlendElementProps;
	feColorMatrix: SVGFEColorMatrixElementProps;
	feComponentTransfer: SVGFEComponentTransferElementProps;
	feComposite: SVGFECompositeElementProps;
	feConvolveMatrix: SVGFEConvolveMatrixElementProps;
	feDiffuseLighting: SVGFEDiffuseLightingElementProps;
	feDisplacementMap: SVGFEDisplacementMapElementProps;
	feDistantLight: SVGFEDistantLightElementProps;
	feDropShadow: SVGFEDropShadowElementProps;
	feFlood: SVGFEFloodElementProps;
	feFuncA: SVGFEFuncAElementProps;
	feFuncB: SVGFEFuncBElementProps;
	feFuncG: SVGFEFuncGElementProps;
	feFuncR: SVGFEFuncRElementProps;
	feGaussianBlur: SVGFEGaussianBlurElementProps;
	feImage: SVGFEImageElementProps;
	feMerge: SVGFEMergeElementProps;
	feMergeNode: SVGFEMergeNodeElementProps;
	feMorphology: SVGFEMorphologyElementProps;
	feOffset: SVGFEOffsetElementProps;
	fePointLight: SVGFEPointLightElementProps;
	feSpecularLighting: SVGFESpecularLightingElementProps;
	feSpotLight: SVGFESpotLightElementProps;
	feTile: SVGFETileElementProps;
	feTurbulence: SVGFETurbulenceElementProps;
	filter: SVGFilterElementProps;
	foreignObject: SVGForeignObjectElementProps;
	g: SVGGElementProps;
	image: SVGImageElementProps;
	line: SVGLineElementProps;
	linearGradient: SVGLinearGradientElementProps;
	marker: SVGMarkerElementProps;
	mask: SVGMaskElementProps;
	metadata: SVGMetadataElementProps;
	mpath: SVGMPathElementProps;
	path: SVGPathElementProps;
	pattern: SVGPatternElementProps;
	polygon: SVGPolygonElementProps;
	polyline: SVGPolylineElementProps;
	radialGradient: SVGRadialGradientElementProps;
	rect: SVGRectElementProps;
	// script: SVGScriptElementProps;
	set: SVGSetElementProps;
	stop: SVGStopElementProps;
	// style: SVGStyleElementProps;
	switch: SVGSwitchElementProps;
	symbol: SVGSymbolElementProps;
	text: SVGTextElementProps;
	textPath: SVGTextPathElementProps;
	title: SVGTitleElementProps;
	tspan: SVGTSpanElementProps;
	use: SVGUseElementProps;
	view: SVGViewElementProps;

	// intentionally uppercase, handled by the Svg component
	Svg: SVGSVGElementProps;
}

// #endregion

// #region MathML

// MathML attributes on MDN:
// https://developer.mozilla.org/en-US/docs/Web/MathML/Reference/Global_attributes

/** @bake */
export type MathMLGlobalProps = Finalize<WrapProps<{
	dir: "ltr" | "rtl";
	displaystyle: boolean;
	mathbackground: string;
	mathcolor: string;
	mathsize: string;
	scriptlevel: string;
}>>;

type MathMLProps<T, P = {}> = Finalize<NodeTypeProp<T> & ChildrenProp & WrapProps<P>>;
type MathMLPropsNoChildren<T, P = {}> = Finalize<NodeTypeProp<T> & NoChildrenProp & WrapProps<P>>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MathMLElementProps = MathMLProps<MathMLElement>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MathMLMathElementProps = MathMLProps<MathMLElement, {
	display: "block" | "inline";
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLFracElementProps = MathMLPropsNoChildren<MathMLElement, {
	linethickness: string;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLIElementProps = MathMLProps<MathMLElement, {
	mathvariant: "normal";
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLOElementProps = MathMLProps<MathMLElement, {
	fence: boolean;
	form: "prefix" | "infix" | "postfix";
	largeop: boolean;
	lspace: string;
	maxsize: string;
	minsize: string;
	movablelimits: boolean;
	rspace: string;
	separator: boolean;
	stretchy: boolean;
	symmetric: boolean;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLOverElementProps = MathMLProps<MathMLElement, {
	accent: boolean;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLPaddedElementProps = MathMLProps<MathMLElement, {
	depth: string;
	height: string;
	lspace: string;
	voffset: string;
	width: string;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLRowElementProps = MathMLPropsNoChildren<MathMLElement>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLSpaceElementProps = MathMLProps<MathMLElement, {
	depth: string;
	height: string;
	width: string;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLTDElementProps = MathMLProps<MathMLElement, {
	columnspan: number | string;
	rowspan: number | string;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLTextElementProps = MathMLPropsNoChildren<MathMLElement>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLUnderElementProps = MathMLProps<MathMLElement, {
	accentunder: boolean;
}>;

/**
 * @bake
 * @extends MathMLGlobalProps
 */
export type MatMLUnderOverElementProps = MathMLProps<MathMLElement, {
	accent: boolean;
	accentunder: boolean;
}>;

/** @preserve */
export interface MathMLIntrinsicElements {
	merror: MathMLElementProps;
	mfrac: MatMLFracElementProps;
	mi: MatMLIElementProps;
	mmultiscripts: MathMLElementProps;
	mn: MathMLElementProps;
	mo: MatMLOElementProps;
	mover: MatMLOverElementProps;
	mpadded: MatMLPaddedElementProps;
	mphantom: MathMLElementProps;
	mprescripts: MathMLElementProps;
	mroot: MathMLElementProps;
	mrow: MatMLRowElementProps;
	ms: MathMLElementProps;
	mspace: MatMLSpaceElementProps;
	msqrt: MathMLElementProps;
	mstyle: MathMLElementProps;
	msub: MathMLElementProps;
	msup: MathMLElementProps;
	msubsup: MathMLElementProps;
	mtable: MathMLElementProps;
	mtd: MatMLTDElementProps;
	mtext: MatMLTextElementProps;
	mtr: MathMLElementProps;
	munder: MatMLUnderElementProps;
	munderover: MatMLUnderOverElementProps;

	// intentionally uppercase, handled by the MathML component
	MathML: MathMLMathElementProps;

	// difficult to support due to the inclusion of extra XML namespaces:
	// - semantics
	// - annotation
	// - annotation-xml
}

// #endregion

/**
 * describes the props of all usable DOM elements
 * @preserve
 */
export interface IntrinsicElements extends HTMLIntrinsicElements, SVGIntrinsicElements, MathMLIntrinsicElements {
	a: HTMLAnchorElementProps | SVGAElementProps;
}
