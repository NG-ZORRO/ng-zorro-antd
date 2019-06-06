---
category: Components
subtitle: 气泡卡片
type: 数据展示
title: Popover
---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## API

### 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzPopoverModule } from 'ng-zorro-antd';
```

### [nz-popover]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzTitle]` | 卡片标题 | `string｜TemplateRef<void>` | - |
| `[nzContent]` | 用于定义Content内容 | `string｜TemplateRef<void>` | - |

更多属性请参考 [Tooltip](/components/tooltip/zh#api)。

## 注意

请确保 `nz-popover` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
