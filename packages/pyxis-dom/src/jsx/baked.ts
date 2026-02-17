// baked types, do not modify as changes will be lost
// source file: inferred.ts

import type { JsxChildren, MaybeAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis";

export interface CSSStyleDeclarationProps {
	readonly accentColor?: MaybeAtom<string>;
	readonly alignContent?: MaybeAtom<string>;
	readonly alignItems?: MaybeAtom<string>;
	readonly alignSelf?: MaybeAtom<string>;
	readonly alignmentBaseline?: MaybeAtom<string>;
	readonly all?: MaybeAtom<string>;
	readonly animation?: MaybeAtom<string>;
	readonly animationComposition?: MaybeAtom<string>;
	readonly animationDelay?: MaybeAtom<string>;
	readonly animationDirection?: MaybeAtom<string>;
	readonly animationDuration?: MaybeAtom<string>;
	readonly animationFillMode?: MaybeAtom<string>;
	readonly animationIterationCount?: MaybeAtom<string>;
	readonly animationName?: MaybeAtom<string>;
	readonly animationPlayState?: MaybeAtom<string>;
	readonly animationTimingFunction?: MaybeAtom<string>;
	readonly appearance?: MaybeAtom<string>;
	readonly aspectRatio?: MaybeAtom<string>;
	readonly backdropFilter?: MaybeAtom<string>;
	readonly backfaceVisibility?: MaybeAtom<string>;
	readonly background?: MaybeAtom<string>;
	readonly backgroundAttachment?: MaybeAtom<string>;
	readonly backgroundBlendMode?: MaybeAtom<string>;
	readonly backgroundClip?: MaybeAtom<string>;
	readonly backgroundColor?: MaybeAtom<string>;
	readonly backgroundImage?: MaybeAtom<string>;
	readonly backgroundOrigin?: MaybeAtom<string>;
	readonly backgroundPosition?: MaybeAtom<string>;
	readonly backgroundPositionX?: MaybeAtom<string>;
	readonly backgroundPositionY?: MaybeAtom<string>;
	readonly backgroundRepeat?: MaybeAtom<string>;
	readonly backgroundSize?: MaybeAtom<string>;
	readonly baselineShift?: MaybeAtom<string>;
	readonly baselineSource?: MaybeAtom<string>;
	readonly blockSize?: MaybeAtom<string>;
	readonly border?: MaybeAtom<string>;
	readonly borderBlock?: MaybeAtom<string>;
	readonly borderBlockColor?: MaybeAtom<string>;
	readonly borderBlockEnd?: MaybeAtom<string>;
	readonly borderBlockEndColor?: MaybeAtom<string>;
	readonly borderBlockEndStyle?: MaybeAtom<string>;
	readonly borderBlockEndWidth?: MaybeAtom<string>;
	readonly borderBlockStart?: MaybeAtom<string>;
	readonly borderBlockStartColor?: MaybeAtom<string>;
	readonly borderBlockStartStyle?: MaybeAtom<string>;
	readonly borderBlockStartWidth?: MaybeAtom<string>;
	readonly borderBlockStyle?: MaybeAtom<string>;
	readonly borderBlockWidth?: MaybeAtom<string>;
	readonly borderBottom?: MaybeAtom<string>;
	readonly borderBottomColor?: MaybeAtom<string>;
	readonly borderBottomLeftRadius?: MaybeAtom<string>;
	readonly borderBottomRightRadius?: MaybeAtom<string>;
	readonly borderBottomStyle?: MaybeAtom<string>;
	readonly borderBottomWidth?: MaybeAtom<string>;
	readonly borderCollapse?: MaybeAtom<string>;
	readonly borderColor?: MaybeAtom<string>;
	readonly borderEndEndRadius?: MaybeAtom<string>;
	readonly borderEndStartRadius?: MaybeAtom<string>;
	readonly borderImage?: MaybeAtom<string>;
	readonly borderImageOutset?: MaybeAtom<string>;
	readonly borderImageRepeat?: MaybeAtom<string>;
	readonly borderImageSlice?: MaybeAtom<string>;
	readonly borderImageSource?: MaybeAtom<string>;
	readonly borderImageWidth?: MaybeAtom<string>;
	readonly borderInline?: MaybeAtom<string>;
	readonly borderInlineColor?: MaybeAtom<string>;
	readonly borderInlineEnd?: MaybeAtom<string>;
	readonly borderInlineEndColor?: MaybeAtom<string>;
	readonly borderInlineEndStyle?: MaybeAtom<string>;
	readonly borderInlineEndWidth?: MaybeAtom<string>;
	readonly borderInlineStart?: MaybeAtom<string>;
	readonly borderInlineStartColor?: MaybeAtom<string>;
	readonly borderInlineStartStyle?: MaybeAtom<string>;
	readonly borderInlineStartWidth?: MaybeAtom<string>;
	readonly borderInlineStyle?: MaybeAtom<string>;
	readonly borderInlineWidth?: MaybeAtom<string>;
	readonly borderLeft?: MaybeAtom<string>;
	readonly borderLeftColor?: MaybeAtom<string>;
	readonly borderLeftStyle?: MaybeAtom<string>;
	readonly borderLeftWidth?: MaybeAtom<string>;
	readonly borderRadius?: MaybeAtom<string>;
	readonly borderRight?: MaybeAtom<string>;
	readonly borderRightColor?: MaybeAtom<string>;
	readonly borderRightStyle?: MaybeAtom<string>;
	readonly borderRightWidth?: MaybeAtom<string>;
	readonly borderSpacing?: MaybeAtom<string>;
	readonly borderStartEndRadius?: MaybeAtom<string>;
	readonly borderStartStartRadius?: MaybeAtom<string>;
	readonly borderStyle?: MaybeAtom<string>;
	readonly borderTop?: MaybeAtom<string>;
	readonly borderTopColor?: MaybeAtom<string>;
	readonly borderTopLeftRadius?: MaybeAtom<string>;
	readonly borderTopRightRadius?: MaybeAtom<string>;
	readonly borderTopStyle?: MaybeAtom<string>;
	readonly borderTopWidth?: MaybeAtom<string>;
	readonly borderWidth?: MaybeAtom<string>;
	readonly bottom?: MaybeAtom<string>;
	readonly boxDecorationBreak?: MaybeAtom<string>;
	readonly boxShadow?: MaybeAtom<string>;
	readonly boxSizing?: MaybeAtom<string>;
	readonly breakAfter?: MaybeAtom<string>;
	readonly breakBefore?: MaybeAtom<string>;
	readonly breakInside?: MaybeAtom<string>;
	readonly captionSide?: MaybeAtom<string>;
	readonly caretColor?: MaybeAtom<string>;
	readonly clear?: MaybeAtom<string>;
	readonly clipPath?: MaybeAtom<string>;
	readonly clipRule?: MaybeAtom<string>;
	readonly color?: MaybeAtom<string>;
	readonly colorInterpolation?: MaybeAtom<string>;
	readonly colorInterpolationFilters?: MaybeAtom<string>;
	readonly colorScheme?: MaybeAtom<string>;
	readonly columnCount?: MaybeAtom<string>;
	readonly columnFill?: MaybeAtom<string>;
	readonly columnGap?: MaybeAtom<string>;
	readonly columnRule?: MaybeAtom<string>;
	readonly columnRuleColor?: MaybeAtom<string>;
	readonly columnRuleStyle?: MaybeAtom<string>;
	readonly columnRuleWidth?: MaybeAtom<string>;
	readonly columnSpan?: MaybeAtom<string>;
	readonly columnWidth?: MaybeAtom<string>;
	readonly columns?: MaybeAtom<string>;
	readonly contain?: MaybeAtom<string>;
	readonly containIntrinsicBlockSize?: MaybeAtom<string>;
	readonly containIntrinsicHeight?: MaybeAtom<string>;
	readonly containIntrinsicInlineSize?: MaybeAtom<string>;
	readonly containIntrinsicSize?: MaybeAtom<string>;
	readonly containIntrinsicWidth?: MaybeAtom<string>;
	readonly container?: MaybeAtom<string>;
	readonly containerName?: MaybeAtom<string>;
	readonly containerType?: MaybeAtom<string>;
	readonly content?: MaybeAtom<string>;
	readonly contentVisibility?: MaybeAtom<string>;
	readonly counterIncrement?: MaybeAtom<string>;
	readonly counterReset?: MaybeAtom<string>;
	readonly counterSet?: MaybeAtom<string>;
	readonly cssFloat?: MaybeAtom<string>;
	readonly cssText?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string>;
	readonly cy?: MaybeAtom<string>;
	readonly d?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<string>;
	readonly display?: MaybeAtom<string>;
	readonly dominantBaseline?: MaybeAtom<string>;
	readonly emptyCells?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly fillOpacity?: MaybeAtom<string>;
	readonly fillRule?: MaybeAtom<string>;
	readonly filter?: MaybeAtom<string>;
	readonly flex?: MaybeAtom<string>;
	readonly flexBasis?: MaybeAtom<string>;
	readonly flexDirection?: MaybeAtom<string>;
	readonly flexFlow?: MaybeAtom<string>;
	readonly flexGrow?: MaybeAtom<string>;
	readonly flexShrink?: MaybeAtom<string>;
	readonly flexWrap?: MaybeAtom<string>;
	readonly float?: MaybeAtom<string>;
	readonly floodColor?: MaybeAtom<string>;
	readonly floodOpacity?: MaybeAtom<string>;
	readonly font?: MaybeAtom<string>;
	readonly fontFamily?: MaybeAtom<string>;
	readonly fontFeatureSettings?: MaybeAtom<string>;
	readonly fontKerning?: MaybeAtom<string>;
	readonly fontOpticalSizing?: MaybeAtom<string>;
	readonly fontPalette?: MaybeAtom<string>;
	readonly fontSize?: MaybeAtom<string>;
	readonly fontSizeAdjust?: MaybeAtom<string>;
	readonly fontStyle?: MaybeAtom<string>;
	readonly fontSynthesis?: MaybeAtom<string>;
	readonly fontSynthesisSmallCaps?: MaybeAtom<string>;
	readonly fontSynthesisStyle?: MaybeAtom<string>;
	readonly fontSynthesisWeight?: MaybeAtom<string>;
	readonly fontVariant?: MaybeAtom<string>;
	readonly fontVariantAlternates?: MaybeAtom<string>;
	readonly fontVariantCaps?: MaybeAtom<string>;
	readonly fontVariantEastAsian?: MaybeAtom<string>;
	readonly fontVariantLigatures?: MaybeAtom<string>;
	readonly fontVariantNumeric?: MaybeAtom<string>;
	readonly fontVariantPosition?: MaybeAtom<string>;
	readonly fontVariationSettings?: MaybeAtom<string>;
	readonly fontWeight?: MaybeAtom<string>;
	readonly forcedColorAdjust?: MaybeAtom<string>;
	readonly gap?: MaybeAtom<string>;
	readonly grid?: MaybeAtom<string>;
	readonly gridArea?: MaybeAtom<string>;
	readonly gridAutoColumns?: MaybeAtom<string>;
	readonly gridAutoFlow?: MaybeAtom<string>;
	readonly gridAutoRows?: MaybeAtom<string>;
	readonly gridColumn?: MaybeAtom<string>;
	readonly gridColumnEnd?: MaybeAtom<string>;
	readonly gridColumnStart?: MaybeAtom<string>;
	readonly gridRow?: MaybeAtom<string>;
	readonly gridRowEnd?: MaybeAtom<string>;
	readonly gridRowStart?: MaybeAtom<string>;
	readonly gridTemplate?: MaybeAtom<string>;
	readonly gridTemplateAreas?: MaybeAtom<string>;
	readonly gridTemplateColumns?: MaybeAtom<string>;
	readonly gridTemplateRows?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly hyphenateCharacter?: MaybeAtom<string>;
	readonly hyphenateLimitChars?: MaybeAtom<string>;
	readonly hyphens?: MaybeAtom<string>;
	readonly imageRendering?: MaybeAtom<string>;
	readonly inlineSize?: MaybeAtom<string>;
	readonly inset?: MaybeAtom<string>;
	readonly insetBlock?: MaybeAtom<string>;
	readonly insetBlockEnd?: MaybeAtom<string>;
	readonly insetBlockStart?: MaybeAtom<string>;
	readonly insetInline?: MaybeAtom<string>;
	readonly insetInlineEnd?: MaybeAtom<string>;
	readonly insetInlineStart?: MaybeAtom<string>;
	readonly isolation?: MaybeAtom<string>;
	readonly justifyContent?: MaybeAtom<string>;
	readonly justifyItems?: MaybeAtom<string>;
	readonly justifySelf?: MaybeAtom<string>;
	readonly left?: MaybeAtom<string>;
	readonly letterSpacing?: MaybeAtom<string>;
	readonly lightingColor?: MaybeAtom<string>;
	readonly lineBreak?: MaybeAtom<string>;
	readonly lineHeight?: MaybeAtom<string>;
	readonly listStyle?: MaybeAtom<string>;
	readonly listStyleImage?: MaybeAtom<string>;
	readonly listStylePosition?: MaybeAtom<string>;
	readonly listStyleType?: MaybeAtom<string>;
	readonly margin?: MaybeAtom<string>;
	readonly marginBlock?: MaybeAtom<string>;
	readonly marginBlockEnd?: MaybeAtom<string>;
	readonly marginBlockStart?: MaybeAtom<string>;
	readonly marginBottom?: MaybeAtom<string>;
	readonly marginInline?: MaybeAtom<string>;
	readonly marginInlineEnd?: MaybeAtom<string>;
	readonly marginInlineStart?: MaybeAtom<string>;
	readonly marginLeft?: MaybeAtom<string>;
	readonly marginRight?: MaybeAtom<string>;
	readonly marginTop?: MaybeAtom<string>;
	readonly marker?: MaybeAtom<string>;
	readonly markerEnd?: MaybeAtom<string>;
	readonly markerMid?: MaybeAtom<string>;
	readonly markerStart?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly maskClip?: MaybeAtom<string>;
	readonly maskComposite?: MaybeAtom<string>;
	readonly maskImage?: MaybeAtom<string>;
	readonly maskMode?: MaybeAtom<string>;
	readonly maskOrigin?: MaybeAtom<string>;
	readonly maskPosition?: MaybeAtom<string>;
	readonly maskRepeat?: MaybeAtom<string>;
	readonly maskSize?: MaybeAtom<string>;
	readonly maskType?: MaybeAtom<string>;
	readonly mathDepth?: MaybeAtom<string>;
	readonly mathStyle?: MaybeAtom<string>;
	readonly maxBlockSize?: MaybeAtom<string>;
	readonly maxHeight?: MaybeAtom<string>;
	readonly maxInlineSize?: MaybeAtom<string>;
	readonly maxWidth?: MaybeAtom<string>;
	readonly minBlockSize?: MaybeAtom<string>;
	readonly minHeight?: MaybeAtom<string>;
	readonly minInlineSize?: MaybeAtom<string>;
	readonly minWidth?: MaybeAtom<string>;
	readonly mixBlendMode?: MaybeAtom<string>;
	readonly objectFit?: MaybeAtom<string>;
	readonly objectPosition?: MaybeAtom<string>;
	readonly offset?: MaybeAtom<string>;
	readonly offsetAnchor?: MaybeAtom<string>;
	readonly offsetDistance?: MaybeAtom<string>;
	readonly offsetPath?: MaybeAtom<string>;
	readonly offsetPosition?: MaybeAtom<string>;
	readonly offsetRotate?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string>;
	readonly order?: MaybeAtom<string>;
	readonly orphans?: MaybeAtom<string>;
	readonly outline?: MaybeAtom<string>;
	readonly outlineColor?: MaybeAtom<string>;
	readonly outlineOffset?: MaybeAtom<string>;
	readonly outlineStyle?: MaybeAtom<string>;
	readonly outlineWidth?: MaybeAtom<string>;
	readonly overflow?: MaybeAtom<string>;
	readonly overflowAnchor?: MaybeAtom<string>;
	readonly overflowBlock?: MaybeAtom<string>;
	readonly overflowClipMargin?: MaybeAtom<string>;
	readonly overflowInline?: MaybeAtom<string>;
	readonly overflowWrap?: MaybeAtom<string>;
	readonly overflowX?: MaybeAtom<string>;
	readonly overflowY?: MaybeAtom<string>;
	readonly overscrollBehavior?: MaybeAtom<string>;
	readonly overscrollBehaviorBlock?: MaybeAtom<string>;
	readonly overscrollBehaviorInline?: MaybeAtom<string>;
	readonly overscrollBehaviorX?: MaybeAtom<string>;
	readonly overscrollBehaviorY?: MaybeAtom<string>;
	readonly padding?: MaybeAtom<string>;
	readonly paddingBlock?: MaybeAtom<string>;
	readonly paddingBlockEnd?: MaybeAtom<string>;
	readonly paddingBlockStart?: MaybeAtom<string>;
	readonly paddingBottom?: MaybeAtom<string>;
	readonly paddingInline?: MaybeAtom<string>;
	readonly paddingInlineEnd?: MaybeAtom<string>;
	readonly paddingInlineStart?: MaybeAtom<string>;
	readonly paddingLeft?: MaybeAtom<string>;
	readonly paddingRight?: MaybeAtom<string>;
	readonly paddingTop?: MaybeAtom<string>;
	readonly page?: MaybeAtom<string>;
	readonly paintOrder?: MaybeAtom<string>;
	readonly perspective?: MaybeAtom<string>;
	readonly perspectiveOrigin?: MaybeAtom<string>;
	readonly placeContent?: MaybeAtom<string>;
	readonly placeItems?: MaybeAtom<string>;
	readonly placeSelf?: MaybeAtom<string>;
	readonly pointerEvents?: MaybeAtom<string>;
	readonly position?: MaybeAtom<string>;
	readonly printColorAdjust?: MaybeAtom<string>;
	readonly quotes?: MaybeAtom<string>;
	readonly r?: MaybeAtom<string>;
	readonly resize?: MaybeAtom<string>;
	readonly right?: MaybeAtom<string>;
	readonly rotate?: MaybeAtom<string>;
	readonly rowGap?: MaybeAtom<string>;
	readonly rubyAlign?: MaybeAtom<string>;
	readonly rubyPosition?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string>;
	readonly ry?: MaybeAtom<string>;
	readonly scale?: MaybeAtom<string>;
	readonly scrollBehavior?: MaybeAtom<string>;
	readonly scrollMargin?: MaybeAtom<string>;
	readonly scrollMarginBlock?: MaybeAtom<string>;
	readonly scrollMarginBlockEnd?: MaybeAtom<string>;
	readonly scrollMarginBlockStart?: MaybeAtom<string>;
	readonly scrollMarginBottom?: MaybeAtom<string>;
	readonly scrollMarginInline?: MaybeAtom<string>;
	readonly scrollMarginInlineEnd?: MaybeAtom<string>;
	readonly scrollMarginInlineStart?: MaybeAtom<string>;
	readonly scrollMarginLeft?: MaybeAtom<string>;
	readonly scrollMarginRight?: MaybeAtom<string>;
	readonly scrollMarginTop?: MaybeAtom<string>;
	readonly scrollPadding?: MaybeAtom<string>;
	readonly scrollPaddingBlock?: MaybeAtom<string>;
	readonly scrollPaddingBlockEnd?: MaybeAtom<string>;
	readonly scrollPaddingBlockStart?: MaybeAtom<string>;
	readonly scrollPaddingBottom?: MaybeAtom<string>;
	readonly scrollPaddingInline?: MaybeAtom<string>;
	readonly scrollPaddingInlineEnd?: MaybeAtom<string>;
	readonly scrollPaddingInlineStart?: MaybeAtom<string>;
	readonly scrollPaddingLeft?: MaybeAtom<string>;
	readonly scrollPaddingRight?: MaybeAtom<string>;
	readonly scrollPaddingTop?: MaybeAtom<string>;
	readonly scrollSnapAlign?: MaybeAtom<string>;
	readonly scrollSnapStop?: MaybeAtom<string>;
	readonly scrollSnapType?: MaybeAtom<string>;
	readonly scrollbarColor?: MaybeAtom<string>;
	readonly scrollbarGutter?: MaybeAtom<string>;
	readonly scrollbarWidth?: MaybeAtom<string>;
	readonly shapeImageThreshold?: MaybeAtom<string>;
	readonly shapeMargin?: MaybeAtom<string>;
	readonly shapeOutside?: MaybeAtom<string>;
	readonly shapeRendering?: MaybeAtom<string>;
	readonly stopColor?: MaybeAtom<string>;
	readonly stopOpacity?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly strokeDasharray?: MaybeAtom<string>;
	readonly strokeDashoffset?: MaybeAtom<string>;
	readonly strokeLinecap?: MaybeAtom<string>;
	readonly strokeLinejoin?: MaybeAtom<string>;
	readonly strokeMiterlimit?: MaybeAtom<string>;
	readonly strokeOpacity?: MaybeAtom<string>;
	readonly strokeWidth?: MaybeAtom<string>;
	readonly tabSize?: MaybeAtom<string>;
	readonly tableLayout?: MaybeAtom<string>;
	readonly textAlign?: MaybeAtom<string>;
	readonly textAlignLast?: MaybeAtom<string>;
	readonly textAnchor?: MaybeAtom<string>;
	readonly textBox?: MaybeAtom<string>;
	readonly textBoxEdge?: MaybeAtom<string>;
	readonly textBoxTrim?: MaybeAtom<string>;
	readonly textCombineUpright?: MaybeAtom<string>;
	readonly textDecoration?: MaybeAtom<string>;
	readonly textDecorationColor?: MaybeAtom<string>;
	readonly textDecorationLine?: MaybeAtom<string>;
	readonly textDecorationSkipInk?: MaybeAtom<string>;
	readonly textDecorationStyle?: MaybeAtom<string>;
	readonly textDecorationThickness?: MaybeAtom<string>;
	readonly textEmphasis?: MaybeAtom<string>;
	readonly textEmphasisColor?: MaybeAtom<string>;
	readonly textEmphasisPosition?: MaybeAtom<string>;
	readonly textEmphasisStyle?: MaybeAtom<string>;
	readonly textIndent?: MaybeAtom<string>;
	readonly textOrientation?: MaybeAtom<string>;
	readonly textOverflow?: MaybeAtom<string>;
	readonly textRendering?: MaybeAtom<string>;
	readonly textShadow?: MaybeAtom<string>;
	readonly textTransform?: MaybeAtom<string>;
	readonly textUnderlineOffset?: MaybeAtom<string>;
	readonly textUnderlinePosition?: MaybeAtom<string>;
	readonly textWrap?: MaybeAtom<string>;
	readonly textWrapMode?: MaybeAtom<string>;
	readonly textWrapStyle?: MaybeAtom<string>;
	readonly top?: MaybeAtom<string>;
	readonly touchAction?: MaybeAtom<string>;
	readonly transform?: MaybeAtom<string>;
	readonly transformBox?: MaybeAtom<string>;
	readonly transformOrigin?: MaybeAtom<string>;
	readonly transformStyle?: MaybeAtom<string>;
	readonly transition?: MaybeAtom<string>;
	readonly transitionBehavior?: MaybeAtom<string>;
	readonly transitionDelay?: MaybeAtom<string>;
	readonly transitionDuration?: MaybeAtom<string>;
	readonly transitionProperty?: MaybeAtom<string>;
	readonly transitionTimingFunction?: MaybeAtom<string>;
	readonly translate?: MaybeAtom<string>;
	readonly unicodeBidi?: MaybeAtom<string>;
	readonly userSelect?: MaybeAtom<string>;
	readonly vectorEffect?: MaybeAtom<string>;
	readonly verticalAlign?: MaybeAtom<string>;
	readonly viewTransitionClass?: MaybeAtom<string>;
	readonly viewTransitionName?: MaybeAtom<string>;
	readonly visibility?: MaybeAtom<string>;
	readonly webkitLineClamp?: MaybeAtom<string>;
	readonly webkitTextFillColor?: MaybeAtom<string>;
	readonly webkitTextStroke?: MaybeAtom<string>;
	readonly webkitTextStrokeColor?: MaybeAtom<string>;
	readonly webkitTextStrokeWidth?: MaybeAtom<string>;
	readonly whiteSpace?: MaybeAtom<string>;
	readonly whiteSpaceCollapse?: MaybeAtom<string>;
	readonly widows?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly willChange?: MaybeAtom<string>;
	readonly wordBreak?: MaybeAtom<string>;
	readonly wordSpacing?: MaybeAtom<string>;
	readonly writingMode?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string>;
	readonly y?: MaybeAtom<string>;
	readonly zIndex?: MaybeAtom<string>;
	readonly zoom?: MaybeAtom<string>;
	readonly anchorName?: MaybeAtom<string>;
	readonly positionAnchor?: MaybeAtom<string>;
	readonly positionArea?: MaybeAtom<string>;
}

export interface ARIAProps {
	readonly ariaActiveDescendantElement?: Element | null;
	readonly ariaAtomic?: string | null;
	readonly ariaAutoComplete?: string | null;
	readonly ariaBrailleLabel?: string | null;
	readonly ariaBrailleRoleDescription?: string | null;
	readonly ariaBusy?: string | null;
	readonly ariaChecked?: string | null;
	readonly ariaColCount?: string | null;
	readonly ariaColIndex?: string | null;
	readonly ariaColIndexText?: string | null;
	readonly ariaColSpan?: string | null;
	readonly ariaControlsElements?: readonly Element[] | null;
	readonly ariaCurrent?: string | null;
	readonly ariaDescribedByElements?: readonly Element[] | null;
	readonly ariaDescription?: string | null;
	readonly ariaDetailsElements?: readonly Element[] | null;
	readonly ariaDisabled?: string | null;
	readonly ariaErrorMessageElements?: readonly Element[] | null;
	readonly ariaExpanded?: string | null;
	readonly ariaFlowToElements?: readonly Element[] | null;
	readonly ariaHasPopup?: string | null;
	readonly ariaHidden?: string | null;
	readonly ariaInvalid?: string | null;
	readonly ariaKeyShortcuts?: string | null;
	readonly ariaLabel?: string | null;
	readonly ariaLabelledByElements?: readonly Element[] | null;
	readonly ariaLevel?: string | null;
	readonly ariaLive?: string | null;
	readonly ariaModal?: string | null;
	readonly ariaMultiLine?: string | null;
	readonly ariaMultiSelectable?: string | null;
	readonly ariaOrientation?: string | null;
	readonly ariaOwnsElements?: readonly Element[] | null;
	readonly ariaPlaceholder?: string | null;
	readonly ariaPosInSet?: string | null;
	readonly ariaPressed?: string | null;
	readonly ariaReadOnly?: string | null;
	readonly ariaRelevant?: string | null;
	readonly ariaRequired?: string | null;
	readonly ariaRoleDescription?: string | null;
	readonly ariaRowCount?: string | null;
	readonly ariaRowIndex?: string | null;
	readonly ariaRowIndexText?: string | null;
	readonly ariaRowSpan?: string | null;
	readonly ariaSelected?: string | null;
	readonly ariaSetSize?: string | null;
	readonly ariaSort?: string | null;
	readonly ariaValueMax?: string | null;
	readonly ariaValueMin?: string | null;
	readonly ariaValueNow?: string | null;
	readonly ariaValueText?: string | null;
	readonly role?: string | null;
}

export interface HTMLGlobalProps {
	readonly translate?: MaybeAtom<boolean>;
	readonly part?: MaybeAtom<string>;
	readonly class?: MaybeAtom<string>;
	readonly accessKey?: MaybeAtom<string>;
	readonly autocapitalize?: MaybeAtom<string>;
	readonly autocorrect?: MaybeAtom<boolean>;
	readonly dir?: MaybeAtom<string>;
	readonly draggable?: MaybeAtom<boolean>;
	readonly hidden?: MaybeAtom<boolean>;
	readonly inert?: MaybeAtom<boolean>;
	readonly lang?: MaybeAtom<string>;
	readonly popover?: MaybeAtom<string | null>;
	readonly spellcheck?: MaybeAtom<boolean>;
	readonly title?: MaybeAtom<string>;
	readonly writingSuggestions?: MaybeAtom<string>;
	readonly id?: MaybeAtom<string>;
	readonly scrollLeft?: MaybeAtom<number>;
	readonly scrollTop?: MaybeAtom<number>;
	readonly slot?: MaybeAtom<string>;
	readonly contentEditable?: MaybeAtom<string>;
	readonly enterKeyHint?: MaybeAtom<string>;
	readonly inputMode?: MaybeAtom<string>;
	readonly autofocus?: MaybeAtom<boolean>;
	readonly nonce?: MaybeAtom<string | undefined>;
	readonly tabIndex?: MaybeAtom<number>;
}

export interface HTMLAnchorElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAnchorElement;
	readonly children?: JsxChildren;
	readonly charset?: MaybeAtom<string>;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly hreflang?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly rev?: MaybeAtom<string>;
	readonly shape?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly text?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly hash?: MaybeAtom<string>;
	readonly host?: MaybeAtom<string>;
	readonly hostname?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly password?: MaybeAtom<string>;
	readonly pathname?: MaybeAtom<string>;
	readonly port?: MaybeAtom<string>;
	readonly protocol?: MaybeAtom<string>;
	readonly search?: MaybeAtom<string>;
	readonly username?: MaybeAtom<string>;
}

