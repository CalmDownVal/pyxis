export interface Edit {
	readonly at: number;
	readonly delta: number;
}

const VLQ_ENCODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const VLQ_DECODE = (Array.prototype.reduce<Record<string, number>>).call(
	VLQ_ENCODE,
	(map, char, id) => (map[char] = id, map),
	{},
);

const NO_EDIT: Edit = {
	at: Infinity,
	delta: 0,
};

function encodeVLQ(value: number): string {
	let remainder = value < 0 ? ((-value << 1) | 1) : (value << 1); // zig-zag
	let digit;
	let vlq = "";

	do {
		digit = remainder & 0b11111;
		remainder >>>= 5;
		if (remainder > 0) {
			digit |= 0b100000;
		}

		vlq += VLQ_ENCODE[digit];
	}
	while (remainder > 0);

	return vlq;
}

export function buildSourcemap(
	originalCode: string,
	transpiledCode: string,
	edits: readonly Edit[],
	sourceIndex = 0,
) {
	const sortedEdits = edits
		.filter(it => it.delta !== 0)
		.sort((a, b) => a.at - b.at);

	const original: CodePtr = {
		code: originalCode,
		at: 0,
		line: 0,
		column: 0,
	};

	const transpiled: CodePtr = {
		code: transpiledCode,
		at: 0,
		line: 0,
		column: 0,
	};

	let mapping = "";
	let needsSeparator = false;

	const sourceIndexVLQ = encodeVLQ(sourceIndex);
	const addSegment = (tColDelta: number, oLineDelta: number, oColDelta: number) => {
		mapping += `${needsSeparator ? "," : ""}${encodeVLQ(tColDelta)}${sourceIndexVLQ}${encodeVLQ(oLineDelta)}${encodeVLQ(oColDelta)}`;
		needsSeparator = true;
	};

	const addLine = () => {
		mapping += ";";
		needsSeparator = false;
	};

	let oPrevLine = 0;
	let oPrevCol = 0;
	let tPrevCol = 0;
	let editIndex = 0;
	let offset = 0;

	while (transpiled.at < transpiledCode.length) {

		addSegment(transpiled.column - tPrevCol, original.line - oPrevLine, original.column - oPrevCol);
		oPrevLine = original.line;
		oPrevCol = original.column;
		tPrevCol = transpiled.column;

		const edit = sortedEdits[editIndex] ?? NO_EDIT;
		const skip = advanceTo(transpiled, edit.at + offset, true);

		// advance past unchanged code
		if (skip > 0) {
			advanceTo(original, original.at + skip);
			addSegment(transpiled.column - tPrevCol, original.line - oPrevLine, original.column - oPrevCol);
			oPrevLine = original.line;
			oPrevCol = original.column;
			tPrevCol = transpiled.column;
		}

		// reached the next edit
		if (original.at === edit.at) {
			if (edit.delta > 0) {
				// transpiled code inserted
				const limit = transpiled.at + edit.delta;
				while (true) {
					advanceTo(transpiled, limit, true);
					if (transpiled.at < limit) {
						addLine();
						advanceNewLine(transpiled);
						tPrevCol = 0;
					}
					else {
						break;
					}
				}

				if (transpiled.column > tPrevCol) {
					addSegment(transpiled.column - tPrevCol, 0, 0);
					tPrevCol = transpiled.column;
				}
			}
			else {
				// original code deleted
				advanceTo(original, edit.at - edit.delta);
				addSegment(0, original.line - oPrevLine, original.column - oPrevCol);
				oPrevLine = original.line;
				oPrevCol = original.column;
			}

			offset += edit.delta;
			editIndex += 1;
		}
		else {
			addLine();
			advanceNewLine(original);
			advanceNewLine(transpiled);
			tPrevCol = 0;
		}
	}

	return mapping;
}

export function replaceSourceIndex(mapping: string, newSourceIndex: number) {
	const newSourceIndexVLQ = encodeVLQ(newSourceIndex);
	const { length } = mapping;
	let result = "";
	let index = 0;

	const endOfSegmentOrLine = () => {
		const char = mapping[index];
		if (char !== "," && char !== ";") {
			return false;
		}

		result += char;
		index += 1;
		return true;
	};

	const nextValue = () => {
		const anchor = index;
		while (index < length && ((VLQ_DECODE[mapping[index++]] ?? 0) & 0b100000) > 0) ;

		return mapping.slice(anchor, index);
	};

	while (index < length) {
		if (endOfSegmentOrLine()) {
			continue; // empty line
		}

		result += nextValue(); // transpiled column
		if (endOfSegmentOrLine()) {
			continue; // single field segment
		}

		nextValue();
		result += newSourceIndexVLQ; // replaced source index
		result += nextValue(); // original line
		result += nextValue(); // original column

		if (endOfSegmentOrLine()) {
			continue; // four fields segment
		}

		result += nextValue(); // name index
		endOfSegmentOrLine();
	}

	return result;
}

interface CodePtr {
	readonly code: string;
	at: number;
	line: number;
	column: number;
}

const RE_NEWLINE = /\r?\n/g;

function advanceTo(ptr: CodePtr, to: number, stopAtEol = false) {
	const { at: startAt, code } = ptr;
	const { length } = code;
	let { at, line, column } = ptr;
	let match;

	while (at < to && at < length) {
		RE_NEWLINE.lastIndex = at;
		if (match = RE_NEWLINE.exec(code)) {
			if (match.index < to) {
				if (stopAtEol) {
					column += match.index - at;
					at = match.index;
					break;
				}
				else {
					line += 1;
					column = 0;
					at = match.index + match[0].length;
				}
			}
			else {
				column += to - at;
				at = to;
				break;
			}
		}
		else {
			const stop = Math.min(to, length);
			column += stop - at;
			at = stop;
		}
	}

	ptr.at = at;
	ptr.line = line;
	ptr.column = column;
	return at - startAt;
}

function advanceNewLine(ptr: CodePtr) {
	const { at, code } = ptr;
	switch (code[at]) {
		case "\n":
			ptr.at += 1;
			break;

		case "\r":
			if (code[at + 1] === "\n") {
				ptr.at += 2;
				break;
			}

			// fall through

		default:
			throw new Error("invalid state: not at a newline");
	}

	ptr.line += 1;
	ptr.column = 0;
}
