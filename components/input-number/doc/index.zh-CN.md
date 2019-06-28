---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

> 注意：InputNumber 会在 `(blur)` 和 `(keydown.enter)` 时触发校验，而不是在用户输入每个字符时立刻进行校验，以此来避免反复输出错误校验结果的情况（例如输入 -0.02001 或者 -1.0e28）

## 何时使用

当需要获取标准数值时。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
```

## API

### nz-input-number

在 `nz-input-number` 中输入的数值不会在输入时进行校验，而是在特定时机（回车键，上下键，失去焦点等）时才会校验后反馈到 `[ngModel]` 和 `(ngModelChange)` 中，否则输入 `-0.12` 或者 `1e10` 这种类型数据时，双向绑定的数据会永远是 `undefined`

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 当前值，可双向绑定 | `number \| string`  \|  `string` | - |
| `[nzAutoFocus]` | 自动获取焦点 | `boolean` | `false` |
| `[nzDisabled]` | 禁用 | `boolean` | `false` |
| `[nzMax]` | 最大值 | `number` | `Infinity` |
| `[nzMin]` | 最小值 | `number` | `-Infinity` |
| `[nzFormatter]` | 指定输入框展示值的格式 | `(value: number \| string) => string \| number` | - |
| `[nzParser]` | 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用 | `(value: string) => string \| number` | - |
| `[nzPrecision]` | 数值精度 | `number` | - |
| `[nzSize]` | 输入框大小 | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStep]` | 每次改变步数，可以为小数 | `number \| string` | `1` |
| `[nzPlaceHolder]` | 选择框默认文字 | `string` | - |
| `[nzId]` | 组件内部 input 的 id 值 | `string` | - |
| `(ngModelChange)` | 数值改变时回调 | `EventEmitter<number>` | - |
| `(nzFocus)` | focus时回调 | `EventEmitter<void>` | - |
| `(nzBlur)` | blur时回调 | `EventEmitter<void>` | - |

#### 方法

通过 `ViewChild` 等方法获得实例后调用

| 名称 | 描述 |
| ---- | ----------- |
| focus() | 获取焦点 |
| blur() | 移除焦点 |
