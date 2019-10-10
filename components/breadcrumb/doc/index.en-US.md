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

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
```

## API

### nz-breadcrumb

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSeparator]` | Custom separator | `string \| TemplateRef<void>` | `'/'` |
| `[nzAutoGenerate]` | Auto generate breadcrumb | `boolean` | `false` |
| `[nzRouteLabel]` | Name of property that determines displayed text in routing config. It should be used when `nzAutoGenerate` is `true` | `string` | `'breadcrumb'` |

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

For lazy loading moduels, you should write `data` in parent module like this:

```ts
{
  path: 'first',
  loadChildren: './first/first.module#FirstModule',
  data: {
    breadcrumb: 'First'
  },
}
```

use `nzRouteLabel` to custom `data` breadcrumb label:

```html
<nz-breadcrumb [nzAutoGenerate]="true" [nzRouteLabel]="'customBreadcrumb'"></nz-breadcrumb>
```

```ts
{
  path: 'path',
  component: SomeComponent,
  data: {
    customBreadcrumb: 'Display Name'
  }
}
```