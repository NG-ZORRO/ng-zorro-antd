---
category: Components
cols: 1
type: Data Display
title: Table
cover: 'https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg'
description: A table displays rows of data.
---

## When To Use

- To display a collection of structured data.
- To sort, search, paginate and filter data.

## How To Use

The Table component is both easy to use and highly customizable.

### Highly Customizable

The `nz-table` can be used like [` W3C Standard <table>`](https://www.w3.org/TR/html401/struct/tables.html). Developers can control every part of the table as they wish.

### Component Enhancements

The component in `nz-table` such as `th`, `td`, `thead` etc. are enhanced. Developers can make the table sortable, filterable, with fixed header, perform server side rendering etc. easily with the provided api.

### Data Processing

The data passed to `[nzData]` is exported with [Template Context](https://angular.dev/guide/templates/template-statements#statement-context) after processing (including paging, sorting and filtering). `*ngFor` can be used to render current page data in table.

```html
<nz-table #basicTable [nzData]="dataSet">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Address</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of basicTable.data">
      <td>{{data.name}}</td>
      <td>{{data.age}}</td>
      <td>{{data.address}}</td>
      <td>
        <a>Action 一 {{data.name}}</a>
        <nz-divider nzType="vertical"></nz-divider>
        <a>Delete</a>
      </td>
    </tr>
  </tbody>
</nz-table>
```

## API

### nz-table

| Property                    | Description                                                                                                                                                                              | Type                                                                   | Default            | Global Config |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------ | ------------- |
| `[nzData]`                  | Data record array to be rendered                                                                                                                                                         | `T[]`                                                                  | -                  |
| `[nzFrontPagination]`       | Whether to paginate data on client. Should be set to `false` if data is to be paginated on server side or if all the data is to be displayed at once in the table without any pagination | `boolean`                                                              | `true`             |
| `[nzTotal]`                 | Total data count. Should set when `nzFrontPagination` is `false`                                                                                                                         | `number`                                                               | -                  |
| `[nzCustomColumn]`          | Control the display and sorting of table columns, (after enabling `nzWidthConfig` and `[nzWidth]` of `th` will not take effect)                                                          | `NzCustomColumn[]`                                                     | -                  |
| `[nzPageIndex]`             | pageIndex , double binding                                                                                                                                                               | `number`                                                               | -                  |
| `[nzPageSize]`              | pageSize, double binding                                                                                                                                                                 | `number`                                                               | -                  |
| `[nzShowPagination]`        | Whether to show pagination component at bottom of the table                                                                                                                              | `boolean`                                                              | `true`             |
| `[nzPaginationPosition]`    | Specify the position of pagination                                                                                                                                                       | `'top' \| 'bottom' \| 'both'`                                          | `'bottom'`         |
| `[nzPaginationType]`        | Specify the size of pagination                                                                                                                                                           | `'default' \| 'small'`                                                 | `'default'`        |
| `[nzBordered]`              | Whether to show all table borders                                                                                                                                                        | `boolean`                                                              | `false`            | ✅            |
| `[nzOuterBordered]`         | Whether to show table outer borders                                                                                                                                                      | `boolean`                                                              | `false`            | -             |
| `[nzWidthConfig]`           | Set col width can not used with `[nzWidth]` of `th`                                                                                                                                      | `string[]`                                                             | `[]`               |
| `[nzSize]`                  | Size of table                                                                                                                                                                            | `'middle' \| 'small' \| 'default'`                                     | `'default'`        | ✅            |
| `[nzLoading]`               | Loading status of table                                                                                                                                                                  | `boolean`                                                              | `false`            |
| `[nzLoadingIndicator]`      | The loading indicator                                                                                                                                                                    | `TemplateRef<void>`                                                    | -                  | ✅            |
| `[nzLoadingDelay]`          | Specifies a delay in milliseconds for loading state (prevents flush)                                                                                                                     | `number`                                                               | `0`                |
| `[nzScroll]`                | Whether table can be scrolled in x/y direction. `x` or `y` can be a string that indicates the width and height of table body                                                             | `object`                                                               | -                  |
| `[nzTitle]`                 | Table title renderer                                                                                                                                                                     | `string \| TemplateRef<void>`                                          | -                  |
| `[nzFooter]`                | Table footer renderer                                                                                                                                                                    | `string \| TemplateRef<void>`                                          | -                  |
| `[nzNoResult]`              | Custom no result content                                                                                                                                                                 | `string \| TemplateRef<void>`                                          | -                  |
| `[nzPageSizeOptions]`       | Specify the sizeChanger options                                                                                                                                                          | `number[]`                                                             | `[10, 20, 30, 40]` |
| `[nzShowQuickJumper]`       | Determine whether you can jump to pages directly                                                                                                                                         | `boolean`                                                              | `false`            | ✅            |
| `[nzShowSizeChanger]`       | Determine whether `nzPageSize` can be changed                                                                                                                                            | `boolean`                                                              | `false`            | ✅            |
| `[nzShowTotal]`             | To display Pagination total number and range, same as Pagination                                                                                                                         | `TemplateRef<{ $implicit: number, range: [ number, number ] }>`        | -                  |
| `[nzItemRender]`            | To customize Pagination item, same as Pagination                                                                                                                                         | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next', page: number }>` | -                  |
| `[nzHideOnSinglePage]`      | Whether to hide pagination on single page                                                                                                                                                | `boolean`                                                              | `false`            |
| `[nzSimple]`                | Whether to use simple mode                                                                                                                                                               | `boolean`                                                              | -                  | ✅            |
| `[nzTemplateMode]`          | Template mode，no need to pass data to `nzData`                                                                                                                                          | `boolean`                                                              | `false`            |
| `[nzVirtualItemSize]`       | The size of the items in the list, same as [cdk itemSize](https://material.angular.io/cdk/scrolling/api)                                                                                 | `number`                                                               | `0`                |
| `[nzVirtualMaxBufferPx]`    | The number of pixels worth of buffer to render for when rendering new items, same as [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api)                                    | `number`                                                               | `200`              |
| `[nzVirtualMinBufferPx]`    | The minimum amount of buffer rendered beyond the viewport (in pixels),same as [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api)                                           | `number`                                                               | `100`              |
| `[nzVirtualForTrackBy]`     | The TrackByFunction to be used for tracking changes.                                                                                                                                     | `TrackByFunction<T>`                                                   | -                  |
| `[noDataVirtualHeight]`     | Height of inner scroll when having no data, if nothing is passed the default value is used.                                                                                              | `string`                                                               | `'182px'`          |
| `(nzPageIndexChange)`       | Callback when `pageIndex` changes                                                                                                                                                        | `EventEmitter<number>`                                                 | -                  |
| `(nzPageSizeChange)`        | Callback when `pageSize` changes                                                                                                                                                         | `EventEmitter<number>`                                                 | -                  |
| `(nzCurrentPageDataChange)` | Callback when current pageData changes                                                                                                                                                   | `EventEmitter<T[]>`                                                    | -                  |
| `(nzCustomColumnChange)`    | Callback when the table is reordered                                                                                                                                                     | `EventEmitter<NzCustomColumn[]>`                                       | -                  |
| `(nzQueryParams)`           | Callback with params when working with server side pagination, sorting and filtering                                                                                                     | `EventEmitter<NzTableQueryParams>`                                     | -                  |

### th

Checkbox property

| Property            | Description                                         | Type                    | Default |
| ------------------- | --------------------------------------------------- | ----------------------- | ------- |
| `[nzShowCheckbox]`  | Whether `nz-checkbox` should be shown in the header | `boolean`               | -       |
| `[nzDisabled]`      | Whether the `nz-checkbox` is disabled               | `boolean`               | -       |
| `[nzIndeterminate]` | `nz-checkbox` indeterminate status                  | `boolean`               | -       |
| `[nzLabel]`         | ARIA label for the `nz-checkbox`                    | `string`                | -       |
| `[nzChecked]`       | Checked status, double binding                      | `boolean`               | -       |
| `(nzCheckedChange)` | Callback when checked status changes                | `EventEmitter<boolean>` | -       |

Selection property

| Property               | Description                                                         | Type                                     | Default |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------- | ------- |
| `[nzShowRowSelection]` | Whether to show row selection options                               | `boolean`                                | -       |
| `[nzSelections]`       | Selection options including `text` and `onSelect` callback function | `Array<{ text: string, onSelect: any }>` | -       |

Sort property

| Property              | Description                                                                                                                                      | Type                                          | Default                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ----------------------------- |
| `[nzShowSort]`        | Whether to display sorting                                                                                                                       | `boolean`                                     | -                             |
| `[nzSortFn]`          | Sort function used to sort the data on client side (ref to `Array.sort` compareFunction). Should be set to `true` when using server side sorting | `NzTableSortFn<T> \| boolean`                 | -                             |
| `[nzSortOrder]`       | Sort direction                                                                                                                                   | `'descend' \| 'ascend' \| null`               | -                             |
| `[nzSortDirections]`  | Supported sort order, could be `'descend'`, `'ascend'`, `null`                                                                                   | `Array<'descend' \| 'ascend' \| null>`        | `['ascend', 'descend', null]` |
| `(nzSortOrderChange)` | Callback when sort direction changes                                                                                                             | `EventEmitter<'descend' \| 'ascend' \| null>` | -                             |

Filter property

| Property             | Description                                                                                            | Type                                                       | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------- |
| `[nzShowFilter]`     | Whether to show filter                                                                                 | `boolean`                                                  | -       |
| `[nzFilterFn]`       | Filter function used to filter the data on client side. Set to `true` when using server side filtering | `NzTableFilterFn<T> \| boolean`                            | -       |
| `[nzFilters]`        | Filter options, `text`, and `value` for callback, `byDefault` to enable filter by default              | `Array<{ text: string; value: any; byDefault?: boolean }>` | -       |
| `[nzFilterMultiple]` | Whether multiple mode filtering is enabled                                                             | `boolean`                                                  | `true`  |
| `(nzFilterChange)`   | Callback when filter `value` changes                                                                   | `EventEmitter<any[] \| any>`                               | -       |

Style property

| Property          | Description                                                                                                  | Type                            | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------- | ------- |
| `[nzWidth]`       | Specify the column width (in pixels), can not used when grouping columns                                     | `string`                        | -       |
| `[nzLeft]`        | Left pixels, used to fixed column to left, auto calc when set to `true` and disable fixed when `false`       | `string \| boolean`             | -       |
| `[nzRight]`       | Right pixels, used to fixed column to right, auto calc when set to `true` and disable fixed when `false`     | `string \| boolean`             | -       |
| `[nzAlign]`       | Specify how content is aligned                                                                               | `'left' \| 'right' \| 'center'` | -       |
| `[nzCellControl]` | Set the position of the column, which is the value of the `value` field in the `NzCustomColumn` type         | `string`                        | -       |
| `[nzBreakWord]`   | Whether insert line breaks within words                                                                      | `boolean`                       | `false` |
| `[nzEllipsis]`    | ellipsis cell content, not working with sorter and filters for now. Only work when nzTableLayout was `fixed` | `boolean`                       | `false` |

Other

| Property        | Description                                  | Type     | Default |
| --------------- | -------------------------------------------- | -------- | ------- |
| `[nzColumnKey]` | column key, work with server sort and filter | `string` | -       |

### td

Checkbox property

| Property            | Description                       | Type                    | Default |
| ------------------- | --------------------------------- | ----------------------- | ------- |
| `[nzShowCheckbox]`  | Whether add nz-checkbox           | `boolean`               | -       |
| `[nzDisabled]`      | Whether disable checkbox          | `boolean`               | -       |
| `[nzIndeterminate]` | Indeterminate status              | `boolean`               | -       |
| `[nzLabel]`         | ARIA label for the `nz-checkbox`  | `string`                | -       |
| `[nzChecked]`       | Checked status, double binding    | `boolean`               | -       |
| `(nzCheckedChange)` | Checked status change callback    | `EventEmitter<boolean>` | -       |
| `[colSpan]`         | how many columns the cell extends | `number`                | `null`  |
| `[rowSpan]`         | how many rows the cell extends    | `number`                | `null`  |

Expand property

| Property           | Description                           | Type                    | Default |
| ------------------ | ------------------------------------- | ----------------------- | ------- |
| `[nzShowExpand]`   | Whether show expand icon              | `boolean`               | -       |
| `[nzExpand]`       | Current expand status, double binding | `boolean`               | -       |
| `[nzExpandIcon]`   | Custom expand icon                    | `TemplateRef<void>`     | -       |
| `(nzExpandChange)` | Expand status change callback         | `EventEmitter<boolean>` | -       |

Style property

| Property          | Description                                                                                                  | Type                            | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------- | ------- |
| `[nzLeft]`        | Left pixels, used to fixed column to left, auto calc when set to `true` and disable fixed when `false`       | `string \| boolean`             | -       |
| `[nzRight]`       | Right pixels, used to fixed column to right, auto calc when set to `true` and disable fixed when `false`     | `string \| boolean`             | -       |
| `[nzAlign]`       | Specify how content is aligned                                                                               | `'left' \| 'right' \| 'center'` | -       |
| `[nzCellControl]` | Set the position of the column, which is the value of the `value` field in the `NzCustomColumn` type         | `string`                        | -       |
| `[nzBreakWord]`   | Whether insert line breaks within words                                                                      | `boolean`                       | `false` |
| `[nzEllipsis]`    | ellipsis cell content, not working with sorter and filters for now. Only work when nzTableLayout was `fixed` | `boolean`                       | `false` |

Other property

| Property         | Description                        | Type     | Default |
| ---------------- | ---------------------------------- | -------- | ------- |
| `[nzIndentSize]` | Indent size in pixels of tree data | `number` | -       |

### thead

| Property              | Description                                                  | Type                                                                  | Default |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- | ------- |
| `(nzSortOrderChange)` | sort change callback，should used with `nzColumnKey` of `th` | `EventEmitter<{ key: string, value: 'descend' \| 'ascend' \| null }>` | -       |

### tr

| Property     | Description                                              | Type      | Default |
| ------------ | -------------------------------------------------------- | --------- | ------- |
| `[nzExpand]` | Whether expand current row，used with `nzExpand` of `td` | `boolean` | -       |

### tfoot

| Property      | Description                         | Type                           | Default |
| ------------- | ----------------------------------- | ------------------------------ | ------- |
| `[nzSummary]` | Summary content                     | `boolean`                      | -       |
| `[nzFixed]`   | Fixed summary, used with `nzScroll` | `boolean \| 'top' \| 'bottom'` | `false` |

### nz-filter-trigger

Customized filter panel

| Property            | Description                                                                                       | Type                      | Default |
| ------------------- | ------------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| `[nzDropdownMenu]`  | Dropdown menu                                                                                     | `NzDropdownMenuComponent` | -       |
| `[nzVisible]`       | whether the dropdown menu is visible, double binding                                              | `boolean`                 | -       |
| `[nzActive]`        | whether the icon status is activated                                                              | `boolean`                 | `false` |
| `[nzHasBackdrop]`   | Whether or not attach a backdrop.                                                                 | `boolean`                 | `false` |
| `(nzVisibleChange)` | a callback function takes an argument: `nzVisible`, is executed when the visible state is changed | `EventEmitter<boolean>`   | -       |

### [nz-virtual-scroll]

virtual scroll directive work with `ng-template`, type: `TemplateRef<{ $implicit: T, index: number }>`.

## Note

In order to get better performance, all NG-ZORRO's components are running under [OnPush](https://angular.dev/guide/components/advanced-configuration#changedetectionstrategy) mode, this means any mutate to the `@Input()` data won't trigger change detection, please use immutable way to update array or object.

```typescript
// add data
this.dataSet = [
  ...this.dataSet,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`
  }
];
// remove data
this.dataSet = this.dataSet.filter(d => d.key !== i);
```

Recommend using [immer](https://immerjs.github.io/immer/docs/introduction) for a better development experience.
