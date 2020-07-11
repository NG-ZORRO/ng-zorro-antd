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

```ts
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
```

## API

### nz-breadcrumb

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSeparator]` | Custom separator | `string \| TemplateRef<void> \| null` | `'/'` |
| `[nzAutoGenerate]` | Auto generate breadcrumb | `boolean` | `false` |
| `[nzRouteLabel]` | Name of property that determines displayed text in routing config. It should be used when `nzAutoGenerate` is `true` | `string` | `'breadcrumb'` |
| `[nzRouteLabelFn]` | Format breadcrumb item label text，normally used in international app to translate i18n key. It should be used when `nzAutoGenerate` is `true` | `(label:string) => string` | `label => label` |

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

For lazy loading modules, you should write `data` in parent module like this:

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

use `nzRouteLabelFn` to format breadcrumb label in international application:

```html
<nz-breadcrumb [nzAutoGenerate]="true" [nzRouteLabel]="'breadcrumbI18nKey'" [nzRouteLabelFn]="translateFn"></nz-breadcrumb>
```

```ts
// In Route
{
  path: 'path',
  component: SomeComponent,
  data: {
    breadcrumbI18nKey: 'i18n.aaa.bbbb'
  }
}

// In component
translateFn = (key:string) => this.yourI18nService.translate(key);
```