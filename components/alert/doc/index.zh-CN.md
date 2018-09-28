---
category: Components
subtitle: 警告提示
type: Feedback
title: Alert
---

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## API

### nz-alert

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzBanner]` | 是否用作顶部公告 | boolean | false |
| `[nzClosable]` | 默认不显示关闭按钮 | boolean | 无 |
| `[nzCloseText]` | 自定义关闭按钮 | string｜`TemplateRef<void>` | 无 |
| `[nzDescription]` | 警告提示的辅助性文字介绍 | string｜`TemplateRef<void>` | 无 |
| `[nzMessage]` | 警告提示内容 | string｜`TemplateRef<void>` | 无 |
| `[nzShowIcon]` | 是否显示辅助图标 | boolean | false，`nzBanner` 模式下默认值为 true |
| `[nzIconType]` | 自定义图标类型，`nzShowIcon` 为 `true` 时有效 | `string 丨 string[] 丨 Set<string> 丨 { [klass: string]: any; };` | - |
| `[nzType]` | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string | `info`，`banner` 模式下默认值为 `warning` |
| `(nzOnClose)` | 关闭时触发的回调函数 | `EventEmitter<void>` | - |
