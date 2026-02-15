import { atom, component, derivation, Iterator, list, read, unmounted, write, type Atom } from "@calmdown/pyxis";
import { Text } from "@calmdown/pyxis-dom";

import { Button } from "~/component/Button";
import { CheckBox } from "~/component/CheckBox";
import { TextInput } from "~/component/TextInput";

interface TodoItem {
	done: Atom<boolean>;
	text: string;
}

export const TestApp = component(() => {
	const todos = list<TodoItem>();
	const todoText = atom("");
	const addTodoItem = () => {
		todos.insertFirst({
			done: atom(false),
			text: read(todoText),
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

	return (
		<>
			<label>
				<Text>What needs to be done ({derivation(() => todos.size())})?</Text>
				<TextInput value={todoText} />
			</label>
			<Button
				disabled={derivation(() => !read(todoText))}
				on:click={addTodoItem}
			>
				<Text>Add</Text>
			</Button>
			<Button
				disabled={derivation(() => todos.size() < 2)}
				on:mousedown={beginShuffle}
				on:mouseup={endShuffle}
			>
				<Text>Shuffle</Text>
			</Button>
			<ul>
				<Iterator source={todos} proxy={[ "done", "text" ]}>
					{todo => (
						<li>
							<CheckBox checked={todo.done}>
								{todo.text}
							</CheckBox>
							<Button on:click={() => todos.remove(todo.proxied)}>
								<Text>Remove</Text>
							</Button>
						</li>
					)}
				</Iterator>
			</ul>
		</>
	);
});
