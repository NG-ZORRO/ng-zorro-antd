---
category: Components
type: Navigation
cols: 1
title: Steps
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When the task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## API

```html
<nz-steps>
  <nz-step nzTitle="first step"></nz-step>
  <nz-step nzTitle="second step"></nz-step>
  <nz-step nzTitle="third step"></nz-step>
</nz-steps>
```

### nz-steps

The whole of the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzCurrent]` | to set the current step, counting from 0. You can overwrite this state by using `nzStatus` of `nz-step` | number | 0 |
| `[nzDirection]` | to specify the direction of the step bar, `horizontal` and `vertical` are currently supported | string | `horizontal` |
| `[nzProgressDot]` | Steps with progress dot style, customize the progress dot by setting it with TemplateRef | Boolean 丨 `TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>` | false |
| `[nzSize]` | to specify the size of the step bar, `default` and `small` are currently supported | string | `default` |
| `[nzStatus]` | to specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |
| `[nzStartIndex]` | to specify the starting number | number | 0 |

### nz-step

A single step in the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDescription]` | description of the step, optional property | string 丨 `TemplateRef<void>` | - |
| `[nzIcon]` | icon of the step, optional property | `string 丨 string[] 丨 Set<string> 丨 { [klass: string]: any; };` 丨 `TemplateRef<void>` | - |
| `[nzStatus]` | to specify the status. It will be automatically set by `nzCurrent` of `nz-steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |
| `[nzTitle]` | title of the step | string 丨 `TemplateRef<void>` | - |
