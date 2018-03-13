---
order: 10
title:
  zh-CN: 模板驱动表单验证
  en-US: Template-driven Forms Validation
---

## zh-CN

我们在 `nz-form-control` 上 提供了 `nzValidateStatus` `nzHasFeedback` 等属性，当使用[模板驱动表单](https://angular.io/guide/forms#template-driven-forms)时，可以自己定义校验的时机和内容。

1. `nzValidateStatus`: 校验状态，可选 'success', 'warning', 'error', 'validating'。
2. `nzHasFeedback`：用于给输入框添加反馈图标。
3. `nz-form-explain`：设置校验文案。

## en-US

We provide properties like `nzValidateStatus` `nzHasFeedback` in `nz-form-control` to customize your own validate status and message, when using [template-driven forms](https://angular.io/guide/forms#template-driven-forms).

1. `nzValidateStatus`: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
2. `nzHasFeedback`: display feed icon of input control
3. `nz-form-explain`: display validate message.
