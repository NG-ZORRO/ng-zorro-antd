---
category: Components
subtitle: 面包屑
type: 导航
title: Breadcrumb
cover: 'https://gw.alipayobjects.com/zos/alicdn/9Ltop8JwH/Breadcrumb.svg'
description: 显示当前页面在系统层级结构中的位置，并能向上返回。
---

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### nz-breadcrumb

| 参数               | 说明                                                                                               | 类型                                  | 默认值           |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------- |
| `[nzSeparator]`    | 分隔符自定义                                                                                       | `string \| TemplateRef<void> \| null` | `'/'`            |
| `[nzAutoGenerate]` | 自动生成 Breadcrumb                                                                                | `boolean`                             | `false`          |
| `[nzRouteLabel]`   | 自定义 route data 属性名称，`nzAutoGenerate` 为 `true` 时才生效                                    | `string`                              | `'breadcrumb'`   |
| `[nzRouteLabelFn]` | 格式化面包屑导航项的显示文字，通常用于在国际化应用中翻译键值， `nzAutoGenerate` 为 `true` 时才生效 | `(label:string) => string`            | `label => label` |
| `[nzRouteFn]`      | 格式化面包屑路由格式，可用于为 URL 添加 query params，`nzAutoGenerate` 为 `true` 时才生效          | `(route:string) => route`             | `route => route` |

使用 `[nzAutoGenerate]` 时，需要在路由类中定义 `data`:

```ts
{
  path: 'path',
  component: SomeComponent,
  data: {
    breadcrumb: 'Display Name'
  }
}
```

对于懒加载路由，应该在父层路由写 `data`：

```ts
{
  path: 'first',
  loadChildren: () => import('./first/first.module').then(m => m.FirstModule),
  data: {
    breadcrumb: 'First'
  },
}
```

使用 `nzRouteLabel` 自定义路由属性名称:

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

使用 `nzRouteLabelFn` 在国际化应用中格式化面包屑导航项的文本:

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
translateFn = (key: string) => this.yourI18nService.translate(key);
```

使用 `nzRouteFn` 来使用格式化 URL 或添加 query params：

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
