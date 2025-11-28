---
category: Components
type: Feedback
title: Notification
cover: 'https://gw.alipayobjects.com/zos/alicdn/Jxm5nw61w/Notification.svg'
description: Prompt notification message globally.
---

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be
used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details
  about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## API

### NzNotificationService

The component provides a number of service methods using the following methods and parameters:

- `NzNotificationService.blank(title, content, [options])` // Notification without icon
- `NzNotificationService.success(title, content, [options])`
- `NzNotificationService.error(title, content, [options])`
- `NzNotificationService.info(title, content, [options])`
- `NzNotificationService.warning(title, content, [options])`

| Argument  | Description                                                                          | Type                          | Default |
| --------- | ------------------------------------------------------------------------------------ | ----------------------------- | ------- |
| `title`   | Title                                                                                | `string \| TemplateRef<void>` | -       |
| `content` | Notification content                                                                 | `NzNotificationContentType`   | -       |
| `options` | Support setting the parameters for the current notification box, see the table below | `object`                      | -       |

The parameters that are set by the `options` support are as follows:

| Argument         | Description                                                            | Type                                                            |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| `nzKey`          | The unique identifier of the Notification                              | `string`                                                        |
| `nzDuration`     | Duration (milliseconds), does not disappear when set to 0              | `number`                                                        |
| `nzPauseOnHover` | Do not remove automatically when mouse is over while setting to `true` | `boolean`                                                       |
| `nzAnimate`      | Whether to turn on animation                                           | `boolean`                                                       |
| `nzStyle`        | Custom inline style                                                    | `object`                                                        |
| `nzClass`        | Custom CSS class                                                       | `object`                                                        |
| `nzData`         | Anything that would be used as template context                        | `any`                                                           |
| `nzCloseIcon`    | Custom close icon                                                      | `TemplateRef<void> \| string`                                   |
| `nzButton`       | Custom button                                                          | `TemplateRef<{ $implicit: NzNotificationComponent }> \| string` |

Methods for destruction are also provided:

- `NzNotificationService.remove(id)` // Remove the notification with the specified id. When the id is empty, remove all notifications (the notification id is returned by the above method)

### Global Configuration

You can use `NzConfigService` to configure this component globally. Please check the [Global Configuration](/docs/global-config/en) chapter for more information.

| Parameter        | Description                                                                             | Type                                                                            | Default      |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| `nzDuration`     | Duration (milliseconds), does not disappear when set to 0                               | `number`                                                                        | `4500`       |
| `nzMaxStack`     | The maximum number of notifications that can be displayed at the same time              | `number`                                                                        | `8`          |
| `nzPauseOnHover` | Do not remove automatically when mouse is over while setting to `true`                  | `boolean`                                                                       | `true`       |
| `nzAnimate`      | Whether to turn on animation                                                            | `boolean`                                                                       | `true`       |
| `nzTop`          | The top of the notification when it pops up from the top.                               | `string`                                                                        | `'24px'`     |
| `nzBottom`       | The bottom of the notification when it pops up from the bottom.                         | `string`                                                                        | `'24px'`     |
| `nzPlacement`    | Popup position, optional `topLeft` `topRight` `bottomLeft` `bottomRight` `top` `bottom` | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| `nzDirection`    | Direction of the text in the notification                                               | `'ltr' \| 'rtl'`                                                                | -            |

### NzNotificationRef

It's the object that returned when you call `NzNotificationService.success` and others.

```ts
export interface NzNotificationRef {
  messageId: string;
  onClose: Subject<boolean>; // It would emit an event when the notification is closed, and emit a `true` if it's closed by user
  onClick: Subject<MouseEvent>;
}
```
