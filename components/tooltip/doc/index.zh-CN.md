---
category: Components
subtitle: 文字提示
type: 数据展示
title: Tooltip
cover: 'https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg'
description: 简单的文字提示气泡框。
---

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

## API

### [nz-tooltip]

| 参数                            | 说明                                                                       | 类型                                                                                                                                                                              | 默认值    |
| ------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `[nzTooltipArrowPointAtCenter]` | 箭头指向锚点的中心                                                         | `boolean`                                                                                                                                                                         | `false`   |
| `[nzTooltipTitle]`              | 提示文字                                                                   | `string \| TemplateRef<void>`                                                                                                                                                     | -         |
| `[nzTooltipTitleContext]`       | 提示文字模板上下文                                                         | `object`                                                                                                                                                                          | -         |
| `[nzTooltipTrigger]`            | 触发行为，可选 `'click' \| 'focus' \| 'hover'`，为 `null` 时不响应光标事件 | `'click' \| 'focus' \| 'hover' \| null`                                                                                                                                           | `'hover'` |
| `[nzTooltipPlacement]`          | 气泡框位置                                                                 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'`   |
| `[nzTooltipColor]`              | 背景颜色                                                                   | `string`                                                                                                                                                                          | -         |
| `[nzTooltipOrigin]`             | 气泡框定位元素                                                             | `ElementRef`                                                                                                                                                                      | -         |
| `[nzTooltipVisible]`            | 显示隐藏气泡框                                                             | `boolean`                                                                                                                                                                         | `false`   |
| `(nzTooltipVisibleChange)`      | 显示隐藏的事件                                                             | `EventEmitter<boolean>`                                                                                                                                                           | -         |
| `[nzTooltipMouseEnterDelay]`    | 鼠标移入后延时多少才显示 Tooltip，单位：秒                                 | `number`                                                                                                                                                                          | `0.15`    |
| `[nzTooltipMouseLeaveDelay]`    | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒                                 | `number`                                                                                                                                                                          | `0.1`     |
| `[nzTooltipOverlayClassName]`   | 卡片类名                                                                   | `string`                                                                                                                                                                          | -         |
| `[nzTooltipOverlayStyle]`       | 卡片样式                                                                   | `object`                                                                                                                                                                          | -         |

### 共同的 API

以下 API 为 `nz-tooltip`、`nz-popconfirm`、`nz-popover` 共享的 API。

| 方法               | 说明     |
| ------------------ | -------- |
| `show()`           | 打开     |
| `hide()`           | 隐藏     |
| `updatePosition()` | 调整位置 |

## 注意

请确保 `[nz-tooltip]` 元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。

## FAQ

### Q：滚动时浮层元素没有跟随滚动位置

默认情况下，浮层元素使用 `body` 作为滚动容器，如果使用了其他滚动容器，在自定义滚动容器元素上添加 [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) 指令。
注意：您需要从 `@angular/cdk/scrolling` 导入 `CdkScrollable` 指令或 `ScrollingModule` 模块。
