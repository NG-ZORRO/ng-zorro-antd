---
category: Components
type: Data Entry
title: Code Editor
cols: 1
experimental: true
---

Support monaco editor in Angular.

## When To Use

- When you want to use monaco editor in Angular.

## API

Install `monaco-editor` in your project first:

```sh
npm install monaco-editor
```

### Dynamic Loading

If you would like to load monaco dynamically (which means you load resources of monaco editor right before you would like to use it), you will need to register assets of monaco editor itself. You can do that by adding these lines in angular.json file:

```diff
"assets": [
+ {
+   "glob": "**/*",
+   "input": "./node_modules/monaco-editor/min/vs",
+   "output": "/assets/vs/"
+ }
],
```

If you deploy resources of monaco editor on CDN, you won't need to modift angular.json. Instead, you should a `NZ_CONFIG_EDITOR_CONFIG` with `assetsRoot` property set. For example, you put resources of monaco editor on https://mycdn.com/assets/vs, you should provide `{ assets: 'https://mycdn.com/assets/vs' }`.

> If you are going to use static loading (which we will explain in detail at the bottom of this page), you don't need to modify angular.json file.

### Static Loading

Sometimes you need to load AMD module dynamically. But since monaco editor's loader patches `window[require]`, you can not use AMD loader like requireJS. In this situation you need to enable static loading.

With help of [monaco-editor-webpack-plguin](https://github.com/microsoft/monaco-editor-webpack-plugin) by Microsoft, you can do that in a convenient way.

1. Please inject a `NZ_CODE_EDITOR_CONFIG` with `useStaticLoading` to be `true`.
2. Create a webpack.partial.js file, and config monaco-editor-webpack-loader.
3. Use custom webpack loader like [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) to load this webpack config.

If you use static loading, you should not add assets of monaco editor to your project by modifying angular.json file.

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
| `useStaticLoading` | Load monaco editor statically | `boolean` | `false` |
