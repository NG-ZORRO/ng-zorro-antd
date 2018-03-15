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

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| nzTitle | Title of the card | string 丨`TemplateRef<void>` | - |
| nzTemplate | Used to define the content (will not override the nzTitle) | `TemplateRef<void>` | - |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
