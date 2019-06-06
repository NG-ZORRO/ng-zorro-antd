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

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzStepsModule } from 'ng-zorro-antd';
```

### nz-steps

The whole of the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzCurrent]` | To set the current step, counting from 0. You can overwrite this state by using `nzStatus` of `nz-step` | `number` | `0` |
| `[nzDirection]` | To specify the direction of the step bar, `horizontal` and `vertical` are currently supported | `'vertical'｜'horizontal'` | `horizontal` |
| `[nzLabelPlacement]` | Support vertical title and description | `'vertical'｜'horizontal'` | `horizontal` |
| `[nzProgressDot]` | Steps with progress dot style, customize the progress dot by setting it with TemplateRef | `boolean｜TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>` | `false` |
| `[nzSize]` | To specify the size of the step bar, `default` and `small` are currently supported | `'small'｜'default'` | `'default'` |
| `[nzStatus]` | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | `'wait'｜'process'｜'finish'｜'error'` | `'process'` |
| `[nzStartIndex]` | To specify the starting number | `number` | `0` |

### nz-step

A single step in the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDescription]` | description of the step, optional property | `string｜TemplateRef<void>` | - |
| `[nzIcon]` | icon of the step, optional property | `string｜string[]｜Set<string>｜{ [klass: string]: any; }` ｜ `TemplateRef<void>` | - |
| `[nzStatus]` | to specify the status. It will be automatically set by `nzCurrent` of `nz-steps` if not configured. Optional values are: `wait` `process` `finish` `error` | `'wait'｜'process'｜'finish'｜'error'` | `'wait'` |
| `[nzTitle]` | title of the step | `string｜TemplateRef<void>` | - |
