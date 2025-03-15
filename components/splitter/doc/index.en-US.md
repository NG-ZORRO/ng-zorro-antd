---
category: Components
type: Layout
title: Splitter
tag: 19.2.0
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
---

Split panels to isolate.

## When To Use

Can be used to separate areas horizontally or vertically. When you need to freely drag and adjust the size of each area.
When you need to specify the maximum and minimum width and height of an area.

```ts
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
```

## API

### nz-splitter

| 参数                | 说明                              | 类型                           | 默认值            | 全局配置 |
|-------------------|---------------------------------|------------------------------|----------------|------|
| `[nzLayout]`      | Layout direction                | `'horizontal' \| 'vertical'` | `'horizontal'` |      |
| `[nzLazy]`        | Lazy Mode                       | `boolean`                    | `false`        |      |
| `(nzResizeStart)` | Callback before dragging starts | `EventEmitter<number[]>`     | -              |      |
| `(nzResize)`      | Panel size change callback	     | `EventEmitter<number[]>`     | -              |      |
| `(nzResizeEnd)`   | Drag end callback	              | `EventEmitter<number[]>`     | -              |      |

### nz-splitter-panel

| 参数                | 说明                                                              | 类型                                               | 默认值     | 全局配置 |
|-------------------|-----------------------------------------------------------------|--------------------------------------------------|---------|------|
| `[nzDefaultSize]` | Initial panel size support number for px or 'percent%' usage    | `number \| string`                               | -       |      |
| `[nzMin]`         | Minimum threshold support number for px or 'percent%' usage     | `number \| string`                               | -       |      |
| `[nzMax]`         | Maximum threshold support number for px or 'percent%' usage     | `number \| string`                               | -       |      |
| `[nzSize]`        | Controlled panel size support number for px or 'percent%' usage | `number \| string`                               | -       |      |
| `[nzCollapsible]` | Quick folding                                                   | `boolean  \| { start?: boolean; end?: boolean }` | `false` |      |
| `[nzResizable]`   | Whether to enable drag and drop                                 | `boolean`                                        | `true`  |      |
