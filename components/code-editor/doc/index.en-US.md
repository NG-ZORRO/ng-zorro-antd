---
category: Components
type: Date Entry
title: Code Editor
cols: 1
experimental: true
---

Support monaco editor in Angular.

## When To Use

- When you want to use monaco editor in Angular.

## API

Before using this component, you should load resources of monaco editor itself. You can load these resources with Angular CLI. Write this configuration in angular.json:

```diff
"assets": [
+ {
+   "glob": "**/*",
+   "input": "./node_modules/monaco-editor/min/vs",
+   "output": "/assets/vs/"
+ }
],
```

Or you can provide an `assetsRoot` to determine where should the component load resources of monaco editor.

And don't forget to install `monaco-editor`.

```sh
npm install monaco-editor
```

### nz-code-editor

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzEditorMode]` | Mode of monaco editor | `normal`\|`diff` | `normal` |
| `[nzLoading]` | Show the loading spin | `boolean` | `false` |
| `[nzOriginalText]` | The content of the left editor in `diff` mode | `boolean` | `false` |
| `[nzFullControl]` | Enable full control mode. User should manage `TextModel` manually in this mode | `boolean` | `false` |
| `[nzEditorOption]` | [Please refer to the doc of monaco editor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) | `IEditorConstructionOptions` | `{}` |
| `[nzToolkit]` | A placeholder for adding some quick actions | `TemplateRef<void>` | - |
| `(nzEditorInitialized)` | The event that a code editor is initialized  | `IEditor` \| `IDiffEditor` | - |

#### Methods

| Method | Description |
| --- | --- |
| `layout()` | Force monaco editor to re-render itself |

### NZ_CODE_EDITOR_CONFIG

You can inject an object that implements `NzCodeEditorConfig` with the injection token `NZ_CODE_EDITOR_CONFIG`.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `assetsRoot` | Where should the component load resource of monaco editor | `string` \| `SageUrl` | - |
| `defaultEditorOption` | Default options. [Please refer to the doc of monaco editor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) | `IEditorConstructionOptions` | `{}` |
| `onLoad` | The hook invoked when the resource of monaco editor is loaded. At this moment and afterwards the global variable `monaco` is usable | `() => void` | - |
| `onFirstEditorInit` | The hook invoked when the first monaco editor is initialized | `() => void` | - |
| `onInit` | The hook invoked every time a monaco editor is initialized | `() => void`  | - |