export interface HTMLAreaElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAreaElement;
	readonly children?: never;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly shape?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly hash?: MaybeAtom<string>;
	readonly host?: MaybeAtom<string>;
	readonly hostname?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly password?: MaybeAtom<string>;
	readonly pathname?: MaybeAtom<string>;
	readonly port?: MaybeAtom<string>;
	readonly protocol?: MaybeAtom<string>;
	readonly search?: MaybeAtom<string>;
	readonly username?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly noHref?: MaybeAtom<boolean>;
}

export interface HTMLAudioElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAudioElement;
	readonly children?: JsxChildren;
	readonly autoplay?: MaybeAtom<boolean>;
	readonly controls?: MaybeAtom<boolean>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly currentTime?: MaybeAtom<number>;
	readonly defaultMuted?: MaybeAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeAtom<number>;
	readonly disableRemotePlayback?: MaybeAtom<boolean>;
	readonly loop?: MaybeAtom<boolean>;
	readonly muted?: MaybeAtom<boolean>;
	readonly playbackRate?: MaybeAtom<number>;
	readonly preload?: MaybeAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeAtom<boolean>;
	readonly src?: MaybeAtom<string>;
	readonly srcObject?: MaybeAtom<MediaProvider | null>;
	readonly volume?: MaybeAtom<number>;
}

