---
category: Components
type: Layout
title: Resizable
cols: 1
experimental: true
description: Resize element.
---

## When To Use

When you want to resize elements.

- Support preview
- Support Grids System
- Support for custom handles and preview styles

### Import Style

```less
@import 'node_modules/ng-zorro-antd/resizable/style/entry.less';
```

## API

### [nz-resizable]

Resizable element the `position` attribute must be one of `'relative' | 'absolute' | 'fixed' |'sticky'`，default is `'relative'`.

```ts
interface NzResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  direction?: NzResizeDirection;
  mouseEvent?: MouseEvent;
}
```

| Property              | Description                                     | Type                                              | Default  |
| --------------------- | ----------------------------------------------- | ------------------------------------------------- | -------- |
| `[nzBounds]`          | Specifies resize boundaries.                    | `'window' \| 'parent' \| ElementRef<HTMLElement>` | `parent` |
| `[nzMaxHeight]`       | Maximum height of resizable element             | `number`                                          | -        |
| `[nzMaxWidth]`        | Maximum width of resizable element              | `number`                                          | -        |
| `[nzMinHeight]`       | Minimum height of resizable element             | `number`                                          | `40`     |
| `[nzMinWidth]`        | Minimum width of resizable element              | `number`                                          | `40`     |
| `[nzGridColumnCount]` | Number of columns(-1 is not grid)               | `number`                                          | `-1`     |
| `[nzMaxColumn]`       | Maximum Column                                  | `number`                                          | -        |
| `[nzMinColumn]`       | Minimum Column                                  | `number`                                          | -        |
| `[nzLockAspectRatio]` | Lock the aspect ratio based on the initial size | `boolean`                                         | `false`  |
| `[nzPreview]`         | Enable preview when resizing                    | `boolean`                                         | `false`  |
| `[nzDisabled]`        | Disable resize                                  | `boolean`                                         | `false`  |
| `(nzResize)`          | Calls when Resizing                             | `EventEmitter<NzResizeEvent>`                     | -        |
| `(nzResizeStart)`     | Calls when resize start                         | `EventEmitter<NzResizeEvent>`                     | -        |
| `(nzResizeEnd)`       | Calls when resize end                           | `EventEmitter<NzResizeEvent>`                     | -        |

### nz-resize-handle

Define handles and directions.

```ts
type NzResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
type NzCursorType = 'window' | 'grid';
```

| Property         | Description                    | Type                | Default         |
| ---------------- | ------------------------------ | ------------------- | --------------- |
| `[nzDirection]`  | Set the direction of resizable | `NzResizeDirection` | `'bottomRight'` |
| `[nzCursorType]` | Cursor type for handle         | `NzCursorType`      | `'window'`      |

### nz-resize-handles

Simpler way to define handles.

```ts
interface NzResizeHandleOption {
  direction: NzResizeDirection;
  cursorType: NzCursorType;
}
```

| Property         | Description                               | Type                                            | Default        |
| ---------------- | ----------------------------------------- | ----------------------------------------------- | -------------- |
| `[nzDirections]` | Allow handle directions or handle options | `<NzResizeDirection \| NzResizeHandleOption>[]` | ALL DIRECTIONS |

### Styling

The Component styles only contain the necessary positional properties and simple styles, you can customize the style by overriding the following class.

- `.nz-resizable` The `nz-resizable` component namespace
- `.nz-resizable-resizing` This class name that is added to `nz-resizable` while resizing
- `.nz-resizable-preview` The ghost element's class name when enable preview
- `.nz-resizable-handle-box-hover` This class name that is added to `nz-resize-handle` while mouse hover on `nz-resizable`
- `.nz-resizable-handle` The `nz-resize-handle` component namespace and directions class name
  - `.nz-resizable-handle-top`
  - `.nz-resizable-handle-left`
  - `.nz-resizable-handle-bottom`
  - `.nz-resizable-handle-right`
  - `.nz-resizable-handle-topRight`
  - `.nz-resizable-handle-topLeft`
  - `.nz-resizable-handle-bottomRight`
  - `.nz-resizable-handle-bottomLeft`
- `.nz-resizable-handle-cursor-type` Cursor type namespace for handle
  - `.nz-resizable-handle-cursor-type-window`
  - `.nz-resizable-handle-cursor-type-grid`
