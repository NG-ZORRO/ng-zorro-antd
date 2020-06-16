---
category: Components
cols: 1
type: Data Display
title: Table
---

A table displays rows of data.

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

```ts
import { NzTableModule } from 'ng-zorro-antd/table';
```

## How To Use

The Table component is both easy to use and highly customizable.

### Highly Customizable

You can use `nz-table` like  [` W3C Standard <table>`](https://www.w3.org/TR/html401/struct/tables.html) , developers can control every part of the table as you wish.

### Component Enhancements

The component in `nz-table` such as `th`, `td`, `thead`, etc are enhanced, developers can make the table sortable, filterable, fixed header, server rendering, etc easily with api provided.

### Data Processing

The data passed to `[nzData]` will be export with [Template Context](https://angular.io/guide/template-syntax#statement-context) after processing(including paging, sort and filter), developers can use `*ngFor` to render current page data in table.

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

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzData]` | Data record array to be displayed | `any[]` | - |
| `[nzFrontPagination]` | Whether paginate data in front side，should set to `false` if you want to paginate data in server side or display all data in table | `boolean` | `true` |
| `[nzTotal]` | Total data count, should set when `nzServerRender` is true | `number` | - |
| `[nzPageIndex]` | pageIndex , double binding | `number` | - |
| `[nzPageSize]` | pageSize, double binding | `number` | - |
| `[nzShowPagination]` | Whether show pagination component in bottom of the table | `boolean` | `true` |
| `[nzPaginationPosition]` | Specify the position of Pagination | `'top' \| 'bottom' \| 'both'` | `bottom` |
| `[nzBordered]` | Whether to show all table borders | `boolean` | `false` | ✅ |
| `[nzWidthConfig]` | Set col width can not used with `[nzWidth]` of `th` | `string[]` | `[]` |
| `[nzSize]` | Size of table | `'middle' \| 'small' \| 'default'` | `'default'` | ✅ |
| `[nzLoading]` | Loading status of table | `boolean` | `false` |
| `[nzLoadingIndicator]` | the spinning indicator | `TemplateRef<void>` | - | ✅ |
| `[nzLoadingDelay]` | Specifies a delay in milliseconds for loading state (prevent flush) | `number` | `0` |
| `[nzScroll]` | Whether table can be scrolled in x/y direction, `x` or `y` can be a string that indicates the width and height of table body | `object` | - |
| `[nzTitle]` | Table title renderer | `string \| TemplateRef<void>` | - |
| `[nzFooter]` | Table footer renderer | `string \| TemplateRef<void>` | - |
| `[nzNoResult]` | Custom no result content | `string \| TemplateRef<void>` | - |
| `[nzPageSizeOptions]` | Specify the sizeChanger options | `number[]` | `[10, 20, 30, 40]` |
| `[nzShowQuickJumper]` | Determine whether you can jump to pages directly | `boolean` | `false` | ✅ |
| `[nzShowSizeChanger]` | Determine whether `nzPageSize` can be changed | `boolean` | `false` | ✅ |
| `[nzShowTotal]` | To display Pagination total number and range, same as Pagination	 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - |
| `[nzItemRender]` | to customize Pagination item, same as Pagination | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next', page: number }>` | - |
| `[nzHideOnSinglePage]` | Whether to hide pager on single page | `boolean` | `false` |
| `[nzSimple]` | whether to use simple mode | `boolean` | - | ✅ |
| `[nzTemplateMode]` | template mode，no need to pass data to `nzData` | `boolean` | `false` |
| `[nzVirtualItemSize]` | The size of the items in the list, same as [cdk itemSize](https://material.angular.io/cdk/scrolling/api) | `number` | `0` |
| `[nzVirtualMaxBufferPx]` | The number of pixels worth of buffer to render for when rendering new items, same as [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `200` |
| `[nzVirtualMinBufferPx]` | The minimum amount of buffer rendered beyond the viewport (in pixels),same as [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `100` |
| `[nzVirtualForTrackBy]` | The TrackByFunction to use for tracking changes. | `TrackByFunction<T>` | - |
| `(nzPageIndexChange)` | pageIndex change callback | `EventEmitter<number>` | - |
| `(nzPageSizeChange)` | pageSize change callback | `EventEmitter<number>` | - |
| `(nzCurrentPageDataChange)` | current pageData change callback | `EventEmitter<any[]>` | - |
| `(nzQueryParams)` | Get params when work with server pagination, sort and filter | `EventEmitter<NzTableQueryParams>` | - |

### th

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowCheckbox]` | Whether add nz-checkbox | `boolean` | - |
| `[nzDisabled]` | Whether disable checkbox | `boolean` | - |
| `[nzIndeterminate]` | Indeterminate status | `boolean` | - |
| `[nzChecked]` | Checked status, double binding | `boolean` | - |
| `(nzCheckedChange)` | Checked status change callback | `EventEmitter<boolean>` | - |

Selection property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowRowSelection]` | Whether show selections | `boolean` | - |
| `[nzSelections]` | Selection options include `text` and `onSelect` function | `Array<{ text: string, onSelect: any }>` | - |

Sort property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSortFn]` | Sort function, use to sort the data in the browser side(ref to Array.sort compareFunction), set to true when using server sort  | `((a: any, b: any, sortOrder?: string) => number) | boolean` | - |
| `[nzSortOrder]` | Sort direction | `'ascend' | 'descend' | null` | - |
| `[nzSortDirections]` | supported sort way, could be `'ascend'`, `'descend'`, `null` | `Array<'ascend' \| 'descend' \| null>` | `['ascend', 'descend', null]` |
| `(nzSortOrderChange)` | Sort direction change callback | `EventEmitter<'ascend' \| 'descend' \| null>` | - |


Filter property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowFilter]` | Whether show filter | `boolean` | - |
| `[nzFilterFn]` | 	Filter function, use to filter the data in the browser side. Set to true when using server filter | `((value: any, data: any) => boolean;) | boolean` | - |
| `[nzFilters]` | Filter options,  `text`, and `value` for callback, `byDefault` to enable filter by default | `Array<{ text: string; value: any; byDefault?: boolean }>` | - |
| `[nzFilterMultiple]` | Whether filter multiple mode | `boolean` | `true` |
| `(nzFilterChange)` | Filter change callback `value` | `EventEmitter<any[] \| any>` | - |



Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzWidth]` | Specify the column width, can not used when grouping columns | `string` | - |
| `[nzLeft]` | Left pixels, used to fixed column to left, auto calc when set to `true` and disable fixed when `false` | `string \| boolean` | - |
| `[nzRight]` | Right pixels, used to fixed column to right, auto calc when set to `true` and disable fixed when `false` | `string \| boolean` | - |
| `[nzAlign]` | Specify how content is aligned | `'left' \| 'right' \| 'center'` | - |
| `[nzBreakWord]` | Whether insert line breaks within words | `boolean` | `false` |
| `[nzEllipsis]` | ellipsis cell content, not working with sorter and filters for now. Only work when nzTableLayout was `fixed` | `boolean` | `false` |


Other

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzColumnKey]` | column key, work with server sort and filter | `string` | - |


### td

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowCheckbox]` | Whether add nz-checkbox | `boolean` | - |
| `[nzDisabled]` | Whether disable checkbox | `boolean` | - |
| `[nzIndeterminate]` | Indeterminate status | `boolean` | - |
| `[nzChecked]` | Checked status, double binding | `boolean` | - |
| `(nzCheckedChange)` | Checked status change callback | `EventEmitter<boolean>` | - |
| `[colspan]` | how many columns the cell extends | `number` | `null` |
| `[rowspan]` | how many rows the cell extends | `number` | `null` |

Expand property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowExpand]` | Whether show expand icon | `boolean` | - |
| `[nzExpand]` | Current expand status, double binding | `boolean` | - |
| `(nzExpandChange)` | Expand status change callback | `EventEmitter<boolean>` | - |

Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzLeft]` | Left pixels, used to fixed column to left, auto calc when set to `true` and disable fixed when `false` | `string \| boolean` | - |
| `[nzRight]` | Right pixels, used to fixed column to right, auto calc when set to `true` and disable fixed when `false` | `string \| boolean` | - |
| `[nzAlign]` | Specify how content is aligned | `'left' \| 'right' \| 'center'` | - |
| `[nzBreakWord]` | Whether insert line breaks within words | `boolean` | `false` |
| `[nzEllipsis]` | ellipsis cell content, not working with sorter and filters for now. Only work when nzTableLayout was `fixed` | `boolean` | `false` |

Other property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzIndentSize]` | Indent size in pixels of tree data | `number` | - |

