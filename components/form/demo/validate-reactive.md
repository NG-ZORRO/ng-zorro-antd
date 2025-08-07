---
order: 9
title:
  zh-CN: 响应式表单验证
  en-US: Reactive Forms Validation
---

## zh-CN

我们在 `nz-form-control` 上 提供了 `nzValidateStatus` `nzHasFeedback` 等属性，当使用[响应式表单](https://angular.cn/guide/forms/reactive-forms)时，可以自己定义校验的时机和内容。

1. `nzValidateStatus`: 校验状态，默认自动从 `nz-form-control` 中的 `NgControl` 获得校验状态，也可以手动指定为特定的 `NgControl`。
2. `nzHasFeedback`：用于给输入框添加反馈图标。
3. `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip`：设置不同状态校验文案。
   > 当同一种状态下存在多种提示情况时，`nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip` 均支持传入 `TemplateRef<{ $implicit: FormControl }` 类型，可以通过[模板变量](https://www.angular.cn/guide/template-syntax)导出 `FormControl` 后用于切换不同的提示信息。
   > 当 FormControl.status 为 `INVALID` 并且错误包含 `{warning：true}` 时，`nz-form-control` 显示警告状态。

## en-US

We provide properties like `nzValidateStatus` `nzHasFeedback` in `nz-form-control` to customize your own validate status and message, when using [reactive forms](https://angular.dev/guide/forms/reactive-forms).

1. `nzValidateStatus`: validate status of form components, the default status comes from the `NgControl` in `nz-form-control`, you can set other `NgControl` to it.
2. `nzHasFeedback`: display feed icon of input control
3. `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip`：display validate message。
   > When there are multiple tips in the same state, `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip` supports the passing `TemplateRef<{ $implicit: FormControl }` type, which can be used to switch tips after exporting `FormControl` via the [template syntax](https://angular.dev/guide/templates).
   > When the FormControl.status is `INVALID`, and the errors contains `{warning:true}` , the `nz-form-control` display with warning status.
