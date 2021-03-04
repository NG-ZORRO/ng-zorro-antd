---
category: Components
type: Feedback
title: Popconfirm
cover: https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

```ts
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
```

## API

### [nz-popconfirm]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzPopconfirmTitle]` | Title of the confirmation box | `string \| TemplateRef<void>` | - |
| `[nzPopconfirmTrigger]` | Popconfirm trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzPopconfirmPlacement]` | The position of the popconfirm relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'` |
| `[nzPopconfirmOrigin]` | Origin of the popconfirm | `ElementRef` | - |
| `[nzPopconfirmVisible]` | Show or hide popconfirm | `boolean` | `false` |
| `[nzPopconfirmShowArrow]` | Whether popconfirm has arrow | `boolean`  | `true` |
| `(nzPopconfirmVisibleChange)` | Callback of hide or show | `EventEmitter<boolean>` | - |
| `[nzPopconfirmMouseEnterDelay]` | Delay in seconds, before popconfirm is shown on mouse enter | `number` | `0.15` |
| `[nzPopconfirmMouseLeaveDelay]` | Delay in seconds, before popconfirm is hidden on mouse leave | `number` | `0.1` |
| `[nzPopconfirmOverlayClassName]` | Class name of the popconfirm card | `string` | - |
| `[nzPopconfirmOverlayStyle]` | Style of the popconfirm card | `object` | - |
| `[nzPopconfirmBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzCancelText]` | Text of the Cancel button | `string` | `'Cancel'` |
| `[nzOkText]` | Text of the Confirm button | `string` | `'Confirm'` |
| `[nzOkType]` | Button `type` of the Confirm button | `'primary' \| 'ghost' \| 'dashed' \| 'danger' \| 'default'` | `'primary'` |
| `[nzCondition]` | Whether to directly emit `onConfirm` without showing Popconfirm | `boolean` | `false` |
| `[nzIcon]` | Customize icon of confirmation  | `string \| TemplateRef<void>` | - |
| `(nzOnCancel)` | Callback of cancel | `EventEmitter<void>` | - |
| `(nzOnConfirm)` | Callback of confirmation | `EventEmitter<void>` | - |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the node of `[nz-popconfirm]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
