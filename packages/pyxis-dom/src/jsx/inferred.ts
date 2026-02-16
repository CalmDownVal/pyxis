/** @preserve */
import type { JsxChildren, MaybeAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis";

import type { PROP_MAP } from "./mapping";

// TODO: improve SVG support
// TODO: add MathML support

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

type HTMLMinProps<T> = Finalize<Omit<{ readonly [S_NODE_TYPE]?: T } & HTMLRawProps<T>, keyof HTMLBaseProps>>;
type HTMLRawProps<T> = MapProps<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<T>>>, HTMLPropOverrides>>, typeof PROP_MAP>;

/** @bake */
type HTMLBaseProps = Finalize<HTMLRawProps<HTMLElement>>;

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

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLAnchorElementProps = HTMLMinProps<HTMLAnchorElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLAreaElementProps = HTMLMinProps<HTMLAreaElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLAudioElementProps = HTMLMinProps<HTMLAudioElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLBaseElementProps = HTMLMinProps<HTMLBaseElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLElementProps = HTMLMinProps<HTMLAnchorElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLQuoteElementProps = HTMLMinProps<HTMLQuoteElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLBodyElementProps = HTMLProps<HTMLBodyElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLBRElementProps = HTMLMinProps<HTMLBRElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLButtonElementProps = HTMLMinProps<HTMLButtonElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLCanvasElementProps = HTMLMinProps<HTMLCanvasElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableCaptionElementProps = HTMLMinProps<HTMLTableCaptionElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableColElementProps = HTMLMinProps<HTMLTableColElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDataElementProps = HTMLMinProps<HTMLDataElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDataListElementProps = HTMLMinProps<HTMLDataListElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLModElementProps = HTMLMinProps<HTMLModElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDetailsElementProps = HTMLMinProps<HTMLDetailsElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDialogElementProps = HTMLMinProps<HTMLDialogElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDivElementProps = HTMLMinProps<HTMLDivElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLDListElementProps = HTMLMinProps<HTMLDListElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLEmbedElementProps = HTMLMinProps<HTMLEmbedElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLFieldSetElementProps = HTMLMinProps<HTMLFieldSetElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLFormElementProps = HTMLMinProps<HTMLFormElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLHeadingElementProps = HTMLMinProps<HTMLHeadingElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLHeadElementProps = HTMLProps<HTMLHeadElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLHRElementProps = HTMLMinProps<HTMLHRElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLHtmlElementProps = HTMLProps<HTMLHtmlElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLIFrameElementProps = HTMLMinProps<HTMLIFrameElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLImageElementProps = HTMLMinProps<HTMLImageElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLInputElementProps = HTMLMinProps<HTMLInputElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLLabelElementProps = HTMLMinProps<HTMLLabelElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLLegendElementProps = HTMLMinProps<HTMLLegendElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLLIElementProps = HTMLMinProps<HTMLLIElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLLinkElementProps = HTMLProps<HTMLLinkElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLMapElementProps = HTMLMinProps<HTMLMapElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLMenuElementProps = HTMLMinProps<HTMLMenuElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLMetaElementProps = HTMLProps<HTMLMetaElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLMeterElementProps = HTMLMinProps<HTMLMeterElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLObjectElementProps = HTMLMinProps<HTMLObjectElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLOListElementProps = HTMLMinProps<HTMLOListElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLOptGroupElementProps = HTMLMinProps<HTMLOptGroupElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLOptionElementProps = HTMLMinProps<HTMLOptionElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLOutputElementProps = HTMLMinProps<HTMLOutputElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLParagraphElementProps = HTMLMinProps<HTMLParagraphElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLPictureElementProps = HTMLMinProps<HTMLPictureElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLPreElementProps = HTMLMinProps<HTMLPreElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLProgressElementProps = HTMLMinProps<HTMLProgressElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLScriptElementProps = HTMLProps<HTMLScriptElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLSelectElementProps = HTMLMinProps<HTMLSelectElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLSlotElementProps = HTMLMinProps<HTMLSlotElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLSourceElementProps = HTMLMinProps<HTMLSourceElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLSpanElementProps = HTMLMinProps<HTMLSpanElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLStyleElementProps = HTMLProps<HTMLStyleElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableElementProps = HTMLMinProps<HTMLTableElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableSectionElementProps = HTMLMinProps<HTMLTableSectionElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableCellElementProps = HTMLMinProps<HTMLTableCellElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTemplateElementProps = HTMLMinProps<HTMLTemplateElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTextAreaElementProps = HTMLMinProps<HTMLTextAreaElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTimeElementProps = HTMLMinProps<HTMLTimeElement>;

// /**
//  * @bake
//  * @extends HTMLBaseProps
//  */
// export type HTMLTitleElementProps = HTMLProps<HTMLTitleElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTableRowElementProps = HTMLMinProps<HTMLTableRowElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLTrackElementProps = HTMLMinProps<HTMLTrackElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLUListElementProps = HTMLMinProps<HTMLUListElement>;

/**
 * @bake
 * @extends HTMLBaseProps
 */
export type HTMLVideoElementProps = HTMLMinProps<HTMLVideoElement>;

// #endregion

// #region SVG

type SVGMinProps<T> = Finalize<Omit<{ readonly [S_NODE_TYPE]?: T } & SVGRawProps<T>, keyof SVGBaseProps>>;
type SVGRawProps<T> = MapProps<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<T>>>, SVGPropOverrides>>, typeof PROP_MAP>;

/** @bake */
type SVGBaseProps = Finalize<SVGRawProps<SVGElement>>;

interface SVGPropOverrides {
	children: JsxChildren;
	classList: never;
	innerHTML: never;
	nodeValue: never;
	outerHTML: never;
	part: string;
	relList: string;
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

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGAElementProps = SVGMinProps<SVGAElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGAnimateElementProps = SVGMinProps<SVGAnimateElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGAnimateMotionElementProps = SVGMinProps<SVGAnimateMotionElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGAnimateTransformElementProps = SVGMinProps<SVGAnimateTransformElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGCircleElementProps = SVGMinProps<SVGCircleElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGClipPathElementProps = SVGMinProps<SVGClipPathElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGDefsElementProps = SVGMinProps<SVGDefsElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGDescElementProps = SVGMinProps<SVGDescElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGEllipseElementProps = SVGMinProps<SVGEllipseElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEBlendElementProps = SVGMinProps<SVGFEBlendElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEColorMatrixElementProps = SVGMinProps<SVGFEColorMatrixElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEComponentTransferElementProps = SVGMinProps<SVGFEComponentTransferElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFECompositeElementProps = SVGMinProps<SVGFECompositeElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEConvolveMatrixElementProps = SVGMinProps<SVGFEConvolveMatrixElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEDiffuseLightingElementProps = SVGMinProps<SVGFEDiffuseLightingElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEDisplacementMapElementProps = SVGMinProps<SVGFEDisplacementMapElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEDistantLightElementProps = SVGMinProps<SVGFEDistantLightElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEDropShadowElementProps = SVGMinProps<SVGFEDropShadowElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEFloodElementProps = SVGMinProps<SVGFEFloodElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEFuncAElementProps = SVGMinProps<SVGFEFuncAElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEFuncBElementProps = SVGMinProps<SVGFEFuncBElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEFuncGElementProps = SVGMinProps<SVGFEFuncGElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEFuncRElementProps = SVGMinProps<SVGFEFuncRElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEGaussianBlurElementProps = SVGMinProps<SVGFEGaussianBlurElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEImageElementProps = SVGMinProps<SVGFEImageElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEMergeElementProps = SVGMinProps<SVGFEMergeElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEMergeNodeElementProps = SVGMinProps<SVGFEMergeNodeElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEMorphologyElementProps = SVGMinProps<SVGFEMorphologyElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEOffsetElementProps = SVGMinProps<SVGFEOffsetElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFEPointLightElementProps = SVGMinProps<SVGFEPointLightElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFESpecularLightingElementProps = SVGMinProps<SVGFESpecularLightingElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFESpotLightElementProps = SVGMinProps<SVGFESpotLightElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFETileElementProps = SVGMinProps<SVGFETileElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFETurbulenceElementProps = SVGMinProps<SVGFETurbulenceElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGFilterElementProps = SVGMinProps<SVGFilterElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGForeignObjectElementProps = SVGMinProps<SVGForeignObjectElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGGElementProps = SVGMinProps<SVGGElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGImageElementProps = SVGMinProps<SVGImageElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGLineElementProps = SVGMinProps<SVGLineElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGLinearGradientElementProps = SVGMinProps<SVGLinearGradientElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGMarkerElementProps = SVGMinProps<SVGMarkerElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGMaskElementProps = SVGMinProps<SVGMaskElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGMetadataElementProps = SVGMinProps<SVGMetadataElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGMPathElementProps = SVGMinProps<SVGMPathElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGPathElementProps = SVGMinProps<SVGPathElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGPatternElementProps = SVGMinProps<SVGPatternElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGPolygonElementProps = SVGMinProps<SVGPolygonElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGPolylineElementProps = SVGMinProps<SVGPolylineElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGRadialGradientElementProps = SVGMinProps<SVGRadialGradientElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGRectElementProps = SVGMinProps<SVGRectElement>;

// /**
//  * @bake
//  * @extends SVGBaseProps
//  */
// export type SVGScriptElementProps = SVGMinProps<SVGScriptElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGSetElementProps = SVGMinProps<SVGSetElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGStopElementProps = SVGMinProps<SVGStopElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGStyleElementProps = SVGMinProps<SVGStyleElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGSVGElementProps = SVGMinProps<SVGSVGElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGSwitchElementProps = SVGMinProps<SVGSwitchElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGSymbolElementProps = SVGMinProps<SVGSymbolElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGTextElementProps = SVGMinProps<SVGTextElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGTextPathElementProps = SVGMinProps<SVGTextPathElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGTitleElementProps = SVGMinProps<SVGTitleElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGTSpanElementProps = SVGMinProps<SVGTSpanElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGUseElementProps = SVGMinProps<SVGUseElement>;

/**
 * @bake
 * @extends SVGBaseProps
 */
export type SVGViewElementProps = SVGMinProps<SVGViewElement>;

// #endregion

// #region IntrinsicElements

/**
 * describes the props of all usable DOM elements
 * @preserve
 */
export interface IntrinsicElements {
	a: HTMLAnchorElementProps | SVGAElementProps;


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
	style: SVGStyleElementProps;
	// svg: SVGSVGBaseProps;
	switch: SVGSwitchElementProps;
	symbol: SVGSymbolElementProps;
	text: SVGTextElementProps;
	textPath: SVGTextPathElementProps;
	title: SVGTitleElementProps;
	tspan: SVGTSpanElementProps;
	use: SVGUseElementProps;
	view: SVGViewElementProps;
}

// #endregion
