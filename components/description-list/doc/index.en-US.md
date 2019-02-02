---
category: Components
type: Data Display
title: Description List
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

### nz-description-list

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | Describe the title of the list, displayed at the top | `string｜TemplateRef<void>` | `false` |
| `[nzBorder]` | Whether to display the border | `boolean` | `false` |
| `[nzColumn]` | The number of `nz-description-list-item` in a row | `string｜TemplateRef<void>` | - |
| `[nzSize]` | Set the size of the list. | `default｜middle｜small` | `default` |


### nz-description-list-item

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | Description of the content | `boolean` | `false` |
| `[nzSpan]` | The number of columns included | `number` | `1` |
