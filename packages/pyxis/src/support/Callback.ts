export type ArgsMax5<A0 = any, A1 = any, A2 = any, A3 = any, A4 = any> = [ a0?: A0, a1?: A1, a2?: A2, a3?: A3, a4?: A4 ];

/**
 * An object describing a callback holding it and up to 5 forwarded arguments.
 * @internal
 */
export interface Callback<TArgs extends ArgsMax5 = ArgsMax5, TReturn = void> {
	fn: (this: any, ...args: TArgs) => TReturn;
	a0?: TArgs[0];
	a1?: TArgs[1];
	a2?: TArgs[2];
	a3?: TArgs[3];
	a4?: TArgs[4];
}

/**
 * Invokes a callback passing stored arguments and forwarding the return value.
 * @internal
 */
export function invoke<TArgs extends ArgsMax5, TReturn>(callback: Callback<TArgs, TReturn>): TReturn;
export function invoke(callback: Callback<ArgsMax5>) {
	return callback.fn(
		callback.a0,
		callback.a1,
		callback.a2,
		callback.a3,
		callback.a4,
	);
}
