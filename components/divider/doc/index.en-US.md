---
category: Components
type: Layout
title: Divider
cover: 'https://gw.alipayobjects.com/zos/alicdn/5swjECahe/Divider.svg'
description: A divider line separates different content.
---

## When To Use

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

## API

### nz-divider

| Property          | Description                             | Type                              | Default        |
| ----------------- | --------------------------------------- | --------------------------------- | -------------- |
| `[nzDashed]`      | whether line is dashed                  | `boolean`                         | `false`        |
| `[nzType]`        | direction type of divider               | `'horizontal' \| 'vertical'`      | `'horizontal'` |
| `[nzText]`        | inner text of divider                   | `string \| TemplateRef<void>`     | -              |
| `[nzPlain]`       | Divider text show as plain style        | `boolean`                         | `false`        |
| `[nzOrientation]` | inner text orientation                  | `'center' \| 'left' \| 'right'`   | `'center'`     |
| `[nzVariant]`     | Whether line is dashed, dotted or solid | `'dashed' \| 'dotted' \| 'solid'` | `'solid'`      |