export interface HTMLBaseElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLBaseElement;
	readonly children?: never;
	readonly target?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
}

export interface HTMLElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly children?: JsxChildren;
}

export interface HTMLQuoteElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLQuoteElement;
	readonly children?: JsxChildren;
	readonly cite?: MaybeAtom<string>;
}

export interface HTMLBRElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLBRElement;
	readonly children?: never;
	readonly clear?: MaybeAtom<string>;
}

export interface HTMLButtonElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLButtonElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<"submit" | "reset" | "button">;
	readonly disabled?: MaybeAtom<boolean>;
	readonly formAction?: MaybeAtom<string>;
	readonly formEnctype?: MaybeAtom<string>;
	readonly formMethod?: MaybeAtom<string>;
	readonly formNoValidate?: MaybeAtom<boolean>;
	readonly formTarget?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly popoverTargetAction?: MaybeAtom<string>;
	readonly popoverTargetElement?: MaybeAtom<Element | null>;
}

export interface HTMLCanvasElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLCanvasElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
}

export interface HTMLTableCaptionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableCaptionElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLTableColElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableColElement;
	readonly children?: never;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly span?: MaybeAtom<number>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLDataElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDataElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<string>;
}

export interface HTMLDataListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDataListElement;
	readonly children?: JsxChildren;
}

