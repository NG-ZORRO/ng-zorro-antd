---
category: Components
type: Feedback
noinstant: true
title: Message
---

Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## How To Use

If you want to modify the global default configuration, you can modify the value of provider `NZ_MESSAGE_CONFIG`.
(eg, add `{ provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 }}` to `providers` of your module, `NZ_MESSAGE_CONFIG` can be imported from `ng-zorro-antd`)

The default global configuration is:
```js
{
  nzDuration: 3000,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzAnimate: true
}
```

## API

### NzMessageService

This components provides some service methods, with usage and arguments as following:

- `NzMessageService.success(content, [options])`
- `NzMessageService.error(content, [options])`
- `NzMessageService.info(content, [options])`
- `NzMessageService.warning(content, [options])`
- `NzMessageService.loading(content, [options])`

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| content | The content of message | string | - |
| options | Support setting the parameters for the current message box, see the table below | object | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | number |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true`  | boolean |
| nzAnimate | Whether to turn on animation | boolean |

Methods for destruction are also provided:

- `message.remove(id)` // Remove the message with the specified id. When the id is empty, remove all messages (the message id is returned by the above method)

### Global configuration (NZ_MESSAGE_CONFIG)

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | number | 3000 |
| nzMaxStack | The maximum number of messages that can be displayed at the same time | number | 8 |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | boolean | true |
| nzAnimate | Whether to turn on animation | boolean | true |
