---
category: Components
type: Feedback
noinstant: true
title: Notification
subtitle: 通知提醒框
---

全局展示通知提醒信息。

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 如何使用

与`NzMessage`类似，如果要修改全局默认配置，你可以设置提供商 `NZ_NOTIFICATION_CONFIG` 的值来修改。
（如：在你的模块的`providers`中加入 `{ provide: NZ_NOTIFICATION_CONFIG, useValue: { nzDuration: 3000 }}`，`NZ_NOTIFICATION_CONFIG` 可以从 `ng-zorro-antd` 中导入）

默认全局配置为：
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

组件提供了一些服务方法，使用方式和参数如下：

- `NzNotificationService.blank(title, content, [options])` // 不带图标的提示
- `NzNotificationService.success(title, content, [options])`
- `NzNotificationService.error(title, content, [options])`
- `NzNotificationService.info(title, content, [options])`
- `NzNotificationService.warning(title, content, [options])`
- `NzNotificationService.loading(title, content, [options])`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| content | 提示内容 | string | - |
| options | 支持设置针对当前提示框的参数，见下方表格 | object | - |

`options` 支持设置的参数如下：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| nzDuration | 持续时间(毫秒)，当设置为0时不消失 | number |
| nzPauseOnHover | 鼠标移上时禁止自动移除 | boolean |
| nzAnimate | 开关动画效果 | boolean |
| nzStyle | 自定义内联样式 | object |
| nzClass | 自定义 CSS class | object |

还提供了全局销毁方法：

- `NzNotificationService.remove(id)` // 移除特定id的消息，当id为空时，移除所有消息（该消息id通过上述方法返回值中得到）

### 全局配置（NZ_MESSAGE_CONFIG）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDuration | 持续时间(毫秒)，当设置为0时不消失 | number | 4500 |
| nzMaxStack | 同一时间可展示的最大提示数量 | number | 8 |
| nzPauseOnHover | 鼠标移上时禁止自动移除 | boolean | true |
| nzAnimate | 开关动画效果 | boolean | true |
| nzTop | 消息从顶部弹出时，距离顶部的位置。 | string | 24px |
| nzBottom | 消息从底部弹出时，距离底部的位置。 | string | 24px |
| nzPlacement | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string | `topRight` |