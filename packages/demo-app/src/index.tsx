import { atom, component, derivation, Iterator, list, pyxis, read, RefExtension, write, type Atom, type ElementsOf, type JsxResult } from "@calmdown/pyxis";
import { ClassListExtension, DomAdapter, EventExtension, CssStyleExtension, Text } from "@calmdown/pyxis-dom";

import { Button } from "~/component/Button";
import { CheckBox } from "~/component/CheckBox";
import { TextInput } from "~/component/TextInput";
import { ContextTest } from "./ctx";

const renderer = pyxis(DomAdapter)
	.extend("cl", ClassListExtension)
	.extend("on", EventExtension)
	.extend("ref", RefExtension)
	.extend("css", CssStyleExtension)
	.build();

declare global {
	namespace JSX {
		type Element = JsxResult;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

interface TodoItem {
	done: Atom<boolean>;
	text: string;
}

const TestApp = component(() => {
	const todos = list<TodoItem>();
	const todoText = atom("");
	const addTodoItem = () => {
		todos.insertFirst({
			done: atom(false),
			text: read(todoText),
		});

		write(todoText, "");
	};

	const swapRandom = () => {
		if (todos.size < 2) {
			return;
		}

		const i0 = Math.trunc(Math.random() * todos.size);
		const t0 = todos.removeAt(i0);

		const i1 = Math.trunc(Math.random() * todos.size);
		const t1 = todos.removeAt(i1);

		todos.insertAt(i0 <= i1 ? i0 : i0 - 1, t1);
		todos.insertAt(i1 <= i0 ? i1 : i1 - 1, t0);
	};

	return (
		<>
			<label>
				<Text>What needs to be done ({todos.sizeAtom})?</Text>
				<TextInput value={todoText} />
			</label>
			<Button
				disabled={derivation(() => !read(todoText))}
				onclick={addTodoItem}
			>
				<Text>Add</Text>
			</Button>
			<Button
				disabled={derivation(() => read(todos.sizeAtom) < 2)}
				onclick={swapRandom}
			>
				<Text>Swap</Text>
			</Button>
			<ul>
				<Iterator source={todos} proxy={[ "done", "text" ]}>
					{todo => (
						<li>
							<CheckBox checked={todo.done}>
								{todo.text}
							</CheckBox>
							<Button onclick={() => todos.remove(todo.proxied)}>
								<Text>Remove</Text>
							</Button>
						</li>
					)}
				</Iterator>
			</ul>
			<ContextTest />
		</>
	);
});

renderer.mount(document.body, () => <TestApp />);
