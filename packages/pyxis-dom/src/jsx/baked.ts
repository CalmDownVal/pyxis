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
}

interface HTMLBaseProps {
	readonly translate?: MaybeAtom<boolean>;
	readonly children?: MaybeAtom<JsxChildren>;
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
	readonly ariaActiveDescendantElement?: MaybeAtom<Element | null>;
	readonly ariaAtomic?: MaybeAtom<string | null>;
	readonly ariaAutoComplete?: MaybeAtom<string | null>;
	readonly ariaBrailleLabel?: MaybeAtom<string | null>;
	readonly ariaBrailleRoleDescription?: MaybeAtom<string | null>;
	readonly ariaBusy?: MaybeAtom<string | null>;
	readonly ariaChecked?: MaybeAtom<string | null>;
	readonly ariaColCount?: MaybeAtom<string | null>;
	readonly ariaColIndex?: MaybeAtom<string | null>;
	readonly ariaColIndexText?: MaybeAtom<string | null>;
	readonly ariaColSpan?: MaybeAtom<string | null>;
	readonly ariaControlsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaCurrent?: MaybeAtom<string | null>;
	readonly ariaDescribedByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDescription?: MaybeAtom<string | null>;
	readonly ariaDetailsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDisabled?: MaybeAtom<string | null>;
	readonly ariaErrorMessageElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaExpanded?: MaybeAtom<string | null>;
	readonly ariaFlowToElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaHasPopup?: MaybeAtom<string | null>;
	readonly ariaHidden?: MaybeAtom<string | null>;
	readonly ariaInvalid?: MaybeAtom<string | null>;
	readonly ariaKeyShortcuts?: MaybeAtom<string | null>;
	readonly ariaLabel?: MaybeAtom<string | null>;
	readonly ariaLabelledByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaLevel?: MaybeAtom<string | null>;
	readonly ariaLive?: MaybeAtom<string | null>;
	readonly ariaModal?: MaybeAtom<string | null>;
	readonly ariaMultiLine?: MaybeAtom<string | null>;
	readonly ariaMultiSelectable?: MaybeAtom<string | null>;
	readonly ariaOrientation?: MaybeAtom<string | null>;
	readonly ariaOwnsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaPlaceholder?: MaybeAtom<string | null>;
	readonly ariaPosInSet?: MaybeAtom<string | null>;
	readonly ariaPressed?: MaybeAtom<string | null>;
	readonly ariaReadOnly?: MaybeAtom<string | null>;
	readonly ariaRelevant?: MaybeAtom<string | null>;
	readonly ariaRequired?: MaybeAtom<string | null>;
	readonly ariaRoleDescription?: MaybeAtom<string | null>;
	readonly ariaRowCount?: MaybeAtom<string | null>;
	readonly ariaRowIndex?: MaybeAtom<string | null>;
	readonly ariaRowIndexText?: MaybeAtom<string | null>;
	readonly ariaRowSpan?: MaybeAtom<string | null>;
	readonly ariaSelected?: MaybeAtom<string | null>;
	readonly ariaSetSize?: MaybeAtom<string | null>;
	readonly ariaSort?: MaybeAtom<string | null>;
	readonly ariaValueMax?: MaybeAtom<string | null>;
	readonly ariaValueMin?: MaybeAtom<string | null>;
	readonly ariaValueNow?: MaybeAtom<string | null>;
	readonly ariaValueText?: MaybeAtom<string | null>;
	readonly role?: MaybeAtom<string | null>;
	readonly contentEditable?: MaybeAtom<string>;
	readonly enterKeyHint?: MaybeAtom<string>;
	readonly inputMode?: MaybeAtom<string>;
	readonly autofocus?: MaybeAtom<boolean>;
	readonly nonce?: MaybeAtom<string | undefined>;
	readonly tabIndex?: MaybeAtom<number>;
}

export interface HTMLAnchorElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLAnchorElement;
	readonly charset?: MaybeAtom<string>;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly hreflang?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<DOMTokenList>;
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

export interface HTMLAreaElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLAreaElement;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<DOMTokenList>;
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

export interface HTMLAudioElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLAudioElement;
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

