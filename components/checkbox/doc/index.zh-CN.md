---
category: Components
subtitle: 多选框
type: 数据录入
title: Checkbox
---

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
```

## API

### [nz-checkbox]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAutoFocus]` | 自动获取焦点 | `boolean` | `false` |
| `[nzDisabled]` | 设定 disable 状态 | `boolean` | `false` |
| `[ngModel]` | 指定当前是否选中，可双向绑定 | `boolean` | `false` |
| `[nzIndeterminate]` | 设置 indeterminate 状态，只负责样式控制 | `boolean` | `false` |
| `[nzValue]` | 仅与 `nz-checkbox-wrapper` 的选中回调配合使用 | `string` | - |
| `(ngModelChange)` | 选中变化时回调 | `EventEmitter<boolean>` | - |

### nz-checkbox-group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 指定可选项，可双向绑定 | `Array<{ label: string; value: string; checked?: boolean; }>` | `[]` |
| `[nzDisabled]` | 设定全部 checkbox disable 状态 | `boolean` | `false` |
| `(ngModelChange)` | 选中数据变化时的回调 | `EventEmitter<Array<{ label: string; value: string; checked?: boolean; }>>` | - |


### nz-checkbox-wrapper

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `(nzOnChange)` | 选中数据变化时的回调 | `EventEmitter<string[]>` | - |

## 方法

### [nz-checkbox]

通过ViewChild或其他方式获得 `nz-checkbox` 实例

| 名称 | 描述 |
| ---- | ----------- |
| focus() | 获取焦点 |
| blur() | 移除焦点 |
