import { atom, createRenderer, derivation, Iterator, list, read, write, type Atom } from "@calmdown/pyxis";
import { BemBlockExtension, BemElementExtension, BemModifierExtension, ClassListExtension, DomAdapter, EventExtension, Text, type ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

import { Button } from "~/components/Button";
import { CheckBox } from "~/components/CheckBox";
import { TextInput } from "~/components/TextInput";

const extensions = {
	on: EventExtension,
	cl: ClassListExtension,
	blk: BemBlockExtension,
	elm: BemElementExtension,
	mod: BemModifierExtension,
};

const renderer = createRenderer({
	extensions,
	adapter: DomAdapter,
	tick: queueMicrotask,
});

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = ExtendedIntrinsicElements<typeof extensions>;
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

		console.log((todos as any).items.map((it: any) => it.text));
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
				<Iterator source={todos} proxy={[ "done", "text" ] as const}>
					{todo => (
						<li>
							<CheckBox checked={todo.done}>
								{todo.text}
							</CheckBox>
							<Button onclick={() => todos.remove(todo.original)}>
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
