---
category: Components
subtitle: 表单
type: Data Entry
cols: 1
title: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

该组件需要与 [Angular表单](https://angular.io/guide/forms#forms) 结合使用，开发者根据需要可以自由选择 [响应式表单](https://angular.io/guide/reactive-forms#reactive-forms) 或 [模板驱动表单](https://angular.io/guide/forms#template-driven-forms).
> 使用该组件前请确保您已经阅读并掌握了 [Forms](https://angular.io/guide/forms#forms) 的使用方式。

## 表单

我们提供了以下三种排列方式：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

### 表单项 nz-form-item

表单项用于区分表单中不同的区域，包含表单域和表单标签(可选)。

### 表单标签 nz-form-label

用于标示当前表单项的内容，可选。

### 表单域 nz-form-control

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

```html
<form nz-form>
  <nz-form-item>
    <nz-form-label [nzSpan]="6" nzFor="email">E-mail</nz-form-label>
    <nz-form-control [nzSpan]="14">
      <input nz-input name="email" type="email" id="email">
    </nz-form-control>
  </nz-form-item >
</form>
```

## API

### nz-form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzLayout]`| 表单布局	 | `'horizontal'丨'vertical'丨'inline'`| 'horizontal'|

### nz-form-item

表单项用于区分表单中不同的区域，包含表单域和表单标签(可选)。

> 所有 [nz-row](/components/grid/zh) 的参数在 `nz-form-item` 上均可直接使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzFlex]`| 是否Flex布局	 | boolean | false|

### nz-form-label

用于标示当前表单项的内容，可选。

> 所有 [nz-col](/components/grid/zh) 的参数在 `nz-form-label` 上均可直接使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzRequired]`| 当前项是否为必填，仅影响样式	 | boolean | false|
| `[nzFor]`| label 标签的 for 属性	 | string | -|

### nz-form-control

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

> 所有 [nz-col](/components/grid/zh) 的参数在 `nz-form-control` 上均可直接使用。


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzValidateStatus]`(Reactive Forms) | 会根据 FormControl 的状态自动生成校验状态 | FormControl | `nz-form-control` 中包裹的第一个 `FormControl`  |
| `[nzValidateStatus]`(Template-driven Forms) | 校验状态，可选：'success' 'warning' 'error' 'validating' | string |  |
| `[nzHasFeedback]`| 配合 nzValidateStatus 属性使用，展示校验状态图标	 | boolean | false|

### nz-form-explain

用于显示提示信息，会自动根据当前的 nzValidateStatus 显示不同的颜色

> 注意：每个 `nz-form-item` 下最多只能有一个 `nz-form-explain` 。

### nz-form-extra

用于显示表单额外提示信息

### nz-form-split

用于显示分隔符 `-`

### nz-form-text

在 `nz-form-control` 中直接显示文本