export interface HTMLModElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLModElement;
	readonly children?: JsxChildren;
	readonly cite?: MaybeAtom<string>;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLDetailsElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDetailsElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly open?: MaybeAtom<boolean>;
}

export interface HTMLDialogElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDialogElement;
	readonly children?: JsxChildren;
	readonly open?: MaybeAtom<boolean>;
	readonly returnValue?: MaybeAtom<string>;
}

export interface HTMLDivElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDivElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLDListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDListElement;
	readonly children?: JsxChildren;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLEmbedElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLEmbedElement;
	readonly children?: never;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLFieldSetElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLFieldSetElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
}

export interface HTMLFormElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLFormElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly acceptCharset?: MaybeAtom<string>;
	readonly action?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFillBase>;
	readonly encoding?: MaybeAtom<string>;
	readonly enctype?: MaybeAtom<string>;
	readonly method?: MaybeAtom<string>;
	readonly noValidate?: MaybeAtom<boolean>;
}

export interface HTMLHeadingElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLHeadingElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLHRElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLHRElement;
	readonly children?: never;
	readonly color?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly noShade?: MaybeAtom<boolean>;
	readonly size?: MaybeAtom<string>;
}

export interface HTMLIFrameElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLIFrameElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<ReferrerPolicy>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly allow?: MaybeAtom<string>;
	readonly allowFullscreen?: MaybeAtom<boolean>;
	readonly frameBorder?: MaybeAtom<string>;
	readonly loading?: MaybeAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeAtom<string>;
	readonly marginHeight?: MaybeAtom<string>;
	readonly marginWidth?: MaybeAtom<string>;
	readonly sandbox?: MaybeAtom<DOMTokenList>;
	readonly scrolling?: MaybeAtom<string>;
	readonly srcdoc?: MaybeAtom<string>;
}

