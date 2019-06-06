---
category: Components
type: Data Display
title: Popover
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzPopoverModule } from 'ng-zorro-antd';
```

### [nz-popover]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| nzTitle | Title of the card | `string｜TemplateRef<void>` | - |
| nzTemplate | Used to define the content | `string｜TemplateRef<void>` | - |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the child node of `nz-popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
