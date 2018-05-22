---
category: Components
subtitle: 文字提示
type: Data Display
title: Tooltip
---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzTitle | 提示文字 | string | 无 |

### 共同的 API

以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzMouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | 0.15 |
| nzMouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | 0.1 |
| nzOverlayClassName | 卡片类名 | string | 无 |
| nzOverlayStyle | 卡片样式 | object | 无 |
| nzPlacement | 气泡框位置，可选 `top ｜left ｜right ｜bottom ｜topLeft ｜topRight ｜bottomLeft ｜bottomRight ｜leftTop ｜leftBottom ｜rightTop ｜rightBottom` | string | top |
| nzTrigger | 触发行为，可选 `hover/focus/click` | string | hover |
| nzVisible | 用于手动控制浮层显隐 | boolean | false |
| nzVisibleChange | 显示隐藏的回调 | EventEmitter | 无 |
| nzTemplate | 气泡内容，设置后会覆盖掉nzTitle的内容（用法见示例） | `TemplateRef<void>` | 无 |

## 注意

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
