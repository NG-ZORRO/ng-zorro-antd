---
category: Components
type: Navigation
title: Breadcrumb
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzBreadCrumbModule } from 'ng-zorro-antd';
```

### nz-breadcrumb

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSeparator]` | Custom separator | `string｜TemplateRef<void>` | `'/'` |
| `[nzAutoGenerate]` | Auto generate breadcrumb | `boolean` | `false` |

Using `[nzAutoGenerate]` by configuring `data` like this:

```ts
{
  path: '/path',
  component: SomeComponent,
  data: {
    breadcrumb: 'Display Name'
  }
}
```
