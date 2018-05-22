---
category: Components
type: Data Display
title: List
cols: 1
---

Simple List.

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

## API

### List

| Property | Description | Type | Default
| --- | --- | --- | --- |
| nzDataSource | Data source for list | `any[]` | - |
| nzRenderItem | Custom item renderer | `TemplateRef` | - |
| nzBordered | Toggles rendering of the border around the list | boolean | false |
| nzFooter | List footer renderer | `string,TemplateRef` | - |
| nzGrid | The grid type of list. You can set grid to something like `{gutter: 16, column: 4}` | object | - |
| nzHeader | List header renderer | `string,TemplateRef` | - |
| nzItemLayout | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | string | - |
| nzLoading | Shows a loading indicator while the contents of the list are being fetched | boolean | false |
| nzLoadMore | Shows a load more content | `TemplateRef` | - |
| nzPagination | Shows a pagination content | `TemplateRef` | - |
| nzSize | Size of list | `default,small,large` | `default` |
| nzSplit | Toggles rendering of the split under the list item | boolean | true |

### List grid props

| Property | Description | Type | Default
| --- | --- | --- | --- |
| column | column of grid | number | - |
| gutter | spacing between grid | number | 0 |
| xs | `<576px` column of grid | number | - |
| sm | `≥576px` column of grid | number | - |
| md | `≥768px` column of grid | number | - |
| lg | `≥992px` column of grid | number | - |
| xl | `≥1200px` column of grid | number | - |
| xxl | `≥1600px` column of grid | number | - |

### nz-list-item

| Property | Description | Type | Default
| --- | --- | --- | --- |
| nzContent | content renderer | `string,TemplateRef` | - |
| nzActions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right. | `Array<TemplateRef<void>>` | - |
| nzExtra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right. | `TemplateRef` | - |

### nz-list-item-meta

| Property | Description | Type | Default
| --- | --- | --- | --- |
| nzAvatar | The avatar of list item | `string,TemplateRef` | - |
| nzDescription | The description of list item | `string,TemplateRef` | - |
| nzTitle | The title of list item | `string,TemplateRef` | - |
