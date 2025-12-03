---
category: Components
type: Feedback
title: Popconfirm
cover: 'https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg'
description: Pop up a bubble confirmation box for an action.
---

## When To Use

A simple and compact dialog is used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static-popped full-screen confirm modal.

## API

### [nz-popconfirm]

| Param                              | Description                                                         | Type                                                                                                                                                                              | Default value |
| ---------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `[nzPopconfirmArrowPointAtCenter]` | Arrow point at center of the origin                                 | `boolean`                                                                                                                                                                         | `false`       |
| `[nzPopconfirmTitle]`              | Title of the confirmation box                                       | `string \| TemplateRef<void>`                                                                                                                                                     | -             |
| `[nzPopconfirmTitleContext]`       | The context of confirmation box title                               | `object`                                                                                                                                                                          | -             |
| `[nzPopconfirmTrigger]`            | Popconfirm trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null`                                                                                                                                           | `'click'`     |
| `[nzPopconfirmPlacement]`          | The position of the popconfirm relative to the target               | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'`       |
| `[nzPopconfirmOrigin]`             | Origin of the popconfirm                                            | `ElementRef`                                                                                                                                                                      | -             |
| `[nzPopconfirmVisible]`            | Show or hide popconfirm                                             | `boolean`                                                                                                                                                                         | `false`       |
| `[nzPopconfirmShowArrow]`          | Whether popconfirm has arrow                                        | `boolean`                                                                                                                                                                         | `true`        |
| `(nzPopconfirmVisibleChange)`      | Callback of hide or show                                            | `EventEmitter<boolean>`                                                                                                                                                           | -             |
| `[nzPopconfirmMouseEnterDelay]`    | Delay in seconds, before popconfirm is shown on mouse enter         | `number`                                                                                                                                                                          | `0.15`        |
| `[nzPopconfirmMouseLeaveDelay]`    | Delay in seconds, before popconfirm is hidden on mouse leave        | `number`                                                                                                                                                                          | `0.1`         |
| `[nzPopconfirmOverlayClassName]`   | Class name of the popconfirm card                                   | `string`                                                                                                                                                                          | -             |
| `[nzPopconfirmOverlayStyle]`       | Style of the popconfirm card                                        | `object`                                                                                                                                                                          | -             |
| `[nzPopconfirmBackdrop]`           | whether or not the overlay should attach a backdrop                 | `boolean`                                                                                                                                                                         | `false`       |

| Param                   | Description                                                                                                                                                     | Type                                                                 | Default value | Global Config | Version |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------- | ------------- | ------- |
| `[nzCancelText]`        | Text of the Cancel button (Deprecated, please use nzCancelButtonProps instead)                                                                                  | `string`                                                             | `'Cancel'`    | -             |
| `[nzOkText]`            | Text of the Confirm button (Deprecated, please use nzOkButtonProps instead)                                                                                     | `string`                                                             | `'Confirm'`   | -             |
| `[nzOkType]`            | Button `type` of the Confirm button (Deprecated, please use nzOkButtonProps instead)                                                                            | `'primary' \| 'ghost' \| 'dashed' \| 'danger' \| 'default'`          | `'primary'`   | -             |
| `[nzOkDanger]`          | Danger status of the OK button. <i>Consistent with the `nzDanger` of the `nz-button`.</i> (Deprecated, please use nzOkButtonProps instead)                      | `boolean`                                                            | `false`       | -             |
| `[nzOkDisabled]`        | prevents a user from interacting with the OK button. <i>Consistent with the `disabled` of the `nz-button`.</i> (Deprecated, please use nzOkButtonProps instead) | `boolean`                                                            | `false`       | -             |
| `[nzOkButtonProps]`     | config object of the ok button                                                                                                                                  | `NzPopConfirmButtonProps`                                            | `null`        | -             | 20.0.0  |
| `[nzCancelButtonProps]` | config object of the cancel button                                                                                                                              | `NzPopConfirmButtonProps`                                            | `null`        | -             | 20.0.0  |
| `[nzCondition]`         | Whether to directly emit `onConfirm` without showing Popconfirm                                                                                                 | `boolean`                                                            | `false`       | -             |
| `[nzIcon]`              | Customize icon of confirmation. Set to `null` to hide the icon                                                                                                  | `string \| TemplateRef<void> \| null`                                | -             | -             |
| `[nzAutoFocus]`         | Autofocus a button                                                                                                                                              | `null \| 'ok' \| 'cancel'`                                           | `null`        | ✅            |
| `[nzBeforeConfirm]`     | The hook before the confirmation operation, decides whether to continue responding to the `nzOnConfirm` callback, supports asynchronous verification.           | `(() => Observable<boolean> \| Promise<boolean> \| boolean) \| null` | `null`        | -             |
| `(nzOnCancel)`          | Callback of cancel                                                                                                                                              | `EventEmitter<void>`                                                 | -             | -             |
| `(nzOnConfirm)`         | Callback of confirmation                                                                                                                                        | `EventEmitter<void>`                                                 | -             | -             |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the node of `[nz-popconfirm]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## FAQ

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
