---
category: Components
type: Data Display
title: Popover
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzPopoverModule } from 'ng-zorro-antd/popover';
```

## API

### [nz-popover]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzPopoverTitle]` | Title of the popover | `string \| TemplateRef<void>` | - |
| `[nzPopoverContent]` | Content of the popover | `string \| TemplateRef<void>` | - |
| `[nzPopoverTrigger]` | Popover trigger mode | `'click' \| 'focus' \| 'hover'` | `'hover'` |
| `[nzPopoverPlacement]` | The position of the popover relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |


Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the child node of `nz-popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