export interface HTMLImageElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLImageElement;
	readonly children?: never;
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly loading?: MaybeAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeAtom<string>;
	readonly decoding?: MaybeAtom<"auto" | "async" | "sync">;
	readonly fetchPriority?: MaybeAtom<"auto" | "high" | "low">;
	readonly hspace?: MaybeAtom<number>;
	readonly isMap?: MaybeAtom<boolean>;
	readonly lowsrc?: MaybeAtom<string>;
	readonly sizes?: MaybeAtom<string>;
	readonly srcset?: MaybeAtom<string>;
	readonly useMap?: MaybeAtom<string>;
	readonly vspace?: MaybeAtom<number>;
}

export interface HTMLInputElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLInputElement;
	readonly children?: never;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly formAction?: MaybeAtom<string>;
	readonly formEnctype?: MaybeAtom<string>;
	readonly formMethod?: MaybeAtom<string>;
	readonly formNoValidate?: MaybeAtom<boolean>;
	readonly formTarget?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly popoverTargetAction?: MaybeAtom<string>;
	readonly popoverTargetElement?: MaybeAtom<Element | null>;
	readonly align?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly size?: MaybeAtom<number>;
	readonly useMap?: MaybeAtom<string>;
	readonly accept?: MaybeAtom<string>;
	readonly capture?: MaybeAtom<string>;
	readonly checked?: MaybeAtom<boolean>;
	readonly defaultChecked?: MaybeAtom<boolean>;
	readonly defaultValue?: MaybeAtom<string>;
	readonly dirName?: MaybeAtom<string>;
	readonly files?: MaybeAtom<FileList | null>;
	readonly indeterminate?: MaybeAtom<boolean>;
	readonly max?: MaybeAtom<string>;
	readonly maxLength?: MaybeAtom<number>;
	readonly min?: MaybeAtom<string>;
	readonly minLength?: MaybeAtom<number>;
	readonly multiple?: MaybeAtom<boolean>;
	readonly pattern?: MaybeAtom<string>;
	readonly placeholder?: MaybeAtom<string>;
	readonly readOnly?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectionDirection?: MaybeAtom<"none" | "forward" | "backward" | null>;
	readonly selectionEnd?: MaybeAtom<number | null>;
	readonly selectionStart?: MaybeAtom<number | null>;
	readonly step?: MaybeAtom<string>;
	readonly valueAsDate?: MaybeAtom<Date | null>;
	readonly valueAsNumber?: MaybeAtom<number>;
	readonly webkitdirectory?: MaybeAtom<boolean>;
}

