---
category: Components
type: Data Display
title: Timeline
---

Vertical display timeline.

## When To Use

- When a series of information needs to be ordered by time (ascend or descend).
- When you need a timeline to make a visual connection.

## API

```html
<nz-timeline>
  <nz-timeline-item>step1 2015-09-01</nz-timeline-item>
  <nz-timeline-item>step2 2015-09-01</nz-timeline-item>
  <nz-timeline-item>step3 2015-09-01</nz-timeline-item>
  <nz-timeline-item>step4 2015-09-01</nz-timeline-item>
</nz-timeline>
```

### nz-timeline

Timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzPending]` | Set the last ghost node's existence or its content | boolean｜string｜`TemplateRef<void>` | `false` |

### nz-timeline-item

Node of timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzColor]` | Set the circle's color to `blue`, `red`, `green` or other custom colors (css color) | string | `blue` |
| `[nzDot]` | Customize timeline dot | string｜`TemplateRef<void>` | - |
