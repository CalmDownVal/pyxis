import { isAtom, mounted, reaction, read, type MaybeAtom } from "@calmdown/pyxis";

export interface BemBlockExtensionType {
	setProp(
		node: HTMLElement,
		name: string,
		value: true,
	): void;
}

export interface BemElementExtensionType {
	setProp(
		node: HTMLElement,
		name: string,
		value: true,
	): void;
}

export interface BemModifierExtensionType {
	setProp(
		node: HTMLElement,
		name: string,
		toggle: MaybeAtom<boolean>,
	): void;
}

export const BemBlockExtension: BemBlockExtensionType = {
	setProp: (node, bemBlockName) => {
		const state = getState(node);
		state.bemBase = bemBlockName;
		node.classList.add(bemBlockName);
	},
};

export const BemElementExtension: BemElementExtensionType = {
	setProp: (node, bemElementName) => {
		const state = getState(node);
		state.bemElementName = bemElementName;
	},
};

export const BemModifierExtension: BemModifierExtensionType = {
	setProp: (node, bemModifierName, toggle) => {
		const state = getState(node);
		if (isAtom(toggle)) {
			reaction(() => {
				if (state.bemBase) {
					node.classList.toggle(`${state.bemBase}--${bemModifierName}`, read(toggle));
				}
				else if (read(toggle)) {
					(state.bemModifiers ??= []).push(bemModifierName);
				}
			});
		}
		else if (toggle) {
			(state.bemModifiers ??= []).push(bemModifierName);
		}
	},
};


interface BemState {
	readonly node: HTMLElement;
	bemBase?: string;
	bemElementName?: string;
	bemModifiers?: string[];
}

const MAX_DEPTH = 10;
const BEM_NODES = new WeakMap<HTMLElement, BemState>();

let pendingNodes: BemState[] = [];
let isUpToDate = true;

function getState(node: HTMLElement) {
	if (isUpToDate) {
		// when state is requested, a new render must have begun
		// -> we're no longer up to date, await mount
		isUpToDate = false;
		mounted(onMounted);
	}

	let state = BEM_NODES.get(node);
	if (!state) {
		BEM_NODES.set(node, state = { node });
		pendingNodes.push(state);
	}

	return state;
}

function onMounted() {
	let i = pendingNodes.length - 1;
	let state;
	let bemBase;

	// render runs bottom-up, so we iterate in reverse to start from topmost nodes
	for (; i >= 0; i -= 1) {
		state = pendingNodes[i];
		if (!state.bemBase && state.bemElementName && (bemBase = findBemBase(state.node))) {
			bemBase += `__${state.bemElementName}`;
			state.bemBase = bemBase;
			state.bemElementName = undefined;
			applyBemClasses(state);
		}
	}

	pendingNodes = [];
	isUpToDate = true;
}

function findBemBase(node: HTMLElement) {
	let depth = 0;
	let current: HTMLElement | null = node;
	let state;

	while (++depth < MAX_DEPTH && (current = current.parentElement)) {
		state = BEM_NODES.get(current);
		if (state) {
			return state.bemBase;
		}
	}

	return undefined;
}

function applyBemClasses(state: BemState) {
	const { node, bemBase, bemModifiers } = state;
	node.classList.add(bemBase!);

	if (!bemModifiers) {
		return;
	}

	const { length } = bemModifiers;
	let i = 0;
	for (; i < length; i += 1) {
		node.classList.add(`${bemBase}--${bemModifiers[i]}`);
	}

	state.bemModifiers = undefined;
}
