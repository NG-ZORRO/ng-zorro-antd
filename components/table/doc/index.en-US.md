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

## How To Use

The Table component is both easy to use and highly customizable.

### Highly Customizable

You can use `nz-table` like  [` W3C Standard <table>`](https://www.w3.org/TR/html401/struct/tables.html) , developers can control every part of the table as you wish.

### Component Enhancements

The component in `nz-table` such as `th`, `td`, `thead`, etc are enhanced, developers can make the table sortable, filterable, fixed header, server rendering, etc easily with api provided.

### Data Processing

The data passed to `[nzData]` will be export with [Template Context](https://angular.io/guide/template-syntax#statement-context) after processing, developers can use `*ngFor` to render current page data in table.

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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzData]` | Data record array to be displayed | `any[]` | - |
| `[nzFrontPagination]` | Whether paginate data in front side，should set to `false` if you want to paginate data in server side or display all data in table | boolean | true |
| `[nzTotal]` | Total data count, should set when `nzServerRender` is true | number | - |
| `[nzPageIndex]` | pageIndex , double binding | number | - |
| `[nzPageSize]` | pageSize, double binding | number | - |
| `[nzShowPagination]` | Whether show pagination component in bottom of the table | boolean | true |
| `[nzBordered]` | Whether to show all table borders | boolean | `false` |
| `[nzWidthConfig]` | Set col width can not used with `nzWidth` of `th` | string[] | - |
| `[nzSize]` | Size of table | `default` ｜ `middle` ｜ `small` | `default` |
| `[nzLoading]` | Loading status of table | boolean | `false` |
| `[nzLoadingDelay]` | Specifies a delay in milliseconds for loading state (prevent flush) | number | 0 |
| `[nzScroll]` | Whether table can be scrolled in x/y direction, `x` or `y` can be a string that indicates the width and height of table body | object | - |
| `[nzTitle]` | Table title renderer | string丨`TemplateRef<void>` | - |
| `[nzFooter]` | Table footer renderer | string丨`TemplateRef<void>` | - |
| `[nzNoResult]` | Custom no result content | string丨`TemplateRef<void>` |  |
| `[nzPageSizeOptions]` | Specify the sizeChanger options | `number[]` | `[10, 20, 30, 40]` |
| `[nzShowQuickJumper]` | Determine whether you can jump to pages directly | boolean | false |
| `[nzShowSizeChanger]` | Determine whether `nzPageSize` can be changed | boolean | false |
| `[nzShowTotal]` | To display the total number and range, same as Pagination	 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - |
| `[nzHideOnSinglePage]` | Whether to hide pager on single page | boolean | false |
| `[nzSimple]` | whether to use simple mode | boolean | - |
| `(nzPageIndexChange)` | pageIndex change callback | `EventEmitter<number>` | - |
| `(nzPageSizeChange)` | pageSize change callback | `EventEmitter<number>` | - |
| `(nzCurrentPageDataChange)` | current pageData change callback | `EventEmitter<any[]>` | - |

### th

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowCheckbox]` | Whether add nz-checkbox | boolean | - |
| `[nzDisabled]` | Whether disable checkbox | boolean | - |
| `[nzIndeterminate]` | Indeterminate status | boolean | - |
| `[nzChecked]` | Checked status, double binding | boolean | - |
| `(nzCheckedChange)` | Checked status change callback | `EventEmitter<boolean>` | - |

Selection property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowRowSelection]` | Whether show selections | boolean | - |
| `[nzSelections]` | Selection options include `text` and `onSelect` function | `Array<{ text: string, onSelect: any }>` | - |


Filter property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowFilter]` | Whether show filter | boolean | - |
| `[nzFilters]` | Filter options,  `text`, and `value` for callback, `byDefault` to enable filter by default | `Array<{ text: string; value: any; byDefault?: boolean }>` | - |
| `[nzFilterMultiple]` | Whether filter multiple mode | boolean | true |
| `(nzFilterChange)` | Filter change callback `value` | `EventEmitter<any[] 丨 any>` | - |


Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzWidth]` | Specify the column width, can not used when grouping columns | string | - |
| `[nzLeft]` | Left pixels, used to fixed column to left | string | - |
| `[nzRight]` | Right pixels, used to fixed column to right | string | - |

Other property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzExpand]` | Whether current column include expand icon | boolean | - |

### td

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowCheckbox]` | Whether add nz-checkbox | boolean | - |
| `[nzDisabled]` | Whether disable checkbox | boolean | - |
| `[nzIndeterminate]` | Indeterminate status | boolean | - |
| `[nzChecked]` | Checked status, double binding | boolean | - |
| `(nzCheckedChange)` | Checked status change callback | `EventEmitter<boolean>` | - |

Expand property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowExpand]` | Whether show expand icon | boolean | - |
| `[nzExpand]` | Current expand status, double binding | boolean | - |
| `(nzExpandChange)` | Expand status change callback | `EventEmitter<boolean>` | - |

Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzLeft]` | Left pixels, used to fixed column to left | string | - |
| `[nzRight]` | Right pixels, used to fixed column to right | string | - |

Other property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzIndentSize]` | Indent size in pixels of tree data | number | - |

### thead

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSingleSort]` | Whether single column sort mode | boolean | false |
| `(nzSortChange)` | sort change callback，should used with `nzSortKey` of `th` | `EventEmitter<{ nzSortKey: string, value: 'descend'丨'ascend'丨null }>` | - |

### nz-tr

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzExpand]` | Whether expand current row，used with `nzExpand` of `td`  | boolean | - |



## Note

According to [Angular documentation](https://angular.io/guide/lifecycle-hooks#onchanges)，developers should not use `push` or `splice` to change the data passed to `nzData`


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