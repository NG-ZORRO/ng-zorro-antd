---
order: 10
title:
  zh-CN: 模板驱动表单验证
  en-US: Template-driven Forms Validation
---

## zh-CN

当使用[模板驱动表单](https://angular.cn/guide/forms/template-driven-forms)时，模板可以根据模板设定自动进行校验。

1. `nzHasFeedback`：用于给输入框添加反馈图标。
2. `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip`：设置不同状态校验文案。
   > 当同一种状态下存在多种提示情况时，`nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip` 均支持传入 `TemplateRef<{ $implicit: NgModel }` 类型，可以通过[模板变量](https://www.angular.cn/guide/template-syntax)导出 `NgModel` 后用于切换不同的提示信息。

## en-US

When using [template-driven forms](https://angular.dev/guide/forms/template-driven-forms), the form could change its status via the template setting.

1. `nzHasFeedback`: display feed icon of input control
2. `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip`: display validate message。
   > When there are multiple tips in the same state, `nzSuccessTip` `nzWarningTip` `nzErrorTip` `nzValidatingTip` supports the passing `TemplateRef<{ $implicit: NgModel }` type, which can be used to switch tips after exporting `NgModel` via the [template syntax](https://angular.dev/guide/templates).
