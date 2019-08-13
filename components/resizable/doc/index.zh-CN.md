---
category: Components
type: 布局
title: Resizable
subtitle: 调整尺寸
cols: 1
experimental: true
---

调整元素尺寸。

- 支持释放前预览提高性能
- 支持栅格系统
- 支持自定义调整手柄和预览样式

## API

### [nz-resizable]

声明在需要调整尺寸的元素上，元素 `position` 属性必须为 `'relative' | 'absolute' | 'fixed' |'sticky'` 之一，默认会自动设置为 `'relative'`。

```ts
interface NzResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent
}
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| [nzBounds] | 调整尺寸的边界 | `'window' \| 'parent' \| ElementRef<HTMLElement>` | `parent` |
| [nzMaxHeight] | 最大高度(超过边界部分忽略) | `number` | - |
| [nzMaxWidth] | 最大宽度(超过边界部分忽略) | `number` | - |
| [nzMinHeight] | 最小高度 | `number` | `40` |
| [nzMinWidth] | 最小宽度 | `number` | `40` |
| [nzGridColumnCount] | 栅格列数(-1 为不栅格) | `number` | `-1` |
| [nzMaxColumn] | 栅格最大列数 | `number` | - |
| [nzMinColumn] | 栅格最小列数 | `number` | - |
| [nzLockAspectRatio] | 锁定宽高比 | `boolean` | `false` |
| [nzPreview] | 开启预览 | `boolean` | `false` |
| (nzResize) | 调整尺寸时的事件 | `EventEmitter<NzResizeEvent>` | - |
| (nzResizeStart) | 开始调整尺寸时的事件 | `EventEmitter<NzResizeEvent>` | - |
| (nzResizeEnd) | 结束调整尺寸时的事件 | `EventEmitter<NzResizeEvent>` | - |

### nz-resize-handle

定义调整手柄及方向。

```ts
type NzResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| [nzDirection] | 调整方向 | `NzResizeDirection` | `'bottomRight'` |

### nz-resize-handles

定义调整手柄的快捷组件。

```ts
const DEFAULT_RESIZE_DIRECTION: NzResizeDirection[] = ['bottomRight', 'topRight', 'bottomLeft', 'topLeft', 'bottom', 'right', 'top', 'left'];
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| [nzDirections] | 需要添加那些调整手柄的方向 | `NzResizeDirection[]` | `DEFAULT_RESIZE_DIRECTION` |

### 样式

组件样式只包含了必要的位置属性和简单的样式，你可以通过覆写下列类名自定义样式。

- `.nz-resizable` `nz-resizable` 组件命名空间
- `.nz-resizable-resizing` 正在调整尺寸时被添加到  `nz-resizable` 上
- `.nz-resizable-preview` 开启预览时幽灵元素的类名
- `.nz-resizable-handle-box-hover` 当鼠标悬停在 `nz-resizable` 上时被添加到 ` nz-resize-handle` 上。
- `.nz-resizable-handle` 调整手柄命名空间及各方向类名
    * `.nz-resizable-handle-top`
    * `.nz-resizable-handle-left`
    * `.nz-resizable-handle-bottom`
    * `.nz-resizable-handle-right`
    * `.nz-resizable-handle-topRight`
    * `.nz-resizable-handle-topLeft`
    * `.nz-resizable-handle-bottomRight`
    * `.nz-resizable-handle-bottomLeft`
