---
category: Components
subtitle: 输入框
type: 数据录入
title: Input
tag: 更新
cover: 'https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg'
description: 通过鼠标或键盘输入内容，是最基础的表单域的包装。
---

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

### [nz-input]

`[nz-input]` 可以使用所有的 W3C 标准下的所有 [使用方式](https://www.w3schools.com/tags/tag_input.asp) 和 Angular 对 input 的全部额外功能支持。

| 参数               | 说明                                                                                               | 类型                                                     | 默认值       | 版本   |
| ------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------ | ------ |
| `[nzSize]`         | 控件大小。注：标准表单内的输入框大小限制为 `large`                                                 | `'large' \| 'small' \| 'default'`                        | `'default'`  |
| ~~`[nzAutosize]`~~ | ~~只可以用于 `textarea`，自适应内容高度，可设置为 `boolean` 或对象：`{ minRows: 2, maxRows: 6 }`~~ | ~~`boolean \| { minRows: number, maxRows: number }`~~    | ~~`false`~~  |
| `[nzVariant]`      | 形态变体                                                                                           | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'` | `'outlined'` | 20.0.0 |
| `[nzStatus]`       | 设置校验状态                                                                                       | `'error' \| 'warning'`                                   | -            |

#### 方法

通过 `ViewChild` 等方法获得实例后调用

| 名称           | 描述     | 参数                                                                         |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| focus(option?) | 获取焦点 | `(option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' })` |
| blur()         | 移除焦点 | -                                                                            |

### nz-input-wrapper

当需要为 `[nz-input]` 添加额外功能时使用。

| 参数              | 说明                         | 类型                     | 默认值  |
| ----------------- | ---------------------------- | ------------------------ | ------- |
| `[nzAddonBefore]` | 带标签的 input，设置前置标签 | `string`                 | -       |
| `[nzAddonAfter]`  | 带标签的 input，设置后置标签 | `string`                 | -       |
| `[nzPrefix]`      | 带有前缀图标的 input         | `string`                 | -       |
| `[nzSuffix]`      | 带有后缀图标的 input         | `string`                 | -       |
| `[nzAllowClear]`  | 可以点击清除图标删除内容     | `boolean`                | `false` |
| `(nzClear)`       | 点击清除图标时触发           | `OutputEmitterRef<void>` | -       |

### nz-input-password

可使用 `nz-input-wrapper` 的所有属性。

| 参数                   | 说明                       | 类型                        | 默认值  |
| ---------------------- | -------------------------- | --------------------------- | ------- |
| `[nzVisibilityToggle]` | 是否显示切换按钮           | `boolean`                   | `true`  |
| `[nzVisible]`          | 是否显示密码，支持双向绑定 | `boolean`                   | `false` |
| `(nzVisibleChange)`    | 是否显示密码变更事件       | `OutputEmitterRef<boolean>` | -       |

### nz-input-search

可使用 `nz-input-wrapper` 的所有属性。

| 参数              | 说明                                                             | 类型                                                          | 默认值  |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| `[nzEnterButton]` | 是否有确认按钮，可设为按钮文字。该属性会与 `nzAddonAfter` 冲突。 | `boolean \| string`                                           | `false` |
| `[nzLoading]`     | 搜索 loading                                                     | `boolean`                                                     | `false` |
| `(nzSearch)`      | 点击搜索图标、清除图标，或按下回车键时的事件                     | `{ value: string, event: Event, source: 'clear' \| 'input' }` |         |

### nz-input-group

> ⚠️ `nz-input-group` 已在 `v20.0.0` 中废弃，将在 `v22.0.0` 中移除，请使用 `nz-input-wrapper` 组件。

| 参数              | 说明                                                          | 类型                              | 默认值      |
| ----------------- | ------------------------------------------------------------- | --------------------------------- | ----------- |
| `[nzAddOnAfter]`  | 带标签的 input，设置后置标签，可以与 `nzAddOnBefore` 配合使用 | `string \| TemplateRef<void>`     | -           |
| `[nzAddOnBefore]` | 带标签的 input，设置前置标签，可以与 `nzAddOnAfter` 配合使用  | `string \| TemplateRef<void>`     | -           |
| `[nzPrefix]`      | 带有前缀图标的 input，可以与 `nzSuffix` 配合使用              | `string \| TemplateRef<void>`     | -           |
| `[nzSuffix]`      | 带有后缀图标的 input，可以与 `nzPrefix` 配合使用              | `string \| TemplateRef<void>`     | -           |
| `[nzSearch]`      | 是否用搜索框                                                  | `boolean`                         | `false`     |
| `[nzSize]`        | `nz-input-group` 中所有的 `nz-input` 的大小                   | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStatus]`      | 设置校验状态                                                  | `'error' \| 'warning'`            | -           |

### nz-textarea-count

| 参数                        | 说明                               | 类型                    | 默认值          |
| --------------------------- | ---------------------------------- | ----------------------- | --------------- |
| `[nzMaxCharacterCount]`     | `textarea` 数字提示显示的最大值    | `number`                | -               |
| `[nzComputeCharacterCount]` | 自定义计算 `characterCount` 的函数 | `(v: string) => number` | `v => v.length` |

### nz-input-otp

| Property        | Description                                       | Type                              | Default     |
| --------------- | ------------------------------------------------- | --------------------------------- | ----------- |
| `[disabled]`    | 是否禁用                                          | boolean                           | `false`     |
| `[nzFormatter]` | 格式化展示，留空字段会被 ` ` 填充                 | `(value: string) => string`       | -           |
| `[nzMask]`      | 自定义展示，和 `formatter` 的区别是不会修改原始值 | `boolean  \| null`                | `null`      |
| `[nzLength]`    | 输入元素数量                                      | `number`                          | `6`         |
| `[nzStatus]`    | 设置校验状态                                      | `'error' \| 'warning'`            | -           |
| `[nzSize]`      | 输入框大小                                        | `'large' \| 'small' \| 'default'` | `'default'` |

## Q&A

### 如何使用紧凑型输入框组合？

从 v20 版本开始，`nz-input-group` 不再直接支持紧凑模式，你可以使用 [nz-space-compact](/components/space/zh#components-space-demo-compact) 替代。

### NG0951 错误

若通过 `ngTemplateOutlet` 等方式将 `nz-input` 动态渲染到 `nz-input-wrapper` 内部，可能会触发 `NG0951` 错误。
这是由于 Angular 的内容投影（Content Projection）与子查询（Child Query）机制是静态的，无法识别动态渲染的组件（参考：[angular/angular#64504](https://github.com/angular/angular/issues/64504)）。

鉴于 `nz-input-wrapper` 依赖于内容子查询来定位 `nz-input`，建议将 `nz-input-wrapper` 与 `nz-input` 视为一个整体，避免拆分渲染。

```html
@if (need_affix_or_addon) {
<nz-input-wrapper nzAddonBefore="...">
  <input nz-input />
</nz-input-wrapper>
} @else {
<input nz-input />
}
```
