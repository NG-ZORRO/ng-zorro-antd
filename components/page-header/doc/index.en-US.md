---
category: Components
type: Navigation
title: PageHeader
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg'
description: A header with common actions and design elements built in.
---

## When To Use

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

## API

```html
<nz-page-header nzTitle="Page Title"></nz-page-header>
```

### nz-page-header

| Param          | Description                 | Type                          | Default value                                                                                                                                                                                                                                   | Global Config |
| -------------- | --------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `[nzGhost]`    | Make background transparent | `boolean`                     | `true`                                                                                                                                                                                                                                          | ✅            |
| `[nzTitle]`    | Title string                | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                                               | -             |
| `[nzSubtitle]` | SubTitle string             | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                                               | -             |
| `[nzBackIcon]` | Custom back icon            | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                                               | -             |
| `(nzBack)`     | Back icon click event       | `EventEmitter<void>`          | Call [Location#back](https://angular.dev/api/common/Location#back) when the event not subscribed（you need import [RouterModule](https://angular.dev/api/router/RouterModule) or register [Location](https://angular.dev/api/common/Location)） | -             |

### Page header sections

| Element                                    | Description                                              |
| ------------------------------------------ | -------------------------------------------------------- |
| `nz-page-header-title`                     | Title section                                            |
| `nz-page-header-subtitle`                  | Subtitle section, `[nzTitle]` has high priority          |
| `nz-page-header-content`                   | Content section, `[nzSubtitle]` has high priority        |
| `nz-page-header-footer`                    | Footer section                                           |
| `nz-page-header-tags`                      | Tags container after the title                           |
| `nz-page-header-extra`                     | Operating area, at the end of the line of the title line |
| `nz-breadcrumb[nz-page-header-breadcrumb]` | Breadcrumb section                                       |
| `nz-avatar[nz-page-header-avatar]`         | Avatar section                                           |
