---
category: Components
subtitle: 警告提示
type: 反馈
title: Alert
---

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzAlertModule } from 'ng-zorro-antd/alert';
```

## API

### nz-alert

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzBanner]` | 是否用作顶部公告 | `boolean` | `false` |
| `[nzCloseable]` | 默认不显示关闭按钮 | `boolean` | - | ✅ |
| `[nzCloseText]` | 自定义关闭按钮 | `string \| TemplateRef<void>` | - |
| `[nzDescription]` | 警告提示的辅助性文字介绍 | `string \| TemplateRef<void>` | - |
| `[nzMessage]` | 警告提示内容 | `string \| TemplateRef<void>` | - |
| `[nzShowIcon]` | 是否显示辅助图标，`nzBanner` 模式下默认值为 `true` | `boolean` | `false` | ✅ |
| `[nzIconType]` | 自定义图标类型，`nzShowIcon` 为 `true` 时有效 | `string \| string[] \| Set<string> \| { [klass: string]: any; }` | - |
| `[nzType]` | 指定警告提示的样式，`nzBanner` 模式下默认值为 `'warning'` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `(nzOnClose)` | 关闭时触发的回调函数 | `EventEmitter<void>` | - |
