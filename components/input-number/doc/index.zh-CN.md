---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

```ts
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
```

## API

### nz-input-number

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 当前值，可双向绑定 | `number \| string`  \|  `string` | - |
| `[nzAutoFocus]` | 自动获取焦点 | `boolean` | `false` |
| `[nzDisabled]` | 禁用 | `boolean` | `false` |
| `[nzMax]` | 最大值 | `number` | `Infinity` |
| `[nzMin]` | 最小值 | `number` | `-Infinity` |
| `[nzFormatter]` | 指定输入框展示值的格式 | `(value: number \| string) => string \| number` | - |
| `[nzParser]` | 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用 | `(value: string) => string \| number` | `(value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '')` |
| `[nzPrecision]` | 数值精度 | `number` | - |
| `[nzPrecisionMode]` | 数值精度的取值方式 | `'cut' \| 'toFixed' \| ((value: number \| string, precision?: number) => number)` | `'toFixed'` |
| `[nzSize]` | 输入框大小 | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStep]` | 每次改变步数，可以为小数 | `number \| string` | `1` |
| `[nzInputMode]` | 提供了用户在编辑元素或其内容时可能输入的数据类型的提示，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode) | `string` | `decimal` |
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
