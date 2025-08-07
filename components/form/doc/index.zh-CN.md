---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
cover: 'https://gw.alipayobjects.com/zos/alicdn/ORmcdeaoO/Form.svg'
description: 高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
---

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

> 该组件需要与 [Angular 表单](https://angular.cn/guide/forms) 结合使用，根据需要可以自由选择 [响应式表单](https://angular.cn/guide/forms/reactive-forms) 或 [模板驱动表单](https://angular.cn/guide/forms/template-driven-forms)。
> 使用该组件前请确保您已经阅读并掌握了 [Angular 表单](https://angular.cn/guide/forms) 的使用方式。

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
      <input nz-input name="email" type="email" id="email" />
    </nz-form-control>
  </nz-form-item>
</form>
```

## API

### [nz-form]

| 参数                  | 说明                                                                                | 类型                                           | 默认值                                          | 全局配置 |
| --------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- | -------- |
| `[nzLayout]`          | 表单布局                                                                            | `'horizontal' \| 'vertical' \| 'inline'`       | `'horizontal'`                                  |
| `[nzAutoTips]`        | 配置 `nz-form-control` 的 `[nzAutoTips]` 的默认值, 具体用法请参考示例：**自动提示** | `Record<string, Record<string, string>>`       | `{}`                                            | ✅       |
| `[nzDisableAutoTips]` | 配置 `nz-form-control` 的 `[nzDisableAutoTips]` 的默认值                            | `boolean`                                      | `false`                                         | ✅       |
| `[nzNoColon]`         | 配置 `nz-form-label` 的 `[nzNoColon]` 的默认值                                      | `boolean`                                      | `false`                                         | ✅       |
| `[nzTooltipIcon]`     | 配置 `nz-form-label` 的 `[nzTooltipIcon]` 的默认值                                  | `string \| { type: string; theme: ThemeType }` | `{ type: 'question-circle', theme: 'outline' }` | ✅       |
| `[nzLabelAlign]`      | 配置 `nz-form-label` 的 `[nzLabelAlign]` 的默认值                                   | `'left' \| 'right'`                            | `'right'`                                       |
| `[nzLabelWrap]`       | 配置 `nz-form-label` 的 `[nzLabelWrap]` 的默认值                                    | `boolean`                                      | `false`                                         |

### nz-form-item

表单项用于区分表单中不同的区域，包含表单域和表单标签(可选)。

> 所有 [nz-row](/components/grid/zh) 的参数在 `nz-form-item` 上均可直接使用。

### nz-form-label

用于标示当前表单项的内容，可选。

> 所有 [nz-col](/components/grid/zh) 的参数在 `nz-form-label` 上均可直接使用。

| 参数               | 说明                         | 类型                          | 默认值    |
| ------------------ | ---------------------------- | ----------------------------- | --------- |
| `[nzRequired]`     | 当前项是否为必填，仅影响样式 | `boolean`                     | `false`   |
| `[nzNoColon]`      | 是否不显示 label 后面的冒号  | `boolean`                     | `false`   |
| `[nzFor]`          | label 标签的 for 属性        | `string`                      | -         |
| `[nzTooltipTitle]` | 配置提示信息                 | `string \| TemplateRef<void>` | -         |
| `[nzTooltipIcon]`  | 配置提示信息的图标           | `string \| NzFormTooltipIcon` | -         |
| `[nzLabelAlign]`   | 标签文本对齐方式             | `'left' \| 'right'`           | `'right'` |
| `[nzLabelWrap]`    | label 标签的文本换行方式     | `boolean`                     | `false`   |

### nz-form-control

> 注意：由于 Angular Form 目前提供的[状态变更订阅](https://github.com/angular/angular/issues/10887)不完整。手动更改表单状态时，例如 `markAsDirty` 后，需要执行 `updateValueAndValidity` 通知 `nz-form-control` 进行状态变更。

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

> 所有 [nz-col](/components/grid/zh) 的参数在 `nz-form-control` 上均可直接使用。

| 参数                  | 说明                                                                                                                                                       | 类型                                                                          | 默认值                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `[nzValidateStatus]`  | 会根据传入的 `FormControl` 或 `NgModel` 自动生成校验状态，也可以直接指定状态，不传入时默认值为 `nz-form-control` 中包裹的第一个 `FormControl` 或 `NgModel` | `'success' \| 'warning' \| 'error' \| 'validating' \| FormControl \| NgModel` | `nz-form-control` 中包裹的第一个 `FormControl` 或 `NgModel` |
| `[nzHasFeedback]`     | 配合 `nzValidateStatus` 属性使用，展示校验状态图标                                                                                                         | `boolean`                                                                     | `false`                                                     |
| `[nzExtra]`           | 用于显示表单额外提示信息                                                                                                                                   | `string \| TemplateRef<void>`                                                 | -                                                           |
| `[nzSuccessTip]`      | 校验状态 success 时提示信息                                                                                                                                | `string \| TemplateRef<{ $implicit: FormControl \| NgModel }>`                | -                                                           |
| `[nzWarningTip]`      | 校验状态 warning 时提示信息                                                                                                                                | `string \| TemplateRef<{ $implicit: FormControl \| NgModel }>`                | -                                                           |
| `[nzErrorTip]`        | 校验状态 error 时提示信息                                                                                                                                  | `string \| TemplateRef<{ $implicit: FormControl \| NgModel }>`                | -                                                           |
| `[nzValidatingTip]`   | 正在校验时提示信息                                                                                                                                         | `string \| TemplateRef<{ $implicit: FormControl \| NgModel }>`                | -                                                           |
| `[nzAutoTips]`        | 配置提示的对象, 具体用法请参考示例：**自动提示**                                                                                                           | `Record<string, Record<string, string>>`                                      | -                                                           |
| `[nzDisableAutoTips]` | 禁用自动提示                                                                                                                                               | `boolean`                                                                     | -                                                           |

### nz-form-split

用于显示分隔符 `-`

### nz-form-text

在 `nz-form-control` 中直接显示文本
