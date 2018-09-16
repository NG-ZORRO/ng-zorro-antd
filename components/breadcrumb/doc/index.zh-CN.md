---
category: Components
subtitle: 面包屑
type: Navigation
title: Breadcrumb
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### nz-breadcrumb

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| `[nzSeparator]` | 分隔符自定义 | string丨`TemplateRef<void>` |  | '/' |
| `[nzAutoGenerate]` | 自动生成 Breadcrumb | boolean |  | `false` |

使用 `[nzAutoGenerate]` 时，需要在路由类中定义 `data`:

```ts
{
  path: '/path',
  component: SomeComponent,
  data: {
    breadcrumb: 'Display Name'
  }
}
```
