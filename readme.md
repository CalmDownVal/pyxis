# Pyxis

## Key Concepts

Pyxis is a MVVM framework based around JSX and function style components. When a
component is first being mounted, it receives a props object from which a view
model is constructed. This is in turn used to render descendant components.

This only happens once in a component's lifetime. Subsequent updates to the
rendered content are only possible via reactions to changes in the component's
observable state. With these constraints, Pyxis is able to build an efficient
dependency graph and only dispatch updates to areas that require a change.

### Atom

The building block of any observable state is an Atom. It is a thin wrapper
around any arbitrary value that can be changed at any time. Atoms don't expose
their value directly, instead it is necessary to use the `read`, `write`,
`update` and `peek` functions to do so.

#### Read, Peek

The read and peek functions check whether their input is an Atom and read its
value. Non-atom inputs are returned as-is.

The read variant will report access, automatically setting up observers when
used within an effect or derive blocks, the peek variant will not.

```ts
const count1 = atomOf(0);
const count2 = atomOf(0);

read(count1); // returns 0
read(123); // returns 123

effect(() => {
  console.log(
    read(count1), // observed
    peek(count2), // not observed
  );
});
```

#### Write

The write function checks whether its input is an Atom and writes its value. The
new value of the Atom is returned. Note that attempting to write readonly atoms
will quietly fail and their current, unchanged value will be returned. For
non-atom inputs this function is a no-op and returns the input as-is.

```ts
const count = atomOf(0);
const count2 = derived(() => read(count) * 2); // readonly atom

write(count, 1); // writes count, returns 1
write(count2, 1); // does nothing, returns 2
write(123, 1); // does nothing, returns 123
```

#### Update

The update function works similarly to write, except it instead uses a transform
function to update the atom's value derived from its current one. Like write,
the new value of the atom is returned. For non-atom inputs, this function is a
no-op and returns the input as-is.

Update does *not* report read access, even when used within an effect or derive
block, i.e. it does not set up observers.

```ts
const count = atomOf(0);
const count2 = derived(() => read(count) * 2); // readonly atom

const increment = (current: number) => current + 1;

update(count, increment); // increments count, returns 1
update(count2, increment); // does nothing, returns 2
update(123, increment); // does nothing, returns 123
```

### Derivations

Derivations are a special, readonly type of atoms. Their value is derived from
other atoms and get updated when a change is observed. Derivations are lazy and
won't re-run any calculation until their value is accessed.

```ts
const totalPrice = derived(() => read(unitPrice) * read(quantity));
```

### Effects

Effects are blocks of code that automatically re-run whenever a change is
observed. Effect blocks are synchronously executed upon creation and then
eagerly re-run with updates.

```ts
effect(() => {
  console.log("counter is", read(counter));
});
```

Effects may also return a teardown function to dispose of resources from the
previous run.

### Mount and Unmount

Components may declare blocks of code to run once fully mounted, or once they're
about to be unmounted.

```ts
mounted(() => console.log("mounted"));
unmounted(() => console.log("unmounted"));

// combined form
mounted(() => {
  console.log("mounted");
  return () => console.log("unmounted");
});
```

### Contexts

To propagate contextual data from ancestors to descendants without "prop
drilling," contexts can be used. This is especially useful when descendants need
a contextual value while nested in other components oblivious to it. Using
contexts avoids polluting the intermediate components with data they don't need.

```ts
const CounterContext = createContext<number>();
```

With the context object ready, it can now be used in components. By requesting
a provider atom, the enclosing component automatically acts as a provider of
that context. All children and their descendants rendered by that component will
gain access to this data. A single component can be a provider of multiple
contexts.

```ts
// request a provider atom for the given context, initialized to 0
const counter = providerOf(CounterContext, 0);

// freely write the context atom as needed
write(counter, 1);
```

Accessing contextual data is done similarly by requesting a consumer atom. This
results in a read-only Atom.

```ts
// get a consumer atom for the given context, read-only
const counter = consumerOf(CounterContext);
```

### Rendering Conditionally

Because Pyxis doesn't re-run component code, conditionally showing or hiding
content using patterns common in frameworks like React won't work as expected.

```tsx
return (
  <>
    {read(counter) < 10 ? null : "That's too many!"}
  </>
);
```

While the above code works and will correctly render when first mounted, it
won't react to changes of the counter, even if it is an atom. Instead, to render
reactive conditional content, a builtin `<Show>` component is used.

```tsx
return (
  <Show when={derived(() => read(counter) >= 10)}>
    That's too many!
  </Show>
);
```

The above example will dynamically show and hide the line of text depending on
the value of the counter atom.

### Rendering Lists

Because Pyxis doesn't re-run component code, rendering lists using patterns
common in frameworks like React won't work as expected.

```tsx
const items = [ "foo", "bar" ];
return (
  <ul>
    {items.map(it => (
      <li>{it}</li>
    ))}
  </ul>
);
```

While the above code works and will correctly render each item of the source
array, such a list will remain static and won't react to any changes of the
array. To get reactive lists, a builtin observable list is provided with a
matching `<Iterator>` component.

```tsx
const items = listOf([ "foo", "bar" ]);
return (
  <ul>
    <Iterator source={items}>
      {it => (
        <li>{it}</li>
      )}
    </Iterator>
  </ul>
);
```

Now, changes can be made to the items list via its own methods and the rendered
list will update as expected. This system helps Pyxis do fine grained updates
even on lists without diffing or reliance on unique keys to distinguish
individual items.

### Extensions

Pyxis supports extensions which add custom namespaced props to native elements
adding new behaviors in a streamlined way. For example the DOM adapter offers
the `ClassListExtension` allowing CSS classes to be set via the ClassList API
instead of the cumbersome method of concatenating all classes to a string and
setting the class prop.

```ts
// add extensions when building the Pyxis renderer
const renderer = pyxis(DomAdapter)
  .extend("cl", ClassListExtension) // "cl" will be the extension's namespace
  .build();

// when using extensions and TypeScript, it is necessary to declare JSX types
// manually instead of the defaults provided by adapters
declare global {
  namespace JSX {
    type Element = JsxResult;
    type IntrinsicElements = ElementsOf<typeof renderer>;
  }
}
```

After the renderer and types are set up, any native element can use extensions:

```tsx
interface CheckBoxProps {
  checked: Atom<boolean>;
}

const CheckBox = component((props: CheckBoxProps) => (
  <input
    type="checkbox"
    checked={props.checked}
    cl:checkbox // the "checkbox" class, always present
    cl:checked={props.checked} // the "checked" class, toggled by props.checked
  />
));
```
