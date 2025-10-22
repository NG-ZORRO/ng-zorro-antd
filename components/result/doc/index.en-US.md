---
category: Components
type: Feedback
title: Result
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/9nepwjaLa/Result.svg'
description: Used to feed back the results of a series of operational tasks.
---

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## API

### nz-result

| Property     | Description                             | Type                                                                    | Default  |
| ------------ | --------------------------------------- | ----------------------------------------------------------------------- | -------- |
| `nzTitle`    | title                                   | `TemplateRef<void> \| string`                                           | -        |
| `nzSubTitle` | subTitle                                | `TemplateRef<void> \| string`                                           | -        |
| `nzStatus`   | result status, decides icons and colors | `'success' \| 'error' \| 'info' \| 'warning'\| '404' \| '403' \| '500'` | `'info'` |
| `nzIcon`     | custom icon                             | `TemplateRef<void> \| string`                                           | -        |
| `nzExtra`    | operating area                          | `TemplateRef<void> \| string`                                           | -        |

### Counter Parts

You can use these directives as children of nz-result.

| Directive                                | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `i[nz-result-icon], div[nz-result-icon]` | custom icon                              |
| `div[nz-result-title]`                   | title                                    |
| `div[nz-result-subtitle]`                | subtitle                                 |
| `div[nz-result-content]`                 | contents, for detailed explanations      |
| `div[nz-result-extra]`                   | extra content, usually an operating area |
