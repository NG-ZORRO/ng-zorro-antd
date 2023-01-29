---
category: Components
subtitle: cron form
type: Data Entry
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

| Parameter  | Description                                      | Type  | Default     |
|-------------|--------------------------------------------------|-------------|---------|
| `[nzType]` | Cron rule type                                   | `'linux'｜'spring'`          | `linux`  |
| `[nzSize]`   | The size of the input box.                       | `'large'｜'small'｜'default'` | `default` |
| `[nzCollapseDisable]`  | Hide collapse                                    | `boolean`                   | `false`  |
| `[nzExtra]`     | Render the content on the right                  | `TemplateRef<void>`         | -        |
| `[nzSemantic]`     | Custom rendering next execution time | `TemplateRef<void>`         | -        |