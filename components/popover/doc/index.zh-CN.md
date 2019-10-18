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

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzPopoverModule } from 'ng-zorro-antd/popover';
```

## API

### [nz-popover]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzPopoverTitle]` | 标题 | `string \| TemplateRef<void>` | - |
| `[nzPopoverContent]` | 用于定义内容 | `string \| TemplateRef<void>` | - |
| `[nzPopoverTrigger]` | 触发行为，为 `null` 时不响应光标事件 | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzPopoverPlacement]` | 气泡框位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |

> 从 8.2.0 版本开始，以上 API 对应的无前缀 API，如 `nzTitle` 已被废除，请及时迁移。

更多属性请参考 [Tooltip](/components/tooltip/zh#api)。

## 注意

请确保 `nz-popover` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
