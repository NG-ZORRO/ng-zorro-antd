---
category: Components
type: Data Display
title: List
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg
---

Simple List.

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

```ts
import { NzListModule } from 'ng-zorro-antd/list';
```

## API

### nz-list:standalone

| Property         | Description                                                                                                           | Type                              | Default        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------------- |
| `[nzBordered]`   | Toggles rendering of the border around the list                                                                       | `boolean`                         | `false`        |
| `[nzFooter]`     | List footer renderer                                                                                                  | `string \| TemplateRef<void>`     | -              |
| `[nzHeader]`     | List header renderer                                                                                                  | `string \| TemplateRef<void>`     | -              |
| `[nzItemLayout]` | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | `'vertical' \| 'horizontal'`      | `'horizontal'` |
| `[nzLoading]`    | Shows a loading indicator while the contents of the list are being fetched                                            | `boolean`                         | `false`        |
| `[nzSize]`       | Size of list                                                                                                          | `'large' \| 'small' \| 'default'` | `'default'`    |
| `[nzSplit]`      | Toggles rendering of the split under the list item                                                                    | `boolean`                         | `true`         |

### nz-list-empty:standalone

Empty content component for the list.

| Property       | Description   | Type                          | Default |
| -------------- | ------------- | ----------------------------- | ------- |
| `[nzNoResult]` | Empty content | `string \| TemplateRef<void>` | -       |

### nz-list[nzGrid]:standalone

Use grid layout for the list.

### nz-list-header:standalone

Header component for the list.

### nz-list-footer:standalone

Footer component for the list.

### nz-list-pagination:standalone

Pagination component for the list.

### nz-list-load-more:standalone

Load more component for the list.

---

### nz-list-item:standalone

| Property     | Description                              | Type      | Default |
| ------------ | ---------------------------------------- | --------- | ------- |
| `[nzNoFlex]` | Whether it's not `flex` layout rendering | `boolean` | `false` |

#### ul[nz-list-item-actions]

Actions container component for the list items.

#### nz-list-item-action

Action component for the list items.

#### nz-list-item-extra

Extra content for the list items.

---

### nz-list-item-meta:standalone

| Property          | Description                  | Type                          | Default |
| ----------------- | ---------------------------- | ----------------------------- | ------- |
| `[nzAvatar]`      | The avatar of list item      | `string \| TemplateRef<void>` | -       |
| `[nzDescription]` | The description of list item | `string \| TemplateRef<void>` | -       |
| `[nzTitle]`       | The title of list item       | `string \| TemplateRef<void>` | -       |

#### nz-list-item-meta-title

Title component for the list items meta part.

#### nz-list-item-meta-description

Description component for the list items meta part.

#### nz-list-item-meta-avatar

Avatar component for the list items meta part.

| Property  | Description                                  | Type     | Default | Global Config |
| --------- | -------------------------------------------- | -------- | ------- | ------------- |
| `[nzSrc]` | The address of the image for an image avatar | `string` | -       |
