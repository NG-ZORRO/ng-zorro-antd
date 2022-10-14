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

| Parameter  | Description                     | Type  | Default     |
|-------------|---------------|-------------|---------|
| `[nzSize]`   | The size of the input box.   | `'large'｜'small'｜'default'` | `default` |
| `[nzCronType]` | Set cron rule type, optional value is `linux` and `spring` or not set            | `'linux'｜'spring'`  | `linux`  |
| `[nzVisible]` | Hide quick settings                         | `boolean` | `false` |
| `[nzType]`  | can be set to `primary` `dashed` `text` `link` or omitted, Takes effect when `[nzVisible]=false` | `'primary'｜'dashed'｜'link'｜'text'` | -  |
| `[nzOptions]` | Options for Modifying Quick Settings, Takes effect when `[nzVisible]=false`                      | `NzCronOptions`  | - |
