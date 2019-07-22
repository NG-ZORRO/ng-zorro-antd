---
category: Components
type: Data Display
title: Timeline
---

Vertical display timeline.

## When To Use

- When a series of information needs to be ordered by time (ascend or descend).
- When you need a timeline to make a visual connection.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
```

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
| `[nzPending]` | Set the last ghost node's existence or its content | `string\|boolean\|TemplateRef<void>` | `false` |
| `[nzPendingDot]` | Set the dot of the last ghost node when pending is true | `string\|TemplateRef<void>` | `<i nz-icon nzType="loading"></i>` |
| `[nzReverse]` | Reverse nodes or not | `boolean` | `false` |
| `[nzMode]` | By sending `alternate` the timeline will distribute the nodes to the left and right | `'left' \| 'alternate' \| 'right'` | - |

### nz-timeline-item

Node of timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzColor]` | Set the circle's color to `'blue' \| 'red' \| 'green' \| 'gray'` or other custom colors (css color) | `string` | `blue` |
| `[nzDot]` | Customize timeline dot | `string \| TemplateRef<void>` | - |