export interface HTMLLabelElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLabelElement;
	readonly children?: JsxChildren;
	readonly for?: MaybeAtom<string>;
}

export interface HTMLLegendElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLegendElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLLIElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLIElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly value?: MaybeAtom<number>;
}

export interface HTMLMapElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMapElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLMenuElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMenuElement;
	readonly children?: JsxChildren;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLMeterElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMeterElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<number>;
	readonly high?: MaybeAtom<number>;
	readonly low?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
	readonly min?: MaybeAtom<number>;
	readonly optimum?: MaybeAtom<number>;
}

export interface HTMLObjectElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLObjectElement;
	readonly children?: JsxChildren;
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly hspace?: MaybeAtom<number>;
	readonly useMap?: MaybeAtom<string>;
	readonly vspace?: MaybeAtom<number>;
	readonly archive?: MaybeAtom<string>;
	readonly code?: MaybeAtom<string>;
	readonly codeBase?: MaybeAtom<string>;
	readonly codeType?: MaybeAtom<string>;
	readonly data?: MaybeAtom<string>;
	readonly declare?: MaybeAtom<boolean>;
	readonly standby?: MaybeAtom<string>;
}

export interface HTMLOListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOListElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
	readonly reversed?: MaybeAtom<boolean>;
	readonly start?: MaybeAtom<number>;
}

export interface HTMLOptGroupElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOptGroupElement;
	readonly children?: JsxChildren;
	readonly disabled?: MaybeAtom<boolean>;
	readonly label?: MaybeAtom<string>;
}

export interface HTMLOptionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOptionElement;
	readonly children?: JsxChildren;
	readonly text?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly defaultSelected?: MaybeAtom<boolean>;
	readonly selected?: MaybeAtom<boolean>;
}

export interface HTMLOutputElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOutputElement;
	readonly children?: JsxChildren;
	readonly for?: MaybeAtom<DOMTokenList>;
	readonly name?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly defaultValue?: MaybeAtom<string>;
}

export interface HTMLParagraphElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLParagraphElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLPictureElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLPictureElement;
	readonly children?: JsxChildren;
}

export interface HTMLPreElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLPreElement;
	readonly children?: JsxChildren;
	readonly width?: MaybeAtom<number>;
}

export interface HTMLProgressElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLProgressElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
}

export interface HTMLSelectElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSelectElement;
	readonly children?: JsxChildren;
	readonly length?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly size?: MaybeAtom<number>;
	readonly multiple?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectedIndex?: MaybeAtom<number>;
}

export interface HTMLSlotElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSlotElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLSourceElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSourceElement;
	readonly children?: never;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly sizes?: MaybeAtom<string>;
	readonly srcset?: MaybeAtom<string>;
	readonly media?: MaybeAtom<string>;
}

export interface HTMLSpanElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSpanElement;
	readonly children?: JsxChildren;
}

export interface HTMLTableElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableElement;
	readonly children?: JsxChildren;
	readonly border?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
	readonly caption?: MaybeAtom<HTMLTableCaptionElement | null>;
	readonly cellPadding?: MaybeAtom<string>;
	readonly cellSpacing?: MaybeAtom<string>;
	readonly frame?: MaybeAtom<string>;
	readonly rules?: MaybeAtom<string>;
	readonly summary?: MaybeAtom<string>;
	readonly tFoot?: MaybeAtom<HTMLTableSectionElement | null>;
	readonly tHead?: MaybeAtom<HTMLTableSectionElement | null>;
}

export interface HTMLTableSectionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableSectionElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLTableCellElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableCellElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
	readonly abbr?: MaybeAtom<string>;
	readonly axis?: MaybeAtom<string>;
	readonly colSpan?: MaybeAtom<number>;
	readonly headers?: MaybeAtom<string>;
	readonly noWrap?: MaybeAtom<boolean>;
	readonly rowSpan?: MaybeAtom<number>;
	readonly scope?: MaybeAtom<string>;
}

export interface HTMLTemplateElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTemplateElement;
	readonly children?: JsxChildren;
	readonly shadowRootClonable?: MaybeAtom<boolean>;
	readonly shadowRootDelegatesFocus?: MaybeAtom<boolean>;
	readonly shadowRootMode?: MaybeAtom<string>;
	readonly shadowRootSerializable?: MaybeAtom<boolean>;
}

export interface HTMLTextAreaElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTextAreaElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly defaultValue?: MaybeAtom<string>;
	readonly dirName?: MaybeAtom<string>;
	readonly maxLength?: MaybeAtom<number>;
	readonly minLength?: MaybeAtom<number>;
	readonly placeholder?: MaybeAtom<string>;
	readonly readOnly?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectionDirection?: MaybeAtom<"none" | "forward" | "backward">;
	readonly selectionEnd?: MaybeAtom<number>;
	readonly selectionStart?: MaybeAtom<number>;
	readonly rows?: MaybeAtom<number>;
	readonly cols?: MaybeAtom<number>;
	readonly wrap?: MaybeAtom<string>;
}

export interface HTMLTimeElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTimeElement;
	readonly children?: JsxChildren;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLTableRowElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableRowElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
}

export interface HTMLTrackElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTrackElement;
	readonly children?: never;
	readonly src?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly default?: MaybeAtom<boolean>;
	readonly kind?: MaybeAtom<string>;
	readonly srclang?: MaybeAtom<string>;
}

export interface HTMLUListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLUListElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLVideoElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLVideoElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly autoplay?: MaybeAtom<boolean>;
	readonly controls?: MaybeAtom<boolean>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly currentTime?: MaybeAtom<number>;
	readonly defaultMuted?: MaybeAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeAtom<number>;
	readonly disableRemotePlayback?: MaybeAtom<boolean>;
	readonly loop?: MaybeAtom<boolean>;
	readonly muted?: MaybeAtom<boolean>;
	readonly playbackRate?: MaybeAtom<number>;
	readonly preload?: MaybeAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeAtom<boolean>;
	readonly src?: MaybeAtom<string>;
	readonly srcObject?: MaybeAtom<MediaProvider | null>;
	readonly volume?: MaybeAtom<number>;
	readonly disablePictureInPicture?: MaybeAtom<boolean>;
	readonly playsInline?: MaybeAtom<boolean>;
	readonly poster?: MaybeAtom<string>;
}

