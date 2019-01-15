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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzIcon]` | A big icon displayed on the top  | `NzResultIcon｜TemplateRef<void>` | info |
| `[nzTitle]` | Title | `string｜TemplateRef<void>` | - |
| `[nzSubtitle]` | Subtitle | `string｜TemplateRef<void>` | - |
| `[nzExtra]` | Extra content, usually an operating area | `string｜TemplateRef<void>` | - |

### Nz result sections

When corresponding properties are passed to `nz-result`, these elements would not be valid.

| Element | Description |
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