export interface HTMLBaseElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLBaseElement;
	readonly target?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
}

export interface HTMLElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLAnchorElement;
	readonly charset?: MaybeAtom<string>;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly hreflang?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<DOMTokenList>;
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

export interface HTMLQuoteElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLQuoteElement;
	readonly cite?: MaybeAtom<string>;
}

export interface HTMLBRElementProps extends HTMLBaseProps {
	readonly clear?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLBRElement;
}

export interface HTMLButtonElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLButtonElement;
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

export interface HTMLCanvasElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLCanvasElement;
}

export interface HTMLTableCaptionElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTableCaptionElement;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLTableColElementProps extends HTMLBaseProps {
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLTableColElement;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly span?: MaybeAtom<number>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLDataElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDataElement;
	readonly value?: MaybeAtom<string>;
}

export interface HTMLDataListElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDataListElement;
}

export interface HTMLModElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLModElement;
	readonly cite?: MaybeAtom<string>;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLDetailsElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDetailsElement;
	readonly name?: MaybeAtom<string>;
	readonly open?: MaybeAtom<boolean>;
}

export interface HTMLDialogElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDialogElement;
	readonly open?: MaybeAtom<boolean>;
	readonly returnValue?: MaybeAtom<string>;
}

export interface HTMLDivElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDivElement;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLDListElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLDListElement;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLEmbedElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLEmbedElement;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLFieldSetElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLFieldSetElement;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
}

export interface HTMLFormElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLFormElement;
	readonly name?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<DOMTokenList>;
	readonly target?: MaybeAtom<string>;
	readonly acceptCharset?: MaybeAtom<string>;
	readonly action?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFillBase>;
	readonly encoding?: MaybeAtom<string>;
	readonly enctype?: MaybeAtom<string>;
	readonly method?: MaybeAtom<string>;
	readonly noValidate?: MaybeAtom<boolean>;
}

export interface HTMLHeadingElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLHeadingElement;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLHRElementProps extends HTMLBaseProps {
	readonly color?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLHRElement;
	readonly align?: MaybeAtom<string>;
	readonly noShade?: MaybeAtom<boolean>;
	readonly size?: MaybeAtom<string>;
}

export interface HTMLIFrameElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLIFrameElement;
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

export interface HTMLImageElementProps extends HTMLBaseProps {
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLImageElement;
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

export interface HTMLInputElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLInputElement;
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

export interface HTMLLabelElementProps extends HTMLBaseProps {
	readonly for?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLLabelElement;
}

export interface HTMLLegendElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLLegendElement;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLLIElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLLIElement;
	readonly type?: MaybeAtom<string>;
	readonly value?: MaybeAtom<number>;
}

export interface HTMLMapElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLMapElement;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLMenuElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLMenuElement;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLMeterElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLMeterElement;
	readonly value?: MaybeAtom<number>;
	readonly high?: MaybeAtom<number>;
	readonly low?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
	readonly min?: MaybeAtom<number>;
	readonly optimum?: MaybeAtom<number>;
}

export interface HTMLObjectElementProps extends HTMLBaseProps {
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLObjectElement;
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

export interface HTMLOListElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLOListElement;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
	readonly reversed?: MaybeAtom<boolean>;
	readonly start?: MaybeAtom<number>;
}

export interface HTMLOptGroupElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLOptGroupElement;
	readonly disabled?: MaybeAtom<boolean>;
	readonly label?: MaybeAtom<string>;
}

export interface HTMLOptionElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLOptionElement;
	readonly text?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly defaultSelected?: MaybeAtom<boolean>;
	readonly selected?: MaybeAtom<boolean>;
}

export interface HTMLOutputElementProps extends HTMLBaseProps {
	readonly for?: MaybeAtom<DOMTokenList>;
	readonly [S_NODE_TYPE]?: HTMLOutputElement;
	readonly name?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly defaultValue?: MaybeAtom<string>;
}

export interface HTMLParagraphElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLParagraphElement;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLPictureElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLPictureElement;
}

export interface HTMLPreElementProps extends HTMLBaseProps {
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLPreElement;
}

export interface HTMLProgressElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLProgressElement;
	readonly value?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
}

