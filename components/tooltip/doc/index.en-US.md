---
category: Components
type: Data Display
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | The text shown in the tooltip | string丨`TemplateRef<void>` | - |

### Common API

The following APIs are shared by `nz-tooltip`, `nz-popconfirm`, `nz-popover`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzMouseEnterDelay]` | Delay in seconds, before tooltip is shown on mouse enter | number | 0 |
| `[nzMouseLeaveDelay]` | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 |
| `[nzOverlayClassName]` | Class name of the tooltip card | string | - |
| `[nzOverlayStyle]` | Style of the tooltip card | object | - |
| `[nzPlacement]` | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |
| `[nzTrigger]` | Tooltip trigger mode | `hover`  |  `focus`  |  `click` | `hover` |
| `[nzVisible]` | Whether the floating tooltip card is visible or not | boolean | `false` |
| `(nzVisibleChange)` | Callback executed when visibility of the tooltip card is changed | `EventEmitter<boolean>` | - |

## Note

Please ensure that the child node of `nz-tooltip` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
