---
category: Components
type: Data Display
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
```

## API

### [nz-tooltip]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTooltipTitle]` | The text shown in the tooltip | `string \| TemplateRef<void>` | - |
| `[nzTooltipTrigger]` | Tooltip trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzTooltipPlacement]` | The position of the tooltip relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |

> From version 8.2.0, API without prefix above, e.g `nzTitle` is deprecated, please upgrade as soon as possible.

### Common API

The following APIs are shared by `nz-tooltip`, `nz-popconfirm`, `nz-popover`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzMouseEnterDelay]` | Delay in seconds, before tooltip is shown on mouse enter | `number` | `0.15` |
| `[nzMouseLeaveDelay]` | Delay in seconds, before tooltip is hidden on mouse leave | `number` | `0.1` |
| `[nzOverlayClassName]` | Class name of the tooltip card | `string` | - |
| `[nzOverlayStyle]` | Style of the tooltip card | `object` | - |
| `[nzVisible]` | Whether the floating tooltip card is visible or not | `boolean` | `false` |
| `(nzVisibleChange)` | Callback executed when visibility of the tooltip card is changed | `EventEmitter<boolean>` | - |

| Method | Description |
| --- | --- |
| `show` | Show |
| `hide` | Hide |
| `updatePosition` | Update position |

## Note

Please ensure that the child node of `nz-tooltip` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
