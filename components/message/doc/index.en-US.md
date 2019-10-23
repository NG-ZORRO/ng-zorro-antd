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

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzMessageModule } from 'ng-zorro-antd/message';
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
| content | The content of message | `string \| TemplateRef<void>` | - |
| options | Support setting the parameters for the current message box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true`  | `boolean` |
| nzAnimate | Whether to turn on animation | `boolean` |

Methods for destruction are also provided:

- `message.remove(id)` // Remove the message with the specified id. When the id is empty, remove all messages (the message id is returned by the above method)

### Global Configuration

You can use `NzConfigService` to configure this component globally. Please check the Global Configuration chapter for more information.

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | `3000` |
| nzMaxStack | The maximum number of messages that can be displayed at the same time | `number` | `7` |
| nzPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| nzAnimate | Whether to turn on animation | `boolean` | `true` |
| nzTop | Distance from top | `number \| string` | `24` |

### NzMessageDataFilled

It's the object that returned when you call `NzMessageService.success` and others.

```ts
export interface NzMessageDataFilled {
  onClose: Subject<false>; // It would emit an event when the message is closed
}
```
