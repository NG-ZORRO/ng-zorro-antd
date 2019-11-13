---
category: Components
type: Navigation
title: PageHeader
cols: 1
---

The header is used to declare the theme of the page, which contains the most important information that the user is concerned about.

## When To Use

Use when you need the user to quickly understand what the current page is and what its features are.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
```

## API

```html
<nz-page-header nzTitle="Page Title"></nz-page-header>
```

### nz-page-header
| Param | Description | Type | Default value | Global Config |
| ----- | ----------- | ---- | ------------- | ------------- |
| `[nzGhost]` | Make background transparent | `boolean` | `true` | ✅ |
| `[nzTitle]` | Title string | `string \| TemplateRef<void>` | - | - |
| `[nzSubtitle]` | SubTitle string | `string \| TemplateRef<void>` | - | - |
| `[nzBackIcon]` | Custom back icon | `string \| TemplateRef<void>` | - | - |
| `(nzBack)` | Back icon click event | `EventEmitter<void>` | Call [Location[back]](https://angular.io/api/common/Location#back) when the event not subscribed | - |

### Page header sections
| Element | Description |
| ----- | ----------- | ---- | ------------- |
| `nz-page-header-title` | Title section |
| `nz-page-header-subtitle` | Subtitle section, `[nzTitle]` has high priority |
| `nz-page-header-content` | Content section, `[nzSubtitle]` has high priority |
| `nz-page-header-footer` | Footer section |
| `nz-page-header-tags` |  Tags container after the title |
| `nz-page-header-extra` | Operating area, at the end of the line of the title line |
| `nz-breadcrumb[nz-page-header-breadcrumb]` | Breadcrumb section |
| `nz-avatar[nz-page-header-avatar]` | Avatar section |