export interface HTMLSelectElementProps extends HTMLBaseProps {
	readonly length?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLSelectElement;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly size?: MaybeAtom<number>;
	readonly multiple?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectedIndex?: MaybeAtom<number>;
}

export interface HTMLSlotElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLSlotElement;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLSourceElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLSourceElement;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly sizes?: MaybeAtom<string>;
	readonly srcset?: MaybeAtom<string>;
	readonly media?: MaybeAtom<string>;
}

export interface HTMLSpanElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLSpanElement;
}

export interface HTMLTableElementProps extends HTMLBaseProps {
	readonly border?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLTableElement;
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

export interface HTMLTableSectionElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTableSectionElement;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLTableCellElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: HTMLTableCellElement;
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

export interface HTMLTemplateElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTemplateElement;
	readonly shadowRootClonable?: MaybeAtom<boolean>;
	readonly shadowRootDelegatesFocus?: MaybeAtom<boolean>;
	readonly shadowRootMode?: MaybeAtom<string>;
	readonly shadowRootSerializable?: MaybeAtom<boolean>;
}

export interface HTMLTextAreaElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTextAreaElement;
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

export interface HTMLTimeElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTimeElement;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLTableRowElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTableRowElement;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
}

export interface HTMLTrackElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLTrackElement;
	readonly src?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly default?: MaybeAtom<boolean>;
	readonly kind?: MaybeAtom<string>;
	readonly srclang?: MaybeAtom<string>;
}

