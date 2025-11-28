---
category: Components
type: Navigation
title: Pagination
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/1vqv2bj68/Pagination.svg'
description: A long list can be divided into several pages by `Pagination`, and only one page will be loaded at a time.
---

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## API

```html
<nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
```

### nz-pagination

| Property               | Description                                                    | Type                                                                                         | Default            | Global Config | Version |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------ | ------------- | ------- |
| `[nzTotal]`            | total number of data items                                     | `number`                                                                                     | `0`                | -             |
| `[nzPageIndex]`        | current page number，double binding                            | `number`                                                                                     | `1`                | -             |
| `[nzPageSize]`         | number of data items per page, double binding                  | `number`                                                                                     | `10`               | -             |
| `[nzDisabled]`         | disable pagination                                             | `boolean`                                                                                    | `false`            | -             |
| `[nzShowQuickJumper]`  | determine whether you can jump to pages directly               | `boolean`                                                                                    | `false`            | ✅            |
| `[nzShowSizeChanger]`  | determine whether `nzPageSize` can be changed                  | `boolean`                                                                                    | `false`            | ✅            |
| `[nzSimple]`           | whether to use simple mode                                     | `boolean`                                                                                    | -                  | ✅            |
| `[nzSize]`             | specify the size of `nz-pagination`                            | `'small' \| 'default'`                                                                       | `'default'`        | ✅            |
| `[nzResponsive]`       | `Pagination` would resize according to the width of the window | `boolean`                                                                                    | `false`            | -             |
| `[nzPageSizeOptions]`  | specify the sizeChanger options                                | `number[]`                                                                                   | `[10, 20, 30, 40]` | ✅            |
| `[nzItemRender]`       | to customize item                                              | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next'\| 'prev_5'\| 'next_5', page: number }>` | -                  | -             |
| `[nzShowTotal]`        | to display the total number and range                          | `TemplateRef<{ $implicit: number, range: [ number, number ] }>`                              | -                  | -             |
| `[nzHideOnSinglePage]` | Whether to hide pager on single page                           | `boolean`                                                                                    | `false`            | -             |
| `[nzAlign]`            | Align                                                          | `NzPaginationAlign`                                                                          | `start`            | -             | 20.4.0  |
| `(nzPageIndexChange)`  | current page number change callback                            | `EventEmitter<number>`                                                                       | -                  | -             |
| `(nzPageSizeChange)`   | number of data items per page change callback                  | `EventEmitter<number>`                                                                       | -                  | -             |
