import { component, Show, type Atom, type MaybeAtom, type Nil, type Template } from "@calmdown/pyxis";

import "./EditorLayout.css";

export interface EditorLayoutProps {
	main: MaybeAtom<Nil<Template>>;
	toolbar: MaybeAtom<Nil<Template>>;
}

export const EditorLayout = component((props: EditorLayoutProps) => (
	<div cl:editor>
		<main cl:editor__main>
			<Show>{props.main}</Show>
		</main>
		<aside cl:editor__toolbar>
			<div cl:editor__toolbar__card>
				<Show>{props.toolbar}</Show>
			</div>
		</aside>
	</div>
));