export interface HTMLUListElementProps extends HTMLBaseProps {
	readonly [S_NODE_TYPE]?: HTMLUListElement;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLVideoElementProps extends HTMLBaseProps {
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly [S_NODE_TYPE]?: HTMLVideoElement;
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

interface SVGBaseProps {
	readonly clip?: MaybeAtom<string>;
	readonly color?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string>;
	readonly cy?: MaybeAtom<string>;
	readonly d?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<string>;
	readonly display?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly filter?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly offset?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string>;
	readonly order?: MaybeAtom<string>;
	readonly overflow?: MaybeAtom<string>;
	readonly r?: MaybeAtom<string>;
	readonly rotate?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string>;
	readonly ry?: MaybeAtom<string>;
	readonly scale?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly transform?: MaybeAtom<string>;
	readonly visibility?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string>;
	readonly y?: MaybeAtom<string>;
	readonly children?: MaybeAtom<JsxChildren>;
	readonly part?: MaybeAtom<string>;
	readonly class?: undefined;
	readonly lang?: MaybeAtom<string>;
	readonly id?: MaybeAtom<string>;
	readonly scrollLeft?: MaybeAtom<number>;
	readonly scrollTop?: MaybeAtom<number>;
	readonly slot?: MaybeAtom<string>;
	readonly ariaActiveDescendantElement?: MaybeAtom<Element | null>;
	readonly ariaAtomic?: MaybeAtom<string | null>;
	readonly ariaAutoComplete?: MaybeAtom<string | null>;
	readonly ariaBrailleLabel?: MaybeAtom<string | null>;
	readonly ariaBrailleRoleDescription?: MaybeAtom<string | null>;
	readonly ariaBusy?: MaybeAtom<string | null>;
	readonly ariaChecked?: MaybeAtom<string | null>;
	readonly ariaColCount?: MaybeAtom<string | null>;
	readonly ariaColIndex?: MaybeAtom<string | null>;
	readonly ariaColIndexText?: MaybeAtom<string | null>;
	readonly ariaColSpan?: MaybeAtom<string | null>;
	readonly ariaControlsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaCurrent?: MaybeAtom<string | null>;
	readonly ariaDescribedByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDescription?: MaybeAtom<string | null>;
	readonly ariaDetailsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDisabled?: MaybeAtom<string | null>;
	readonly ariaErrorMessageElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaExpanded?: MaybeAtom<string | null>;
	readonly ariaFlowToElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaHasPopup?: MaybeAtom<string | null>;
	readonly ariaHidden?: MaybeAtom<string | null>;
	readonly ariaInvalid?: MaybeAtom<string | null>;
	readonly ariaKeyShortcuts?: MaybeAtom<string | null>;
	readonly ariaLabel?: MaybeAtom<string | null>;
	readonly ariaLabelledByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaLevel?: MaybeAtom<string | null>;
	readonly ariaLive?: MaybeAtom<string | null>;
	readonly ariaModal?: MaybeAtom<string | null>;
	readonly ariaMultiLine?: MaybeAtom<string | null>;
	readonly ariaMultiSelectable?: MaybeAtom<string | null>;
	readonly ariaOrientation?: MaybeAtom<string | null>;
	readonly ariaOwnsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaPlaceholder?: MaybeAtom<string | null>;
	readonly ariaPosInSet?: MaybeAtom<string | null>;
	readonly ariaPressed?: MaybeAtom<string | null>;
	readonly ariaReadOnly?: MaybeAtom<string | null>;
	readonly ariaRelevant?: MaybeAtom<string | null>;
	readonly ariaRequired?: MaybeAtom<string | null>;
	readonly ariaRoleDescription?: MaybeAtom<string | null>;
	readonly ariaRowCount?: MaybeAtom<string | null>;
	readonly ariaRowIndex?: MaybeAtom<string | null>;
	readonly ariaRowIndexText?: MaybeAtom<string | null>;
	readonly ariaRowSpan?: MaybeAtom<string | null>;
	readonly ariaSelected?: MaybeAtom<string | null>;
	readonly ariaSetSize?: MaybeAtom<string | null>;
	readonly ariaSort?: MaybeAtom<string | null>;
	readonly ariaValueMax?: MaybeAtom<string | null>;
	readonly ariaValueMin?: MaybeAtom<string | null>;
	readonly ariaValueNow?: MaybeAtom<string | null>;
	readonly ariaValueText?: MaybeAtom<string | null>;
	readonly role?: MaybeAtom<string | null>;
	readonly autofocus?: MaybeAtom<string>;
	readonly nonce?: MaybeAtom<string | undefined>;
	readonly tabIndex?: MaybeAtom<number>;
	readonly hreflang?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly origin?: MaybeAtom<string>;
	readonly method?: MaybeAtom<string>;
	readonly decoding?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly media?: MaybeAtom<string>;
	readonly textLength?: MaybeAtom<string>;
	readonly accumulate?: MaybeAtom<string>;
	readonly additive?: MaybeAtom<string>;
	readonly "alignment-baseline"?: MaybeAtom<string>;
	readonly amplitude?: MaybeAtom<string>;
	readonly attributeName?: MaybeAtom<string>;
	readonly attributeType?: MaybeAtom<string>;
	readonly azimuth?: MaybeAtom<string>;
	readonly baseFrequency?: MaybeAtom<string>;
	readonly "baseline-shift"?: MaybeAtom<string>;
	readonly baseProfile?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly bias?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string>;
	readonly calcMode?: MaybeAtom<string>;
	readonly clipPathUnits?: MaybeAtom<string>;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<string>;
	readonly "color-interpolation"?: MaybeAtom<string>;
	readonly "color-interpolation-filters"?: MaybeAtom<string>;
	readonly crossorigin?: MaybeAtom<string>;
	readonly diffuseConstant?: MaybeAtom<string>;
	readonly divisor?: MaybeAtom<string>;
	readonly "dominant-baseline"?: MaybeAtom<string>;
	readonly dur?: MaybeAtom<string>;
	readonly dx?: MaybeAtom<string>;
	readonly dy?: MaybeAtom<string>;
	readonly edgeMode?: MaybeAtom<string>;
	readonly elevation?: MaybeAtom<string>;
	readonly end?: MaybeAtom<string>;
	readonly exponent?: MaybeAtom<string>;
	readonly fetchpriority?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string>;
	readonly "fill-rule"?: MaybeAtom<string>;
	readonly filterUnits?: MaybeAtom<string>;
	readonly "flood-color"?: MaybeAtom<string>;
	readonly "flood-opacity"?: MaybeAtom<string>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-stretch"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<string>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string>;
	readonly fr?: MaybeAtom<string>;
	readonly from?: MaybeAtom<string>;
	readonly fx?: MaybeAtom<string>;
	readonly fy?: MaybeAtom<string>;
	readonly "glyph-orientation-horizontal"?: MaybeAtom<string>;
	readonly "glyph-orientation-vertical"?: MaybeAtom<string>;
	readonly gradientTransform?: MaybeAtom<string>;
	readonly gradientUnits?: MaybeAtom<string>;
	readonly "image-rendering"?: MaybeAtom<string>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly intercept?: MaybeAtom<string>;
	readonly k1?: MaybeAtom<string>;
	readonly k2?: MaybeAtom<string>;
	readonly k3?: MaybeAtom<string>;
	readonly k4?: MaybeAtom<string>;
	readonly kernelMatrix?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly lengthAdjust?: MaybeAtom<string>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly "lighting-color"?: MaybeAtom<string>;
	readonly limitingConeAngle?: MaybeAtom<string>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly markerHeight?: MaybeAtom<string>;
	readonly markerUnits?: MaybeAtom<string>;
	readonly markerWidth?: MaybeAtom<string>;
	readonly maskContentUnits?: MaybeAtom<string>;
	readonly maskUnits?: MaybeAtom<string>;
	readonly mode?: MaybeAtom<string>;
	readonly numOctaves?: MaybeAtom<string>;
	readonly operator?: MaybeAtom<string>;
	readonly orient?: MaybeAtom<string>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly path?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string>;
	readonly patternContentUnits?: MaybeAtom<string>;
	readonly patternTransform?: MaybeAtom<string>;
	readonly patternUnits?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<string>;
	readonly points?: MaybeAtom<string>;
	readonly pointsAtX?: MaybeAtom<string>;
	readonly pointsAtY?: MaybeAtom<string>;
	readonly pointsAtZ?: MaybeAtom<string>;
	readonly preserveAlpha?: MaybeAtom<string>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly primitiveUnits?: MaybeAtom<string>;
	readonly radius?: MaybeAtom<string>;
	readonly refX?: MaybeAtom<string>;
	readonly refY?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<string>;
	readonly repeatDur?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly requiredFeatures?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly seed?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<string>;
	readonly side?: MaybeAtom<string>;
	readonly slope?: MaybeAtom<string>;
	readonly spacing?: MaybeAtom<string>;
	readonly specularConstant?: MaybeAtom<string>;
	readonly specularExponent?: MaybeAtom<string>;
	readonly spreadMethod?: MaybeAtom<string>;
	readonly startOffset?: MaybeAtom<string>;
	readonly stdDeviation?: MaybeAtom<string>;
	readonly stitchTiles?: MaybeAtom<string>;
	readonly "stop-color"?: MaybeAtom<string>;
	readonly "stop-opacity"?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string>;
	readonly "stroke-linecap"?: MaybeAtom<string>;
	readonly "stroke-linejoin"?: MaybeAtom<string>;
	readonly "stroke-miterlimit"?: MaybeAtom<string>;
	readonly "stroke-opacity"?: MaybeAtom<string>;
	readonly "stroke-width"?: MaybeAtom<string>;
	readonly surfaceScale?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly tabindex?: MaybeAtom<string>;
	readonly tableValues?: MaybeAtom<string>;
	readonly targetX?: MaybeAtom<string>;
	readonly targetY?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<string>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<string>;
	readonly "text-rendering"?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string>;
	readonly "transform-origin"?: MaybeAtom<string>;
	readonly "unicode-bidi"?: MaybeAtom<string>;
	readonly values?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<string>;
	readonly version?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
	readonly "white-space"?: MaybeAtom<string>;
	readonly "word-spacing"?: MaybeAtom<string>;
	readonly "writing-mode"?: MaybeAtom<string>;
	readonly x1?: MaybeAtom<string>;
	readonly x2?: MaybeAtom<string>;
	readonly xChannelSelector?: MaybeAtom<string>;
	readonly y1?: MaybeAtom<string>;
	readonly y2?: MaybeAtom<string>;
	readonly yChannelSelector?: MaybeAtom<string>;
	readonly z?: MaybeAtom<string>;
	readonly zoomAndPan?: MaybeAtom<string>;
}

export interface SVGAElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGAElement;
}

export interface SVGAnimateElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGAnimateElement;
}

