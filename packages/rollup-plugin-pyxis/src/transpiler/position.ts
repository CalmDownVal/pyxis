interface CodePosition {
	readonly code: string;
	at: number;
	line: number;
	column: number;
}

const RE_NEWLINE = /\r?\n/g;

export function createPosition(code: string): CodePosition {
	return {
		code,
		at: 0,
		line: 0,
		column: 0,
	};
}

export function positionAt(code: string, at: number) {
	const pos = createPosition(code);
	advanceTo(pos, at);
	return pos;
}

export function advanceTo(pos: CodePosition, to: number, stopAtEol = false) {
	const { at: startAt, code } = pos;
	const { length } = code;
	let { at, line, column } = pos;
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

	pos.at = at;
	pos.line = line;
	pos.column = column;
	return at - startAt;
}

export function advanceNewLine(pos: CodePosition) {
	const { at, code } = pos;
	switch (code[at]) {
		case "\n":
			pos.at += 1;
			break;

		case "\r":
			if (code[at + 1] === "\n") {
				pos.at += 2;
				break;
			}

			// fall through

		default:
			throw new Error("invalid state: not at a newline");
	}

	pos.line += 1;
	pos.column = 0;
}
