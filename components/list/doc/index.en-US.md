---
category: Components
type: Data Display
title: List
cols: 1
---

Simple List.

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzListModule } from 'ng-zorro-antd/list';
```

## API

### nz-list

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[nzDataSource]` | Data source for list | `any[]` | - |
| `[nzRenderItem]` | Custom item renderer | `TemplateRef<void>` | - |
| `[nzBordered]` | Toggles rendering of the border around the list | `boolean` | `false` |
| `[nzFooter]` | List footer renderer | `string \| TemplateRef<void>` | - |
| `[nzGrid]` | The grid type of list. You can set grid to something like `{gutter: 16, column: 4}` | `object` | - |
| `[nzHeader]` | List header renderer | `string \| TemplateRef<void>` | - |
| `[nzItemLayout]` | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | `'vertical' \| 'horizontal'` | `'horizontal'` |
| `[nzLoading]` | Shows a loading indicator while the contents of the list are being fetched | `boolean` | `false` |
| `[nzLoadMore]` | Shows a load more content | `TemplateRef<void>` | - |
| `[nzNoResult]` | Specify content to show when list is empty | `string`  \|  `TemplateRef<void>` | - |
| `[nzPagination]` | Shows a pagination content | `TemplateRef<void>` | - |
| `[nzSize]` | Size of list | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzSplit]` | Toggles rendering of the split under the list item | `boolean` | `true` |

#### nzGrid

| Property | Description | Type | Default
| --- | --- | --- | --- |
| column | column of grid | `number` | - |
| gutter | spacing between grid | `number` | `0` |
| xs | `<576px` column of grid | `number` | - |
| sm | `≥576px` column of grid | `number` | - |
| md | `≥768px` column of grid | `number` | - |
| lg | `≥992px` column of grid | `number` | - |
| xl | `≥1200px` column of grid | `number` | - |
| xxl | `≥1600px` column of grid | `number` | - |

### nz-list-item

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[nzContent]` | content renderer | `string \| TemplateRef<void>` | - |
| `[nzActions]` | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right. | `Array<TemplateRef<void>>` | - |
| `[nzExtra]` | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right. | `TemplateRef<void>` | - |
| `[nzNoFlex]` | Whether it's not `flex` layout rendering | `boolean` | `false` |

### nz-list-item-meta

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[nzAvatar]` | The avatar of list item | `string \| TemplateRef<void>` | - |
| `[nzDescription]` | The description of list item | `string \| TemplateRef<void>` | - |
| `[nzTitle]` | The title of list item | `string \| TemplateRef<void>` | - |
