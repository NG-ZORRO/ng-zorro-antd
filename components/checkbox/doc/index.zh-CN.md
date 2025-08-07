---
category: Components
subtitle: 多选框
type: 数据录入
title: Checkbox
cover: 'https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg'
description: 收集用户的多项选择。
---

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### [nz-checkbox]

| 参数                | 说明                                          | 类型                    | 默认值  |
| ------------------- | --------------------------------------------- | ----------------------- | ------- |
| `[nzId]`            | 组件内部 input 的 `id` 值                     | `string`                | -       |
| `[nzName]`          | 组件内部 input 的 `name` 值                   | `string`                | -       |
| `[nzAutoFocus]`     | 自动获取焦点                                  | `boolean`               | `false` |
| `[nzDisabled]`      | 设定 disable 状态                             | `boolean`               | `false` |
| `[ngModel]`         | 指定当前是否选中，可双向绑定                  | `boolean`               | `false` |
| `[nzIndeterminate]` | 设置 indeterminate 状态，只负责样式控制       | `boolean`               | `false` |
| `[nzValue]`         | 仅与 `nz-checkbox-wrapper` 的选中回调配合使用 | `any`                   | -       |
| `(ngModelChange)`   | 选中变化时回调                                | `EventEmitter<boolean>` | -       |

### nz-checkbox-group

| 参数              | 说明                                      | 类型                                         | 默认值  |
| ----------------- | ----------------------------------------- | -------------------------------------------- | ------- |
| `[ngModel]`       | 指定可选项，可双向绑定                    | `string[] \| number[]`                       | `[]`    |
| `[nzName]`        | CheckboxGroup 下所有 input 的 `name` 属性 | `string`                                     | -       |
| `[nzOptions]`     | 指定可选项                                | `string[] \| number[] \| NzCheckboxOption[]` | `[]`    |
| `[nzDisabled]`    | 设定全部 checkbox disable 状态            | `boolean`                                    | `false` |
| `(ngModelChange)` | 选中数据变化时的回调                      | `EventEmitter<string[] \| number[]>`         | -       |

### nz-checkbox-wrapper

| 参数           | 说明                 | 类型                  | 默认值 |
| -------------- | -------------------- | --------------------- | ------ |
| `(nzOnChange)` | 选中数据变化时的回调 | `EventEmitter<any[]>` | -      |

## 方法

### [nz-checkbox]

| 名称      | 描述     |
| --------- | -------- |
| `focus()` | 获取焦点 |
| `blur()`  | 移除焦点 |

## Interfaces

### NzCheckboxOption

```ts
export interface NzCheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```
