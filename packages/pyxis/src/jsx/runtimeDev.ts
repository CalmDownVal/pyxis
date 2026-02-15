import { Fragment, jsx, jsxs, type Component, type JsxResult, type PropsType } from "@calmdown/pyxis";

interface DevSourceInfo {
	readonly fileName: string;
	readonly lineNumber: number;
	readonly columnNumber: number;
}

const S_DEV_INFO = Symbol.for("pyxis:devInfo");

function jsxDEV(
	tagName: string,
	props: PropsType,
	key?: any,
	isStaticChildren?: boolean,
	source?: DevSourceInfo,
	self?: any,
): JsxResult;

function jsxDEV<TProps extends PropsType>(
	tagName: Component<TProps>,
	props: PropsType,
	key?: any,
	isStaticChildren?: boolean,
	source?: DevSourceInfo,
	self?: any,
): JsxResult;

function jsxDEV(
	componentOrTagName: any,
	props: any,
	key?: any,
	isStaticChildren?: boolean,
	source?: DevSourceInfo,
	_self?: any,
) {
	props[S_DEV_INFO] = source;
	return (isStaticChildren ? jsxs : jsx)(componentOrTagName, props, key);
}

export { Fragment, jsxDEV, S_DEV_INFO, type DevSourceInfo };
