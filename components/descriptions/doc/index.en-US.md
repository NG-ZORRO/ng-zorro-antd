---
category: Components
type: Data Display
title: Descriptions
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

### nz-descriptions

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | Describe the title of the list, displayed at the top | `string｜TemplateRef<void>` | `false` |
| `[nzBorder]` | Whether to display the border | `boolean` | `false` |
| `[nzColumn]` | The number of `nz-descriptions-item` in a row. it could be a number or a object like `{ xs: 8, sm: 16, md: 24}` | `number｜object` | - |
| `[nzSize]` | Set the size of the list. | `'default'｜'middle'｜'small'` | `'default'` |


### nz-descriptions-item

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | Description of the content | `boolean` | `false` |
| `[nzSpan]` | The number of columns included | `number` | `1` |
