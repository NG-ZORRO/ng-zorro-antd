---
category: Components
type: Data Display
title: Popover
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

```ts
import { NzPopoverModule } from 'ng-zorro-antd/popover';
```

## API

### [nz-popover]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzPopoverTitle]` | Title of the popover | `string \| TemplateRef<void>` | - |
| `[nzPopoverContent]` | Content of the popover | `string \| TemplateRef<void>` | - |
| `[nzPopoverTrigger]` | Popover trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzPopoverPlacement]` | The position of the popover relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| `[nzPopoverOrigin]` | Origin of the tooltip | `ElementRef` | - |
| `[nzPopoverVisible]` | Show or hide popover | `boolean` | `false` |
| `(nzPopoverVisibleChange)` | Callback of hide or show | `EventEmitter<boolean>` | - |
| `[nzPopoverMouseEnterDelay]` | Delay in seconds, before popover is shown on mouse enter | `number` | `0.15` |
| `[nzPopoverMouseLeaveDelay]` | Delay in seconds, before popover is hidden on mouse leave | `number` | `0.1` |
| `[nzPopoverOverlayClassName]` | Class name of the popover card | `string` | - |
| `[nzPopoverOverlayStyle]` | Style of the popover card | `object` | - |
Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the node of `[nz-popover]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
