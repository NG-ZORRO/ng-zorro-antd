---
category: Components
subtitle: 气泡确认框
type: 反馈
title: Popconfirm
---

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## API

### 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzPopconfirmModule } from 'ng-zorro-antd';
```

### [nz-popconfirm]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzCancelText]` | 取消按钮文字 | `string` | `'取消'` |
| `[nzOkText]` | 确认按钮文字 | `string` | `'确定'` |
| `[nzOkType]` | 确认按钮类型 | `'primary' \| 'ghost' \| 'dashed' \| 'danger' \| 'default'` | `'primary'` |
| `[nzTitle]` | 确认框的描述 | `string \| TemplateRef<void>` | - |
| `[nzCondition]` | 是否直接触发 `nzOnConfirm` 而不弹出框 | `boolean` | `false` |
| `[nzIcon]` | 自定义弹出框的 icon  | `string \| TemplateRef<void>` | - |
| `(nzOnCancel)` | 点击取消的回调 | `EventEmitter<void>` | - |
| `(nzOnConfirm)` | 点击确认的回调 | `EventEmitter<void>` | - |

更多属性请参考 [Tooltip](/components/tooltip/zh#api)。

## 注意

请确保 `nz-popconfirm` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
