---
category: Components
subtitle: cron form
type: Code Editor
title: Cron Expression
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

## When To Use

When you want to use cron in Angular.

### Import Module

```ts
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';
```

## API

Install `cron-parser` in your project first:

```sh
npm install cron-parser
```

### nz-cron-expression

| Parameter  | Description        | Type  | Default     |
|-------------|---------|----------------------------|---------|
| `[nzSize]`   | The size of the input box.    | `'large'｜'small'｜'default'` | `default` |
| `[nzType]`  | can be set to `primary` `dashed` `text` `link` or omitted | `'primary'｜'dashed'｜'link'｜'text'` | -  |
| `[nzVisible]`      | Hide quick settings   | `boolean` | `false` |
| `[nzOptions]` | Options for Modifying Quick Settings    | `NzCronOptions`  | - |
