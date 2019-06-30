---
category: Components
subtitle: 代码编辑器
type: 进阶
title: Code Editor
cols: 1
---

monaco editor 组件。

## 何时使用

- 需要在网页上渲染 monaco editor 时使用。

## 单独引入此组件
                                     
想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。
                                     
```ts
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
```

## API

使用该组件之前，需要加载 monaco editor 本身的资源。你可以通过 Angular CLI 提供的配置项将这些资源添加到 assets 目录下。例子，在 `angular.json` 中添加：

```diff
"assets": [
+ {
+   "glob": "**/*",
+   "input": "./node_modules/monaco-editor/min/vs",
+   "output": "/assets/vs/"
+ }
],
```

或者通过修改配置项中的 `assetsRoot` 指定资源位置。

### nz-code-editor

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzEditorMode]` | 编辑器的模式 | `normal`\|`diff` | `normal` |
| `[nzOriginalText]` | 展示分界线 | `boolean` | `false` |
| `[nzFullControl]` | 完全控制模式 | `boolean` | `false` | 
| `[nzEditorOption]` | 仅对当前编辑器组件有效的设置 | `any` | `{}` |
| `(nzEditorInitialized)` | 当编辑器组件初始化完毕之后派发事件  | `IEditor` \| `IDiffEditor` | - |

### 懒模式

在懒模式下，当用户拖动组件时 `nzResizeChange` 并不会立即发送事件，而是等到用户松开鼠标时才会触发。

