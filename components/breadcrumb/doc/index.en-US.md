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

### nz-breadcrumb

| Property | Description | Type | Optional | Default |
| -------- | ----------- | ---- | -------- | ------- |
| `[nzSeparator]` | Custom separator | string丨`TemplateRef<void>` |  | `/` |
| `[nzAutoGenerate]` | Auto generate breadcrumb | boolean |  | `false` |

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
