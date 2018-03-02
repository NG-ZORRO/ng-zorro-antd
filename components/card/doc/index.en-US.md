---
category: Components
type: Data Display
title: Card
cols: 1
---

Simple rectangular container.

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## API

```html
<nz-card nzTitle="卡片标题">卡片内容</nz-card>
```

### nz-card

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzActions | The action list, shows at the bottom of the Card. | `Array<TemplateRef<void>>` | - |
| nzBodyStyle | Inline style to apply to the card content | `{ [key: string]: string }` | - |
| nzBordered | Toggles rendering of the border around the card | boolean | `true` |
| nzCover | Card cover | `TemplateRef<void>` | - |
| nzExtra | Content to render in the top-right corner of the card | string｜`TemplateRef<void>` | - |
| nzHoverable | Lift up when hovering card | boolean | false |
| nzLoading | Shows a loading indicator while the contents of the card are being fetched | boolean | false |
| nzTitle | Card title | string｜`TemplateRef<void>` | - |
| nzType | Card style type, can be set to `inner` or not set | string | - |


### nz-card-meta

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAvatar | avatar or icon | `TemplateRef<void>` | - |
| nzDescription | description content |string｜ `TemplateRef<void>` | - |
| nzTitle | title content | string｜`TemplateRef<void>` | - |

### nz-card-grid
Area for grid style card 

### nz-card-tab
Area for tab card
