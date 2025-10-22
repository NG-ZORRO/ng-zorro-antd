---
category: Components
subtitle: cron form
type: Data Entry
title: Cron Expression
cols: 1
experimental: true
description: Display and edit cron expression.
---

## When To Use

When you want to use cron expression in Angular.

## API

Install `cron-parser` in your project first:

```sh
npm install cron-parser
```

### nz-cron-expression

| Parameter             | Description                          | Type                          | Default   |
| --------------------- | ------------------------------------ | ----------------------------- | --------- |
| `[nzType]`            | Cron rule type                       | `'linux'｜'spring'`           | `linux`   |
| `[nzDisabled]`        | Disable                              | `boolean`                     | `false`   |
| `[nzBorderless]`      | Whether to hide the border           | `boolean`                     | `false`   |
| `[nzSize]`            | The size of the input box.           | `'large'｜'small'｜'default'` | `default` |
| `[nzCollapseDisable]` | Hide collapse                        | `boolean`                     | `false`   |
| `[nzExtra]`           | Render the content on the right      | `TemplateRef<void>`           | -         |
| `[nzSemantic]`        | Custom rendering next execution time | `TemplateRef<void>`           | -         |

## Note

### Supported format

```text
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31, L)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```
