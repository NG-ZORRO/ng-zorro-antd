---
category: Components
type: Feedback
title: Result
cols: 1
---

Used to feed back the results of a series of operational tasks.

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzResultModule } from 'ng-zorro-antd/result';
```

## API

### nz-result

| Property     | Description                             | Type                                                                              | Default  |
| ------------ | --------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| `nzTitle`    | title                                   | `TemplateRef<void>` \| `string`                                                   | -        |
| `nzSubTitle` | subTitle                                | `TemplateRef<void>` \| `string`                                                   | -        |
| `nzStatus`   | result status, decides icons and colors | `'success' \| 'error' \| 'info' \| 'warning'\| '404' \| '403' \| '500'` \| 'info' | `'info'` |
| `nzIcon`     | custom icon                             | `TemplateRef<void>` \| `string`                                                   | -        |
| `nzExtra`    | operating area                          | `TemplateRef<void>` \| `string`                                                   | -        |

### Counter Parts

You can use these directives as children of nz-result.

| Directive                                | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `i[nz-result-icon], div[nz-result-icon]` | custom icon                              |
| `div[nz-result-title]`                   | title                                    |
| `div[nz-result-subtitle]`                | subtitle                                 |
| `div[nz-result-content]`                 | contents, for detailed explanations      |
| `div[nz-result-extra]`                   | extra content, usually an operating area |
