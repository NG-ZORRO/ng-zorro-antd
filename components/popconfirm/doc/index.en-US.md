---
category: Components
type: Feedback
title: Popconfirm
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## API

### [nz-popconfirm]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzCancelText]` | text of the Cancel button | string | `Cancel` |
| `[nzOkText]` | text of the Confirm button | string | `Confirm` |
| `[nzOkType]` | Button `type` of the Confirm button | string | `primary` |
| `[nzTitle]` | title of the confirmation box | string丨`TemplateRef<void>` | - |
| `[nzCondition]` | Whether to directly emit `onConfirm` without showing Popconfirm | boolean | false |
| `(nzOnCancel)` | callback of cancel | `EventEmitter<void>` | - |
| `(nzOnConfirm)` | callback of confirmation | `EventEmitter<void>` | - |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the child node of `nz-popconfirm` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
