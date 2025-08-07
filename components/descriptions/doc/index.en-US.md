---
category: Components
type: Data Display
title: Descriptions
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/MjtG9_FOI/Descriptions.svg'
description: Display multiple read-only fields in a group.
---

## When To Use

Commonly displayed on the details page.

## API

### nz-descriptions

| Property       | Description                                                                                                     | Type                               | Default                                         | Global Config |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | ------------- |
| `[nzTitle]`    | Describe the title of the list, displayed at the top                                                            | `string \| TemplateRef<void>`      | `false`                                         |
| `[nzExtra]`    | The action area of the description list, placed at the top-right                                                | `string \| TemplateRef<void>`      | `-`                                             |
| `[nzBordered]` | Whether to display the border                                                                                   | `boolean`                          | `false`                                         | ✅            |
| `[nzColumn]`   | The number of `nz-descriptions-item` in a row. It could be a number or a object like `{ xs: 8, sm: 16, md: 24}` | `number \| object`                 | `{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }` | ✅            |
| `[nzSize]`     | Set the size of the list. Only works when `nzBordered` is set                                                   | `'default' \| 'middle' \| 'small'` | `'default'`                                     | ✅            |
| `[nzColon]`    | Show colon after title                                                                                          | `boolean`                          | `true`                                          | ✅            |
| `[nzLayout]`   | Set the layout of the list                                                                                      | `'horizontal' \| 'vertical'`       | `'horizontal'`                                  |               |

### nz-descriptions-item

| Property    | Description                    | Type      | Default                       |
| ----------- | ------------------------------ | --------- | ----------------------------- |
| `[nzTitle]` | Description of the content     | `boolean` | `string \| TemplateRef<void>` |
| `[nzSpan]`  | The number of columns included | `number`  | `1`                           |
