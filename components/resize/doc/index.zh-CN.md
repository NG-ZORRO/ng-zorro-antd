---
category: Components
subtitle: 缩放
type: 进阶
title: Resize
---

缩放组件。

## 何时使用

- 给子元素分配父元素空间时使用。

## 单独引入此组件
                                     
想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。
                                     
```ts
import { NzResizeModule } from 'ng-zorro-antd/resize';
```

## API

### nz-resize

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzBaseElement]` | 组件的父元素 | `ElementRef` | - |
| `[nzShowBorder]` | 展示分界线 | `boolean` | `false` |
| `[nzMode]` | 垂直或水平的分割线 | `'vertical'` \| `'horizontal'` | `'vertical'` | 
| `[nzHidden]` | 隐藏组件 | `boolean` | `false` |
| `[nzMin]` | `nzLeft` 或 `nzTop` 的最小值 | `number` | `0` |
| `[nzMax]`  | `nzLeft` 或 `nzTop` 的最大值 | `number` | `300` |
| `[nzTop]` | 组件到其父元素顶部的距离（仅当 `nzMode` 为 `horizontal` 时有效）| `number` | `0` |
| `[nzLeft]` | 组件到其父元素顶部的距离（仅当 `nzMode` 为 `vertical` 时有效） | `number` | - |
| `[nzLazy]` | 使用懒模式 | `boolean` | `false` |
| `(nzResizeStart)` | 当用户按下鼠标开始拖动时触发  | `NzResizePosition` | - |
| `(nzResizeChange)` | 当用户拖动时触发  | `NzResizePosition` | - |
| `(nzResizeEnd)` | 当用户释放光标时触发  | `NzResizePosition` | - |

### 懒模式

在懒模式下，当用户拖动组件时 `nzResizeChange` 并不会立即发送事件，而是等到用户松开鼠标时才会触发。