export interface SVGAnimateMotionElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGAnimateMotionElement;
}

export interface SVGAnimateTransformElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGAnimateTransformElement;
}

export interface SVGCircleElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGCircleElement;
}

export interface SVGClipPathElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGClipPathElement;
}

export interface SVGDefsElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGDefsElement;
}

export interface SVGDescElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGDescElement;
}

export interface SVGEllipseElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGEllipseElement;
}

export interface SVGFEBlendElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEBlendElement;
}

export interface SVGFEColorMatrixElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEColorMatrixElement;
}

export interface SVGFEComponentTransferElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEComponentTransferElement;
}

export interface SVGFECompositeElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFECompositeElement;
}

export interface SVGFEConvolveMatrixElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEConvolveMatrixElement;
}

export interface SVGFEDiffuseLightingElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEDiffuseLightingElement;
}

export interface SVGFEDisplacementMapElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEDisplacementMapElement;
}

export interface SVGFEDistantLightElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEDistantLightElement;
}

export interface SVGFEDropShadowElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEDropShadowElement;
}

export interface SVGFEFloodElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEFloodElement;
}

export interface SVGFEFuncAElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncAElement;
}

export interface SVGFEFuncBElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncBElement;
}

export interface SVGFEFuncGElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncGElement;
}

