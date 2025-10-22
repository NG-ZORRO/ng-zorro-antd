---
category: Components
type: Navigation
title: Breadcrumb
cover: 'https://gw.alipayobjects.com/zos/alicdn/9Ltop8JwH/Breadcrumb.svg'
description: Displays the current location within a hierarchy. And allow going back to states higher up in the hierarchy.
---

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

## API

### nz-breadcrumb

| Property           | Description                                                                                                                                                                                                      | Type                                  | Default          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------- |
| `[nzSeparator]`    | Custom separator                                                                                                                                                                                                 | `string \| TemplateRef<void> \| null` | `'/'`            |
| `[nzAutoGenerate]` | Auto generate breadcrumb                                                                                                                                                                                         | `boolean`                             | `false`          |
| `[nzRouteLabel]`   | Name of property that determines displayed text in routing config. It should be used when `nzAutoGenerate` is `true`                                                                                             | `string`                              | `'breadcrumb'`   |
| `[nzRouteLabelFn]` | Format breadcrumb item label text, normally used in international app to translate i18n key. It should be used when `nzAutoGenerate` is `true`                                                                   | `(label:string) => string`            | `label => label` |
| `[nzRouteFn]`      | Format breadcrumb item route, normally used in international app to bind current params or query strings to avoid losing them while navigate using breadcrumb. It should be used when `nzAutoGenerate` is `true` | `(route:string) => route`             | `route => route` |

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
  loadChildren: () => import('./first/first.module').then(m => m.FirstModule),
  data: {
    breadcrumb: 'First'
  },
}
```

Use `nzRouteLabel` to custom `data` breadcrumb label:

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

Use `nzRouteLabelFn` to format breadcrumb label in international application:

```html
<nz-breadcrumb
  [nzAutoGenerate]="true"
  [nzRouteLabel]="'breadcrumbI18nKey'"
  [nzRouteLabelFn]="translateFn"
></nz-breadcrumb>
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

Use `nzRouteFn` to format or bind params and query strings to the route it self in international application:

```html
<nz-breadcrumb
  [nzAutoGenerate]="true"
  [nzRouteLabel]="'breadcrumbI18nKey'"
  [nzRouteLabelFn]="translateFn"
  [nzRouteFn]="customRoute"
></nz-breadcrumb>
```

```ts
// In component
bindCurrentParams(params, route) {
  let newRoute = route;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      newRoute += `;${key}=${params[key]}`;
    }
  }
  return newRoute;
}

const params = this.activatedRoute.snapshot.params;

customRoute = (route:string) => this.bindCurrentParams(params,route);
```
