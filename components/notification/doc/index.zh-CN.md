---
category: Components
type: 反馈
noinstant: true
title: Notification
subtitle: 通知提醒框
cover: 'https://gw.alipayobjects.com/zos/alicdn/Jxm5nw61w/Notification.svg'
description: 全局展示通知提醒信息。
---

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## API

### NzNotificationService

组件提供了一些服务方法，使用方式和参数如下：

- `NzNotificationService.blank(title, content, [options])` // 不带图标的提示
- `NzNotificationService.success(title, content, [options])`
- `NzNotificationService.error(title, content, [options])`
- `NzNotificationService.info(title, content, [options])`
- `NzNotificationService.warning(title, content, [options])`

| 参数      | 说明                                     | 类型                          | 默认值 |
| --------- | ---------------------------------------- | ----------------------------- | ------ |
| `title`   | 标题                                     | `string \| TemplateRef<void>` | -      |
| `content` | 提示内容                                 | `NzNotificationContentType`   | -      |
| `options` | 支持设置针对当前提示框的参数，见下方表格 | `object`                      | -      |

`options` 支持设置的参数如下：

| 参数             | 说明                                | 类型                                                            |
| ---------------- | ----------------------------------- | --------------------------------------------------------------- |
| `nzKey`          | 通知提示的唯一标识符                | `string`                                                        |
| `nzDuration`     | 持续时间(毫秒)，当设置为 0 时不消失 | `number`                                                        |
| `nzPauseOnHover` | 鼠标移上时禁止自动移除              | `boolean`                                                       |
| `nzAnimate`      | 开关动画效果                        | `boolean`                                                       |
| `nzStyle`        | 自定义内联样式                      | `object`                                                        |
| `nzClass`        | 自定义 CSS class                    | `object`                                                        |
| `nzData`         | 任何想要在模板中作为上下文的数据    | `any`                                                           |
| `nzCloseIcon`    | 自定义关闭图标                      | `TemplateRef<void> \| string`                                   |
| `nzButton`       | 自定义按钮                          | `TemplateRef<{ $implicit: NzNotificationComponent }> \| string` |

还提供了全局销毁方法：

- `NzNotificationService.remove(id)` // 移除特定id的消息，当id为空时，移除所有消息（该消息id通过上述方法返回值中得到）

### 全局配置

可以通过 `NzConfigService` 进行全局配置，详情请见文档中 [全局配置项](/docs/global-config/zh) 章节。

| 参数             | 说明                                                                          | 类型                                                                            | 默认值       |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| `nzDuration`     | 持续时间(毫秒)，当设置为0时不消失                                             | `number`                                                                        | `4500`       |
| `nzMaxStack`     | 同一时间可展示的最大提示数量                                                  | `number`                                                                        | `8`          |
| `nzPauseOnHover` | 鼠标移上时禁止自动移除                                                        | `boolean`                                                                       | `true`       |
| `nzAnimate`      | 开关动画效果                                                                  | `boolean`                                                                       | `true`       |
| `nzTop`          | 消息从顶部弹出时，距离顶部的位置。                                            | `string`                                                                        | `'24px'`     |
| `nzBottom`       | 消息从底部弹出时，距离底部的位置。                                            | `string`                                                                        | `'24px'`     |
| `nzPlacement`    | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` `top` `bottom` | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| `nzDirection`    | 通知的文字方向                                                                | `'ltr' \| 'rtl'`                                                                | -            |

### NzNotificationRef

当你调用 `NzNotificationService.success` 或其他方法时会返回该对象。

```ts
export interface NzNotificationDataRef {
  messageId: string;
  onClose: Subject<boolean>; // 当 notification 关闭时它会派发一个事件，如果为用户手动关闭会派发 `true`
  onClick: Subject<MouseEvent>;
}
```