export interface HTMLWbrElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly children?: never;
}

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

export interface SVGGlobalProps {
	readonly autofocus?: MaybeAtom<boolean>;
	readonly class?: MaybeAtom<string>;
	readonly color?: MaybeAtom<string>;
	readonly display?: MaybeAtom<string>;
	readonly filter?: MaybeAtom<string>;
	readonly id?: MaybeAtom<string>;
	readonly lang?: MaybeAtom<string>;
	readonly style?: MaybeAtom<string>;
	readonly tabindex?: MaybeAtom<string | number>;
	readonly transform?: MaybeAtom<string>;
	readonly "transform-origin"?: MaybeAtom<string>;
}

export type SVGAccumulate = "none" | "sum";

export type SVGAdditive = "replace" | "sum";

export type SVGAlignmentBaseline = "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "top" | "center" | "bottom";

export type SVGCalcMode = "discrete" | "linear" | "paced" | "spline";

export type SVGClipRule = "nonzero" | "evenodd" | "inherit";

export type SVGColorInterpolationFilters = "auto" | "sRGB" | "linearRGB";

export type SVGCrossOrigin = "" | "anonymous" | "use-credentials";

export type SVGTextDirection = "rtl" | "ltr";

export type SVGDominantBaseline = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top";

export type SVGEdgeMode = "duplicate" | "wrap" | "none";

export type SVGFillMode = "freeze" | "remove";

export type SVGFillRule = "nonzero" | "evenodd";

export type SVGFontStyle = "normal" | "italic" | "oblique";

export type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";

export type SVGLengthAdjust = "spacing" | "spacingAndGlyphs";

export type SVGOverflow = "visible" | "hidden" | "scroll" | "auto";

export type SVGPointerEvents = "bounding-box" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none";

export type SVGRestart = "always" | "whenNotActive" | "never";

export type SVGShapeRendering = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";

export type SVGSpreadMethod = "pad" | "reflect" | "repeat";

export type SVGStrokeLineCap = "butt" | "round" | "square";

export type SVGStrokeLineJoin = "arcs" | "bevel" | "miter" | "miter-clip" | "round";

export type SVGTextAnchor = "start" | "middle" | "end";

export type SVGUnicodeBidi = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";

export type SVGVectorEffect = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";

export type SVGVisibility = "visible" | "hidden" | "collapse";

export type SVGWhiteSpace = "normal" | "pre" | "nowrap" | "pre-wrap" | "break-space" | "pre-line";

export type SVGWritingMode = "horizontal-tb" | "vertical-rl" | "vertical-lr";

export type SVGColorChannel = "R" | "G" | "B" | "A";

export interface SVGAElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly referrerpolicy?: MaybeAtom<ReferrerPolicy>;
	readonly rel?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGAnimateElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGAnimateMotionElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateMotionElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly path?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly rotate?: MaybeAtom<number | "auto" | "auto-reverse">;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGAnimateTransformElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateTransformElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly type?: MaybeAtom<string>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGCircleElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGCircleElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly r?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGClipPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGClipPathElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly clipPathUnits?: MaybeAtom<SVGUnits>;
	readonly mask?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGDefsElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGDefsElement;
	readonly children?: JsxChildren;
	readonly cursor?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGDescElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGDescElement;
	readonly children?: JsxChildren;
}

export interface SVGEllipseElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGEllipseElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string | number>;
	readonly ry?: MaybeAtom<string | number>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGFEBlendElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEBlendElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly mode?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEColorMatrixElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEColorMatrixElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly values?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEComponentTransferElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEComponentTransferElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFECompositeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFECompositeElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly k1?: MaybeAtom<string | number>;
	readonly k2?: MaybeAtom<string | number>;
	readonly k3?: MaybeAtom<string | number>;
	readonly k4?: MaybeAtom<string | number>;
	readonly operator?: MaybeAtom<"in" | "over" | "out" | "atop" | "xor" | "lighter" | "arithmetic">;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEConvolveMatrixElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEConvolveMatrixElement;
	readonly children?: JsxChildren;
	readonly bias?: MaybeAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly divisor?: MaybeAtom<string | number>;
	readonly edgeMode?: MaybeAtom<SVGEdgeMode>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelMatrix?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly order?: MaybeAtom<string | number>;
	readonly preserveAlpha?: MaybeAtom<string | boolean>;
	readonly result?: MaybeAtom<string>;
	readonly targetX?: MaybeAtom<string | number>;
	readonly targetY?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEDiffuseLightingElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDiffuseLightingElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly diffuseConstant?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly "lighting-color"?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly surfaceScale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEDisplacementMapElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDisplacementMapElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly scale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly xChannelSelector?: MaybeAtom<SVGColorChannel>;
	readonly y?: MaybeAtom<string | number>;
	readonly yChannelSelector?: MaybeAtom<SVGColorChannel>;
}

export interface SVGFEDistantLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDistantLightElement;
	readonly children?: JsxChildren;
	readonly azimuth?: MaybeAtom<string | number>;
	readonly elevation?: MaybeAtom<string | number>;
}

export interface SVGFEDropShadowElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDropShadowElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly "flood-color"?: MaybeAtom<string>;
	readonly "flood-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly stdDeviation?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFloodElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFloodElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly "flood-color"?: MaybeAtom<string>;
	readonly "flood-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncAElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncAElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncBElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncBElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncGElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncRElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncRElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEGaussianBlurElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEGaussianBlurElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly edgeMode?: MaybeAtom<SVGEdgeMode>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly stdDeviation?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEImageElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEImageElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMergeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMergeNodeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeNodeElement;
	readonly children?: JsxChildren;
	readonly in?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMorphologyElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMorphologyElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly operator?: MaybeAtom<"erode" | "dilate">;
	readonly radius?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEOffsetElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEOffsetElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEPointLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEPointLightElement;
	readonly children?: JsxChildren;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
	readonly z?: MaybeAtom<string | number>;
}

export interface SVGFESpecularLightingElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFESpecularLightingElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly "lighting-color"?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly specularConstant?: MaybeAtom<string | number>;
	readonly specularExponent?: MaybeAtom<string | number>;
	readonly surfaceScale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFESpotLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFESpotLightElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly limitingConeAngle?: MaybeAtom<string | number>;
	readonly pointsAtX?: MaybeAtom<string | number>;
	readonly pointsAtY?: MaybeAtom<string | number>;
	readonly pointsAtZ?: MaybeAtom<string | number>;
	readonly specularExponent?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
	readonly z?: MaybeAtom<string | number>;
}

