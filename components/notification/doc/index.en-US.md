---
category: Components
type: Feedback
noinstant: true
title: Notification
---

Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be
used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details
  about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## How To Use

Similar to `NzMessage`, if you want to modify the global default configuration, you can modify the value of provider `NZ_NOTIFICATION_CONFIG`.
(Example: Add `{ provide: NZ_NOTIFICATION_CONFIG, useValue: { nzDuration: 3000 }}` to `providers` of your module, `NZ_NOTIFICATION_CONFIG` can be imported from `ng-zorro-antd`)

The default global configuration is:
```js
{
  nzTop         : '24px',
  nzBottom      : '24px',
  nzPlacement   : 'topRight',
  nzDuration    : 4500,
  nzMaxStack    : 7,
  nzPauseOnHover: true,
  nzAnimate     : true
 }
```

## API

### NzNotificationService

The component provides a number of service methods using the following methods and parameters:

- `NzNotificationService.blank(title, content, [options])` // Notification without icon
- `NzNotificationService.success(title, content, [options])`
- `NzNotificationService.error(title, content, [options])`
- `NzNotificationService.info(title, content, [options])`
- `NzNotificationService.warning(title, content, [options])`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | string | - |
| content | Notification content | string | - |
| options | Support setting the parameters for the current notification box, see the table below | object | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | number |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | boolean |
| nzAnimate | Whether to turn on animation | boolean |
| nzStyle | Custom inline style | object |
| nzClass | Custom CSS class | object |

Methods for destruction are also provided:

- `NzNotificationService.remove(id)` // Remove the notification with the specified id. When the id is empty, remove all notifications (the notification id is returned by the above method)

### Global configuration (NZ_MESSAGE_CONFIG)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | number | 4500 |
| nzMaxStack | The maximum number of notifications that can be displayed at the same time | number | 8 |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | boolean | true |
| nzAnimate | Whether to turn on animation | boolean | true |
| nzTop | The top of the notification when it pops up from the top. | string | 24px |
| nzBottom | The bottom of the notification when it pops up from the bottom. | string | 24px |
| nzPlacement | Popup position, optional `topLeft` `topRight` `bottomLeft` `bottomRight` | string | `topRight` |