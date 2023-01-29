---
category: Components
subtitle: 气泡卡片
type: 数据展示
title: Popover
cover: https://gw.alipayobjects.com/zos/alicdn/1PNL1p_cO/Popover.svg
---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

```ts
import { NzPopoverModule } from 'ng-zorro-antd/popover';
```

## API

### [nz-popover]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzPopoverArrowPointAtCenter]` | 箭头指向锚点的中心 | `boolean` | `false` |
| `[nzPopoverTitle]` | 标题 | `string \| TemplateRef<void>` | - |
| `[nzPopoverContent]` | 用于定义内容 | `string \| TemplateRef<void>` | - |
| `[nzPopoverTrigger]` | 触发行为，为 `null` 时不响应光标事件 | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzPopoverPlacement]` | 气泡框位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'` |
| `[nzPopoverOrigin]` | 气泡框定位元素 | `ElementRef` | - |
| `[nzPopoverVisible]` | 显示隐藏气泡框 | `boolean` | `false` |
| `(nzPopoverVisibleChange)` | 显示隐藏的事件 | `EventEmitter<boolean>` | - |
| `[nzPopoverMouseEnterDelay]` | 鼠标移入后延时多少才显示气泡框，单位：秒 | `number` | `0.15` |
| `[nzPopoverMouseLeaveDelay]` | 鼠标移出后延时多少才隐藏气泡框，单位：秒 | `number` | `0.1` |
| `[nzPopoverOverlayClassName]` | 卡片类名 | `string` | - |
| `[nzPopoverOverlayStyle]` | 卡片样式 | `object` | - |
| `[nzPopoverBackdrop]` | 浮层是否应带有背景板 | `boolean` | `false` |
更多属性请参考 [Tooltip](/components/tooltip/zh#api)。

## 注意

请确保 `[nz-popover]` 元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
