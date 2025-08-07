---
category: Components
type: Data Display
title: Timeline
cover: 'https://gw.alipayobjects.com/zos/antfincdn/vJmo00mmgR/Timeline.svg'
description: Vertical display timeline.
---

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

| Property         | Description                                                                         | Type                                           | Default                        |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| `[nzPending]`    | Set the last ghost node's existence or its content                                  | `string \| boolean \| TemplateRef<void>`       | `false`                        |
| `[nzPendingDot]` | Set the dot of the last ghost node when pending is true                             | `string \| TemplateRef<void>`                  | `<nz-icon nzType="loading" />` |
| `[nzReverse]`    | Reverse nodes or not                                                                | `boolean`                                      | `false`                        |
| `[nzMode]`       | By sending `alternate` the timeline will distribute the nodes to the left and right | `'left' \| 'alternate' \| 'right' \| 'custom'` | -                              |

### nz-timeline-item

Node of timeline

| Property       | Description                                                                             | Type                          | Default |
| -------------- | --------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `[nzColor]`    | Set the circle's color to `'blue' \| 'red' \| 'green' \| 'gray'` or other custom colors | `string`                      | `blue`  |
| `[nzDot]`      | Customize timeline dot                                                                  | `string \| TemplateRef<void>` | -       |
| `[nzPosition]` | Customize position, only works when `nzMode` is `custom`                                | `'left' \| 'right'`           | -       |
| `[nzLabel]`    | Set the label                                                                           | `string \| TemplateRef<void>` | -       |
