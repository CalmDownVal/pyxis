import { atom, component, derivation, Iterator, list, read, unmounted, write } from "@calmdown/pyxis";
import { Text } from "@calmdown/pyxis-dom";
import { Button } from "~/component/Button";
import { CheckBox } from "~/component/CheckBox";
import { TextInput } from "~/component/TextInput";
var _jsxFileName = "C:/Users/cdv/Projects/pyxis/packages/demo-app/src/TestApp.tsx";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "@calmdown/pyxis/jsx-dev-runtime";
let TestApp = component(() => {
	const todos = list(undefined, undefined, "src/TestApp.tsx:todos");
	const todoText = atom("", undefined, "src/TestApp.tsx:todoText");
	const addTodoItem = () => {
		todos.insertFirst({
			done: atom(false, undefined, "src/TestApp.tsx:done"),
			text: read(todoText)
		});
		write(todoText, "");
	};
	const shuffle = () => {
		if (todos.size() < 2) {
			return;
		}
		let i = todos.size();
		while (i > 0) {
			const rng = Math.trunc(Math.random() * i);
			i -= 1;
			const a = Math.min(i, rng);
			const b = Math.max(i, rng);
			if (a === b) {
				continue;
			}
			const B = todos.removeAt(b);
			const A = todos.removeAt(a);
			todos.insertAt(a, B);
			todos.insertAt(b, A);
		}
	};
	let interval = -1;
	const endShuffle = () => {
		shuffle();
		clearInterval(interval);
	};
	const beginShuffle = () => {
		endShuffle();
		interval = setInterval(shuffle, 100);
	};
	unmounted(endShuffle);
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
		/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV(Text, { children: [
			"What needs to be done (",
			derivation(() => todos.size()),
			")?"
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 64,
			columnNumber: 5
		}, this), /* @__PURE__ */ _jsxDEV(TextInput, { value: todoText }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 5
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 4
		}, this),
		/* @__PURE__ */ _jsxDEV(Button, {
			disabled: derivation(() => !read(todoText)),
			"on:click": addTodoItem,
			children: /* @__PURE__ */ _jsxDEV(Text, { children: "Add" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 5
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 67,
			columnNumber: 4
		}, this),
		/* @__PURE__ */ _jsxDEV(Button, {
			disabled: derivation(() => todos.size() < 2),
			"on:mousedown": beginShuffle,
			"on:mouseup": endShuffle,
			children: /* @__PURE__ */ _jsxDEV(Text, { children: "Shuffle" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 5
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 73,
			columnNumber: 4
		}, this),
		/* @__PURE__ */ _jsxDEV("ul", { children: /* @__PURE__ */ _jsxDEV(Iterator, {
			source: todos,
			proxy: ["done", "text"],
			children: (todo) => /* @__PURE__ */ _jsxDEV("li", { children: [/* @__PURE__ */ _jsxDEV(CheckBox, {
				checked: todo.done,
				children: todo.text
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 8
			}, this), /* @__PURE__ */ _jsxDEV(Button, {
				"on:click": () => todos.remove(todo.proxied),
				children: /* @__PURE__ */ _jsxDEV(Text, { children: "Remove" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 8
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 7
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 5
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 80,
			columnNumber: 4
		}, this)
	] }, void 0, true);
}, "src/TestApp.tsx:TestApp");


if (import.meta.hot) {
	const setter = {
		"TestApp": value => { TestApp = value; },
	};
	import.meta.hot.accept(hmrExports => {
		Object.keys(hmrExports).forEach(key => {
			setter[key]?.(hmrExports[key]);
		});
	});
}

export { TestApp };
