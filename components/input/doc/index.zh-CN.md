---
category: Components
subtitle: 输入框
type: 数据录入
title: Input
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzInputModule } from 'ng-zorro-antd/input';
```

## API

### [nz-input]

nz-input 可以使用所有的W3C标准下的所有 [使用方式](https://www.w3schools.com/tags/tag_input.asp) 和 Angular对 input 的全部额外功能支持。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzSize]` | 控件大小。注：标准表单内的输入框大小限制为 `large` | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzAutosize]` | 只可以用于 `textarea`，自适应内容高度，可设置为 `boolean` 或对象：`{ minRows: 2, maxRows: 6 }` | `boolean \| { minRows: number, maxRows: number }` | `false` |

### nz-input-group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAddOnAfter]` | 带标签的 input，设置后置标签，可以与 `nzAddOnBefore` 配合使用 | `string \| TemplateRef<void>` | - |
| `[nzAddOnBefore]` | 带标签的 input，设置前置标签，可以与 `nzAddOnAfter` 配合使用 | `string \| TemplateRef<void>` | - |
| `[nzPrefix]` | 带有前缀图标的 input，可以与 `nzSuffix` 配合使用 | `string \| TemplateRef<void>` | - |
| `[nzSuffix]` | 带有后缀图标的 input，可以与 `nzPrefix` 配合使用 | `string \| TemplateRef<void>` | - |
| `[nzCompact]` | 是否用紧凑模式 | `boolean` | `false` |
| `[nzSearch]` | 是否用搜索框 | `boolean` | `false` |
| `[nzSize]` | `nz-input-group` 中所有的 `nz-input` 的大小 | `'large' \| 'small' \| 'default'` | `'default'` |