### tr

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzExpand]` | Whether expand current row，used with `nzExpand` of `td`  | `boolean` | - |

### nz-filter-trigger

Customized filter panel

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDropdownMenu]` | Dropdown menu | `NzDropdownMenuComponent` | - |
| `[nzVisible]` | whether the dropdown menu is visible, double binding | `boolean` | - |
| `[nzActive]` | whether the icon status is activated | `boolean` | `false` |
| `(nzVisibleChange)` | a callback function takes an argument: `nzVisible`, is executed when the visible state is changed | `EventEmitter<boolean>` | - |


### [nz-virtual-scroll]

virtual scroll directive work with `ng-template`, type: `TemplateRef<{ $implicit: any, index: number }>`.


## Note

In order to get better performance, all NG-ZORRO's components are running under [OnPush](https://angular.io/api/core/ChangeDetectionStrategy) mode, this means any mutate to the `@Input()` data won't trigger change detection, please use immutable way to update array or object.

```typescript
    // add data
    this.dataSet = [ ...this.dataSet, {
      key    : `${this.i}`,
      name   : `Edward King ${this.i}`,
      age    : '32',
      address: `London, Park Lane no. ${this.i}`
    }];
    // remove data
    this.dataSet = this.dataSet.filter(d => d.key !== i);
```

Recommend using [immer](https://immerjs.github.io/immer/docs/introduction) for a better development experience
