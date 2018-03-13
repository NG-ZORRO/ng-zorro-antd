---
order: 9
title:
  zh-CN: 响应式表单验证
  en-US: Reactive Forms Validation
---

## zh-CN

我们在 `nz-form-control` 上 提供了 `nzValidateStatus` `nzHasFeedback` 等属性，当使用[响应式表单](https://angular.io/guide/reactive-forms#reactive-forms)时，可以自己定义校验的时机和内容。

1. `nzValidateStatus`: 校验状态，默认自动从 `nz-form-control` 中的 `NgControl` 获得校验状态，也可以手动指定为特定的 `NgControl`。
2. `nzHasFeedback`：用于给输入框添加反馈图标。
3. `nz-form-explain`：设置校验文案。

## en-US

We provide properties like `nzValidateStatus` `nzHasFeedback` in `nz-form-control` to customize your own validate status and message, when using [reactive forms](https://angular.io/guide/reactive-forms#reactive-forms).

1. `nzValidateStatus`: validate status of form components, the default status comes from the `NgControl` in `nz-form-control`, you can set other `NgControl` to it.
2. `nzHasFeedback`: display feed icon of input control
3. `nz-form-explain`: display validate message.
