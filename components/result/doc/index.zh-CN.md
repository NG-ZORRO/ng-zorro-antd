---
category: Components
type: Feedback
title: Result
subtitle: 结果
cols: 1
---

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
---
category: Components
type: Feedback
title: Result
cols: 1
---

Used to feed back the results of a series of operational tasks.

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## API

### nz-result

| 参数 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| `[nzIcon]` | 展示在顶部的 icon  | `NzResultIcon｜TemplateRef<void>` | info |
| `[nzTitle]` | 标题 | `string｜TemplateRef<void>` | - |
| `[nzSubtitle]` | 副标题 | `string｜TemplateRef<void>` | - |
| `[nzExtra]` | 附加内容，通常是一个可交互的区域 | `string｜TemplateRef<void>` | - |

### Nz result 组成部分

当向 `nz-result` 传入相应的参数时，以下元素将会不生效。

| 元素 | 说明 |
| ------- | ----------- |
| `[nz-result-icon]` | A big icon displayed on the top |
| `nz-result-title, [nz-result-title]` | Title |
| `nz-result-subtitle, [nz-result-subtitle]` | Subtitle |
| `nz-result-content, [nz-result-content]` | Contents, for detailed explanations |
| `nz-result-extra, [nz-result-extra]` | Extra content, usually an operating area |

### NzResultIcon

```ts
export type NzResultIcon = 'success' | 'error' | 'info' | 'warning'`;
```