# TipTap-Solid

TipTap integration with Solid.js.

Forked from [vriteio/tiptap-solid](https://github.com/vriteio/tiptap-solid) with the following adjustments:

- Updated to latest TipTap v2 version
- Switched rollup to tsup which uses esbuild backend
- Switched to npm as the main package manager

## Installation

Make sure to have peer-dependencies (`solid-js`, `@tiptap/core` and `@tiptap/pm`) already installed.

```
npm i https://github.com/project-opus/tiptap-solid
```

## Getting started

The integration is based on the official `@tiptap/react` package, that's [documented in the TipTap docs](https://tiptap.dev/installation/react), with several changes necessary to adapt it to Solid.js.

Here are some examples of common use-cases:

### Creating the editor

```javascript
import { SolidEditorContent, useEditor } from "@opus/tiptap-solid";

// ...
const editor = useEditor({
  extensions: [
    // ...
  ],
  // ...
});

// Rendering
<SolidEditorContent editor={editor()} />;
```

### Creating Solid-based Node Views

```javascript
import { SolidNodeViewRenderer } from "@opus/tiptap-solid";

const CustomNode = Node.create({
  // ...
  addNodeView() {
    return SolidNodeViewRenderer(CustomNodeView);
  },
  // ...
});
```

In the `CustomNodeView` component, you can access the Node's state, including attributes, options, etc.

```javascript
import { NodeViewWrapper, useSolidNodeView } from "@opus/tiptap-solid";

const CustomNodeView = () => {
  const { state } = useSolidNodeView();
  const updateAttribute = (key, value) => {
    state().updateAttributes({ [key]: value });
  };
  const options = () => state().extension.options;
  const selected = () => {
    return state().selected;
  };
  const attrs = () => {
    return state().node.attrs;
  };

  return <NodeViewWrapper>{/* Your Node View*/}</NodeViewWrapper>;
};
```

### Creating Bubble Menu

```javascript
// Rendering
<BubbleMenuWrapper
  editor={editor()}
  tippyOptions={
    {
      // ...
    }
  }
  shouldShow={({ editor, state, view, from, to }) => {
    // ...
  }}
>
  {/* Your menu */}
</BubbleMenuWrapper>
```
