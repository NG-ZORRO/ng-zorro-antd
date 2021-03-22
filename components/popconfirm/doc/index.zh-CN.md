---
category: Components
subtitle: 气泡确认框
type: 反馈
title: Popconfirm
cover: https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg
---

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

```ts
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
```

## API

### [nz-popconfirm]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzPopconfirmTitle]` | 确认框的描述 | `string \| TemplateRef<void>` | - |
| `[nzPopconfirmTrigger]` | 触发行为，为 `null` 时不响应光标事件 | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzPopconfirmPlacement]` | 气泡框位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'` |
| `[nzPopconfirmOrigin]` | 气泡框定位元素 | `ElementRef` | - |
| `[nzPopconfirmVisible]` | 显示隐藏气泡框 | `boolean` | `false` |
| `[nzPopconfirmShowArrow]` | 气泡框是否包含箭头 | `boolean` | `true` |
| `[nzPopconfirmPlacement]` | 确认框位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| `[nzPopconfirmOrigin]` | 确认框定位元素 | `ElementRef` | - |
| `[nzPopconfirmVisible]` | 显示隐藏确认框 | `boolean` | `false` |
| `(nzPopconfirmVisibleChange)` | 显示隐藏的事件 | `EventEmitter<boolean>` | - |
| `[nzPopconfirmMouseEnterDelay]` | 鼠标移入后延时多少才显示确认框，单位：秒 | `number` | `0.15` |
| `[nzPopconfirmMouseLeaveDelay]` | 鼠标移出后延时多少才隐藏确认框，单位：秒 | `number` | `0.1` |
| `[nzPopconfirmOverlayClassName]` | 卡片类名 | `string` | - |
| `[nzPopconfirmOverlayStyle]` | 卡片样式 | `object` | - |
| `[nzPopconfirmBackdrop]` | 浮层是否应带有背景板 | `boolean` | `false` |

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzCancelText]` | 取消按钮文字 | `string` | `'取消'` |
| `[nzOkText]` | 确认按钮文字 | `string` | `'确定'` |
| `[nzOkType]` | 确认按钮类型 | `'primary' \| 'ghost' \| 'dashed' \| 'danger' \| 'default'` | `'primary'` |
| `[nzCondition]` | 是否直接触发 `nzOnConfirm` 而不弹出框 | `boolean` | `false` |
| `[nzIcon]` | 自定义弹出框的 icon  | `string \| TemplateRef<void>` | - |
| `(nzOnCancel)` | 点击取消的回调 | `EventEmitter<void>` | - |
| `(nzOnConfirm)` | 点击确认的回调 | `EventEmitter<void>` | - |



更多属性请参考 [Tooltip](/components/tooltip/zh#api)。

## 注意

请确保 `[nz-popconfirm]` 元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
