---
category: Components
type: Data Entry
title: Code Editor
cols: 1
experimental: true
description: Code Editor based on monaco-editor.
---

## When To Use

When you want to use monaco editor in Angular.

### Import Style

```less
@import 'node_modules/ng-zorro-antd/code-editor/style/entry.less';
```

## API

Install `monaco-editor` in your project first:

```sh
npm install monaco-editor
```

### Dynamic Loading

If you would like to load monaco dynamically (which means you load resources of monaco editor right before you would like to use it), you will need to register assets of monaco editor itself. You can do that by adding these lines in `angular.json` file:

```diff
"assets": [
+ {
+   "glob": "**/*",
+   "input": "./node_modules/monaco-editor/min/vs",
+   "output": "/assets/vs/"
+ }
],
```

If you deploy resources of monaco editor on CDN, you won't need to modify `angular.json`. Instead, you must configure the `assetsRoot` property via `NzConfigService`. For example, you put resources of monaco editor on https://mycdn.com/assets/vs, you should provide `{ assets: 'https://mycdn.com/assets/vs' }`.

> If you are going to use static loading (which we will explain in detail at the bottom of this page), you don't need to modify angular.json file.

### Static Loading

Sometimes you need to load AMD module dynamically. But since monaco editor's loader patches `window[require]`, you can not use AMD loader like requireJS. In this situation you need to enable static loading.

With help of [monaco-editor-webpack-plugin](https://github.com/microsoft/monaco-editor-webpack-plugin) by Microsoft, you can do that in a convenient way.

1. Provide the value of `NZ_CONFIG` in `app.config.ts` and set `useStaticLoading` in the `codeEditor` property to `true`.
2. Create a `webpack.partial.js` file, and config monaco-editor-webpack-loader.
3. Use custom webpack loader like [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) to load this webpack config.

If you use static loading, you should not add assets of monaco editor to your project by modifying `angular.json` file.

### nz-code-editor

| Parameter               | Description                                                                                                                                        | Type                                               | Default  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| `[nzEditorMode]`        | Mode of monaco editor                                                                                                                              | `normal`\|`diff`                                   | `normal` |
| `[nzLoading]`           | Show the loading spin                                                                                                                              | `boolean`                                          | `false`  |
| `[nzOriginalText]`      | The content of the left editor in `diff` mode                                                                                                      | `boolean`                                          | `false`  |
| `[nzFullControl]`       | Enable full control mode. User should manage `TextModel` manually in this mode                                                                     | `boolean`                                          | `false`  |
| `[nzEditorOption]`      | [Please refer to the doc of monaco editor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) | `IEditorConstructionOptions`                       | `{}`     |
| `[nzToolkit]`           | A placeholder for adding some quick actions                                                                                                        | `TemplateRef<void>`                                | -        |
| `(nzEditorInitialized)` | The event that a code editor is initialized                                                                                                        | `IStandaloneCodeEditor` \| `IStandaloneDiffEditor` | -        |

#### Methods

| Method     | Description                             |
| ---------- | --------------------------------------- |
| `layout()` | Force monaco editor to re-render itself |

### Global Configuration

You can set the default configuration of the `CodeEditor` component through the `set` method of `NzConfigService`.

#### CodeEditorConfig

| Parameter             | Description                                                                                                                                                                                                                                                 | Type                         | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| `assetsRoot`          | Where should the component load resource of monaco editor                                                                                                                                                                                                   | `string` \| `SafeUrl`        | -       |
| `defaultEditorOption` | Default options. [Please refer to the doc of monaco editor](https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IEditorConstructionOptions.html)                                                                                          | `IEditorConstructionOptions` | `{}`    |
| `onLoad`              | The hook invoked when the resource of monaco editor is loaded. At this moment and afterwards the global variable `monaco` is usable (`window.MonacoEnvironment = { globalAPI: true }` is required if monaco-editor's version is greater or equal to 0.22.0) | `() => void`                 | -       |
| `onFirstEditorInit`   | The hook invoked when the first monaco editor is initialized                                                                                                                                                                                                | `() => void`                 | -       |
| `onInit`              | The hook invoked every time a monaco editor is initialized                                                                                                                                                                                                  | `() => void`                 | -       |
| `useStaticLoading`    | Load monaco editor statically                                                                                                                                                                                                                               | `boolean`                    | `false` |
