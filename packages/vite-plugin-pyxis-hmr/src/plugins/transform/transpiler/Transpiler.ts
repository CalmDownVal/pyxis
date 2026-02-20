import type * as AST from "@oxc-project/types";

import { buildSourcemap, type Edit } from "./sourcemap";

export interface Transform {
	readonly start: number;
	readonly end: number;
	readonly block: TransformBlock;
}

export interface TransformBlock {
	(
		originalCode: string,
		start: number,
		end: number,
	): TransformResult | null;
}

export interface TransformResult {
	readonly newCode: string;
	readonly edits: Edit[];
}

interface Boundary {
	readonly kind: "start" | "end";
	readonly transform: Transform;
	position: number;
}

export class Transpiler {
	private readonly transforms: Transform[] = [];

	public hasTransforms() {
		return this.transforms.length > 0;
	}

	public addTransform(node: AST.Node, block: TransformBlock) {
		this.transforms.push({
			start: node.start,
			end: node.end,
			block,
		});
	}

	public transpile(originalCode: string) {
		// pre-sort transforms
		const sortedTransforms = this.transforms.toSorted((a, b) => (a.start - b.start) || (b.end - a.end));

		// generate start and end boundaries separately, with end bounds in reverse order
		const startBoundaries = sortedTransforms
			.map<Boundary>(transform => ({
				kind: "start",
				position: transform.start,
				transform,
			}));

		const endBoundaries = sortedTransforms
			.map<Boundary>(transform => ({
				kind: "end",
				position: transform.end,
				transform,
			}))
			.reverse();

		// concat and re-sort - relying on stable sort
		// this way nested boundaries will be in the correct order
		const boundaries = startBoundaries
			.concat(endBoundaries)
			.sort((a, b) => a.position - b.position); // stable sort

		// run transformations, gathering edits made to the code
		// transforms apply deep-first, and in order when at the same depth
		const { length } = boundaries;
		const skipped: Boundary[] = [];
		const edits: Edit[] = [];

		let transpiledCode = originalCode;
		let offset = 0;
		let index = 1;
		let prev = boundaries[0];

		for (; index < length; index += 1) {
			let next = boundaries[index];

			if (next.transform === prev.transform) {
				const start = prev.position + offset;
				const end = next.position + offset;

				const originalCode = transpiledCode.slice(start, end);
				const result = next.transform.block(originalCode, next.transform.start, next.transform.end);
				if (result) {
					transpiledCode = (
						transpiledCode.slice(0, start) +
						result.newCode +
						transpiledCode.slice(end)
					);

					offset += result.newCode.length - originalCode.length;
					edits.push(...result.edits);
				}

				const peek = boundaries[index + 1];
				switch (peek?.kind) {
					case "start":
						prev = peek;
						index += 1;
						break;

					case "end":
						if (skipped.length === 0) {
							throw new Error("invalid state: no skipped nodes found");
						}

						prev = skipped.pop()!;
						prev.position -= offset;
						break;
				}
			}
			else {
				if (prev.kind !== "start") {
					throw new Error("invalid state: disordered nodes");
				}

				skipped.push(prev);
				prev.position += offset;
				prev = next;
			}
		}

		return {
			transpiledCode,
			sourcemap: buildSourcemap(originalCode, transpiledCode, edits),
		};
	}
}
