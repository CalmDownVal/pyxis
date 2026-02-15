import type { PyxisHmrPluginOptions } from "~/types";

import type { CodeTransform, SymbolMeta } from "./types";

interface Boundary {
	readonly transform: CodeTransform;
	readonly position: number;
}

export function applyTransforms(originalCode: string, transforms: readonly CodeTransform[]) {
	// pre-sort transforms
	const sortedTransforms = transforms.toSorted((a, b) => (a.node.start - b.node.start) || (a.node.end - b.node.end));

	// generate start and end boundaries separately, with end bounds in reverse order
	const startBoundaries = sortedTransforms
		.map<Boundary>(transform => ({
			transform,
			position: transform.node.start,
		}));

	const endBoundaries = sortedTransforms
		.map<Boundary>(transform => ({
			transform,
			position: transform.node.end,
		}))
		.reverse();

	// concat and re-sort - relying on stable sort
	// this way nested boundaries will be in the correct order
	const boundaries = startBoundaries
		.concat(endBoundaries)
		.sort((a, b) => a.position - b.position); // stable sort

	const { length } = boundaries;
	const skipped: Boundary[] = [];

	let newCode = originalCode;
	let preOffset = 0;
	let postOffset = 0;
	let index = 1;
	let prev = boundaries[0];

	for (; index < length; index += 1) {
		let next = boundaries[index];
		if (next.transform !== prev.transform) {
			skipped.push(prev);
			prev = next;
		}
		else {
			do {
				const start = prev.position + preOffset;
				const end = next.position + preOffset + postOffset;

				const originalCode = newCode.slice(start, end);
				const transformedCode = next.transform.block(originalCode);
				newCode = (
					newCode.slice(0, start) +
					transformedCode +
					newCode.slice(end)
				);

				postOffset += transformedCode.length - originalCode.length;

			}
			while ((prev = skipped.pop()!) && (next = boundaries[++index]));

			preOffset += postOffset;
			postOffset = 0;

			prev = boundaries[++index];
		}
	}

	return newCode;
}

export function generatePreamble(options: Required<PyxisHmrPluginOptions>) {
	return `\
import * as __hmrPyxis from ${JSON.stringify(options.pyxisModule)};
import __hmrRegistry from ${JSON.stringify(__REGISTRY_MODULE__)};

function __hmrWrap(original, id) {
	if (!import.meta.hot) {
		return original;
	}

	__hmrRegistry.current.upsert(id, original);
	return (jsx, parent) => {
		const template = component => ({ ...jsx, [__hmrPyxis.S_COMPONENT]: component });
		const group = __hmrPyxis.split(parent);
		__hmrPyxis.unmounted(
			__hmrRegistry.current.subscribe(id, current => {
				__hmrPyxis.unmount(group);
				__hmrPyxis.mount(group, template, current);
			}),
		);
	};
}

`;
}

export function generatePostamble(exportedSymbols: readonly SymbolMeta[]) {
	let setters = "\n";
	let exports = " ";

	for (const symbol of exportedSymbols) {
		setters += `\t\t${JSON.stringify(symbol.exportedAs)}: value => { ${symbol.name} = value; },\n`;
		if (symbol.exportedAs !== symbol.name) {
			exports += `${symbol.name} as ${symbol.exportedAs}, `;
		}
		else {
			exports += `${symbol.name}, `;
		}
	}

	return `

if (import.meta.hot) {
	const set = {${setters}\t};
	import.meta.hot.accept(newExports => {
		Object.keys(newExports).forEach(key => {
			set[key]?.(newExports[key]);
		});
	});
}

export {${exports}};
`;
}
