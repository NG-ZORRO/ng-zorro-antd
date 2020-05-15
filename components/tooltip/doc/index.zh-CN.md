---
category: Components
subtitle: 文字提示
type: 数据展示
title: Tooltip
---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

```ts
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
```

## API

### [nz-tooltip]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzTooltipTitle]` | 提示文字 | `string \| TemplateRef<void>` | - |
| `[nzTooltipTrigger]` | 触发行为，可选 `hover/focus/click`，为 `null` 时不响应光标事件 | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzTooltipPlacement]` | 气泡框位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| `[nzTooltipOrigin]` | 气泡框定位元素 | `ElementRef` | - |


### 共同的 API

以下 API 为 `nz-tooltip`、`nz-popconfirm`、`nz-popover` 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzMouseEnterDelay]` | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | `number` | `0.15` |
| `[nzMouseLeaveDelay]` | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | `number` | `0.1` |
| `[nzOverlayClassName]` | 卡片类名 | `string` | - |
| `[nzOverlayStyle]` | 卡片样式 | `object` | - |
| `[nzVisible]` | 用于手动控制浮层显隐 | `boolean` | `false` |
| `(nzVisibleChange)` | 显示隐藏的回调 | `EventEmitter<boolean>` | - |

| 方法 | 说明 |
| --- | --- |
| `show` | 打开 |
| `hide` | 隐藏 |
| `updatePosition` | 调整位置 |

## 非body滚轴事件需要更新CDK的位置

在tooltip相关(包括popconfirm、popover)的组件使用中，body的滚轴事件会刷新tooltip的位置。如果是自定义容器的滚轴事件则不会刷新，你可以在自定义容器上添加 `cdkScrollable` 指令以达到该目的。注意，这里需要导入相关的包 `import {ScrollingModule} from '@angular/cdk/scrolling';`，更多信息请参考 [scrolling/api](https://material.angular.io/cdk/scrolling/api)。

## 注意

请确保 `[nz-tooltip]` 元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