export interface SVGFETileElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFETileElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFETurbulenceElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFETurbulenceElement;
	readonly children?: JsxChildren;
	readonly baseFrequency?: MaybeAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly numOctaves?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly seed?: MaybeAtom<string | number>;
	readonly stitchTiles?: MaybeAtom<"noStitch" | "stitch">;
	readonly type?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFilterElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFilterElement;
	readonly children?: JsxChildren;
	readonly filterUnits?: MaybeAtom<SVGUnits>;
	readonly height?: MaybeAtom<string | number>;
	readonly primitiveUnits?: MaybeAtom<SVGUnits>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGForeignObjectElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGForeignObjectElement;
	readonly children?: JsxChildren;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGGElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGImageElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGImageElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly crossorigin?: MaybeAtom<SVGCrossOrigin>;
	readonly cursor?: MaybeAtom<string>;
	readonly decoding?: MaybeAtom<"auto" | "async" | "sync">;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly "image-rendering"?: MaybeAtom<"auto" | "optimizeSpeed" | "optimizeQuality">;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGLineElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGLineElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly orient?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly x1?: MaybeAtom<string | number>;
	readonly x2?: MaybeAtom<string | number>;
	readonly y1?: MaybeAtom<string | number>;
	readonly y2?: MaybeAtom<string | number>;
}

export interface SVGLinearGradientElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGLinearGradientElement;
	readonly children?: JsxChildren;
	readonly gradientTransform?: MaybeAtom<string>;
	readonly gradientUnits?: MaybeAtom<SVGUnits>;
	readonly href?: MaybeAtom<string>;
	readonly spreadMethod?: MaybeAtom<SVGSpreadMethod>;
	readonly x1?: MaybeAtom<string | number>;
	readonly x2?: MaybeAtom<string | number>;
	readonly y1?: MaybeAtom<string | number>;
	readonly y2?: MaybeAtom<string | number>;
}

export interface SVGMarkerElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMarkerElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly markerHeight?: MaybeAtom<string | number>;
	readonly markerUnits?: MaybeAtom<"strokeWidth" | "userSpaceOnUse">;
	readonly markerWidth?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly refX?: MaybeAtom<string | number>;
	readonly refY?: MaybeAtom<string | number>;
	readonly viewBox?: MaybeAtom<string>;
}

export interface SVGMaskElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMaskElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly "mask-type"?: MaybeAtom<"alpha" | "luminance">;
	readonly maskContentUnits?: MaybeAtom<SVGUnits>;
	readonly maskUnits?: MaybeAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGMetadataElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMetadataElement;
	readonly children?: JsxChildren;
}

export interface SVGMPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMPathElement;
	readonly children?: JsxChildren;
	readonly href?: MaybeAtom<string>;
}

export interface SVGPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPathElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly d?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGPatternElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPatternElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly patternContentUnits?: MaybeAtom<SVGUnits>;
	readonly patternTransform?: MaybeAtom<string>;
	readonly patternUnits?: MaybeAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGPolygonElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPolygonElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly points?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGPolylineElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPolylineElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly points?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGRadialGradientElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGRadialGradientElement;
	readonly children?: JsxChildren;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fr?: MaybeAtom<string | number>;
	readonly fx?: MaybeAtom<string | number>;
	readonly fy?: MaybeAtom<string | number>;
	readonly gradientTransform?: MaybeAtom<string>;
	readonly gradientUnits?: MaybeAtom<SVGUnits>;
	readonly href?: MaybeAtom<string>;
	readonly r?: MaybeAtom<string | number>;
	readonly spreadMethod?: MaybeAtom<SVGSpreadMethod>;
}

export interface SVGRectElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGRectElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string | number>;
	readonly ry?: MaybeAtom<string | number>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGSetElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSetElement;
	readonly children?: JsxChildren;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
}

export interface SVGStopElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGStopElement;
	readonly children?: never;
	readonly "stop-color"?: MaybeAtom<string>;
	readonly "stop-opacity"?: MaybeAtom<string | number>;
}

export interface SVGSVGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSVGElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGSwitchElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSwitchElement;
	readonly children?: JsxChildren;
	readonly cursor?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGSymbolElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSymbolElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
}

export interface SVGTextElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTextElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly "text-rendering"?: MaybeAtom<"auto" | "optimizeSpeed" | "geometricPrecision" | "optimizeLegibility">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGTextPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTextPathElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly method?: MaybeAtom<"align" | "stretch">;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly path?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly spacing?: MaybeAtom<"auto" | "exact">;
	readonly startOffset?: MaybeAtom<string | number>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
}

export interface SVGTitleElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTitleElement;
	readonly children?: JsxChildren;
}

export interface SVGTSpanElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTSpanElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGUseElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGUseElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGViewElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGViewElement;
	readonly children?: JsxChildren;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
}

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

export interface MathMLGlobalProps {
	readonly dir?: MaybeAtom<"rtl" | "ltr">;
	readonly displaystyle?: MaybeAtom<boolean>;
	readonly mathbackground?: MaybeAtom<string>;
	readonly mathcolor?: MaybeAtom<string>;
	readonly mathsize?: MaybeAtom<string>;
	readonly scriptlevel?: MaybeAtom<string>;
}

export interface MathMLElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
}

export interface MathMLMathElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly display?: MaybeAtom<"block" | "inline">;
}

export interface MatMLFracElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
	readonly linethickness?: MaybeAtom<string>;
}

export interface MatMLIElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly mathvariant?: MaybeAtom<"normal">;
}

export interface MatMLOElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly fence?: MaybeAtom<boolean>;
	readonly form?: MaybeAtom<"prefix" | "infix" | "postfix">;
	readonly largeop?: MaybeAtom<boolean>;
	readonly lspace?: MaybeAtom<string>;
	readonly maxsize?: MaybeAtom<string>;
	readonly minsize?: MaybeAtom<string>;
	readonly movablelimits?: MaybeAtom<boolean>;
	readonly rspace?: MaybeAtom<string>;
	readonly separator?: MaybeAtom<boolean>;
	readonly stretchy?: MaybeAtom<boolean>;
	readonly symmetric?: MaybeAtom<boolean>;
}

export interface MatMLOverElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accent?: MaybeAtom<boolean>;
}

export interface MatMLPaddedElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly depth?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly lspace?: MaybeAtom<string>;
	readonly voffset?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
}

export interface MatMLRowElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
}

export interface MatMLSpaceElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly depth?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
}

export interface MatMLTDElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly columnspan?: MaybeAtom<string | number>;
	readonly rowspan?: MaybeAtom<string | number>;
}

export interface MatMLTextElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
}

export interface MatMLUnderElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accentunder?: MaybeAtom<boolean>;
}

export interface MatMLUnderOverElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accent?: MaybeAtom<boolean>;
	readonly accentunder?: MaybeAtom<boolean>;
}

export interface MathMLIntrinsicElements {
	math: MathMLMathElementProps;
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

	// difficult to support due to the inclusion of extra XML namespaces:
	// - semantics
	// - annotation
	// - annotation-xml
}

export interface IntrinsicElements extends HTMLIntrinsicElements, SVGIntrinsicElements, MathMLIntrinsicElements {
	a: HTMLAnchorElementProps | SVGAElementProps;
}

