import { atom, derivation, Iterator, list, pyxis, read, RefExtension, write, type Atom, type ElementsOf } from "@calmdown/pyxis";
import { BemBlockExtension, BemElementExtension, BemModifierExtension, ClassListExtension, DomAdapter, EventExtension, Text } from "@calmdown/pyxis-dom";

import { Button } from "~/components/Button";
import { CheckBox } from "~/components/CheckBox";
import { TextInput } from "~/components/TextInput";

const renderer = pyxis(DomAdapter)
	.extend("on", EventExtension)
	.extend("cl", ClassListExtension)
	.extend("blk", BemBlockExtension)
	.extend("elm", BemElementExtension)
	.extend("mod", BemModifierExtension)
	.extend("ref", RefExtension)
	.build();

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

interface TodoItem {
	done: Atom<boolean>;
	text: string;
}

const TestApp = () => {
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
		</>
	);
};

renderer.mount(document.body, TestApp);