export interface SVGFEFuncRElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncRElement;
}

export interface SVGFEGaussianBlurElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEGaussianBlurElement;
}

export interface SVGFEImageElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEImageElement;
}

export interface SVGFEMergeElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeElement;
}

export interface SVGFEMergeNodeElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeNodeElement;
}

export interface SVGFEMorphologyElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEMorphologyElement;
}

export interface SVGFEOffsetElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEOffsetElement;
}

export interface SVGFEPointLightElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFEPointLightElement;
}

export interface SVGFESpecularLightingElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFESpecularLightingElement;
}

export interface SVGFESpotLightElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFESpotLightElement;
}

export interface SVGFETileElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFETileElement;
}

export interface SVGFETurbulenceElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFETurbulenceElement;
}

export interface SVGFilterElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGFilterElement;
}

export interface SVGForeignObjectElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGForeignObjectElement;
}

export interface SVGGElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGGElement;
}

export interface SVGImageElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGImageElement;
	readonly crossOrigin?: MaybeAtom<string | null>;
}

export interface SVGLineElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGLineElement;
}

export interface SVGLinearGradientElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGLinearGradientElement;
}

export interface SVGMarkerElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGMarkerElement;
}

export interface SVGMaskElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGMaskElement;
}

export interface SVGMetadataElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGMetadataElement;
}

export interface SVGMPathElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGMPathElement;
}

export interface SVGPathElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGPathElement;
}

export interface SVGPatternElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGPatternElement;
}

export interface SVGPolygonElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGPolygonElement;
}

export interface SVGPolylineElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGPolylineElement;
}

export interface SVGRadialGradientElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGRadialGradientElement;
}

export interface SVGRectElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGRectElement;
}

export interface SVGSetElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGSetElement;
}

export interface SVGStopElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGStopElement;
}

export interface SVGStyleElementProps extends SVGBaseProps {
	readonly title?: MaybeAtom<string>;
	readonly [S_NODE_TYPE]?: SVGStyleElement;
	readonly disabled?: MaybeAtom<boolean>;
}

export interface SVGSVGElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGSVGElement;
	readonly currentScale?: MaybeAtom<number>;
}

export interface SVGSwitchElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGSwitchElement;
}

export interface SVGSymbolElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGSymbolElement;
}

export interface SVGTextElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGTextElement;
}

export interface SVGTextPathElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGTextPathElement;
}

export interface SVGTitleElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGTitleElement;
}

export interface SVGTSpanElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGTSpanElement;
}

export interface SVGUseElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGUseElement;
}

export interface SVGViewElementProps extends SVGBaseProps {
	readonly [S_NODE_TYPE]?: SVGViewElement;
}

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

