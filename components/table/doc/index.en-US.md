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

The component in `nz-table` such as `nz-th`, `nz-td`, `nz-thead`, etc are enhanced, developers can make the table sortable, filterable, fixed header, server rendering, etc easily with api provided.

### Data Processing

The data passed to `[nzData]` will be export with [Template Context](https://angular.io/guide/template-syntax#statement-context) after processing, developers can use `*ngFor` to render current page data in table.

```html
<nz-table #basicTable [nzData]="dataSet">
  <thead nz-thead>
    <tr nz-tr>
      <th nz-th>Name</th>
      <th nz-th>Age</th>
      <th nz-th>Address</th>
      <th nz-th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr nz-tr *ngFor="let data of basicTable.data">
      <td nz-td>{{data.name}}</td>
      <td nz-td>{{data.age}}</td>
      <td nz-td>{{data.address}}</td>
      <td nz-td>
        <a>Action 一 {{data.name}}</a>
        <nz-divider nzType="vertical"></nz-divider>
        <a>Delete</a>
      </td>
    </tr>
  </tbody>
</nz-table>
```

## API

### Table

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzData | Data record array to be displayed | `any[]` | - |
| nzServerRender | Whether server paging data | boolean | - |
| nzTotal | Total data count, should set when `nzServerRender` is true | number | - |
| nzPageIndex | pageIndex , double binding | number | - |
| nzPageIndexChange | pageIndex change callback | (nzPageIndex:number)=>{} | - |
| nzPageSize | pageSize, double binding | number | - |
| nzPageSizeChange | pageSize change callback | (nzPageSize:number)=>{} | - |
| nzCurrentPageDataChange | current pageData change callback | (data:any[])=>{} | - |
| nzIsPagination | Whether paging data | boolean | true |
| nzBordered | Whether to show all table borders | boolean | `false` |
| nzWidthConfig | Set col width can not used with `nzWidth` of `nz-th` | string[] | - |
| nzSize | Size of table | `default` ｜ `middle` ｜ `small` | `default` |
| nzLoading | Loading status of table | boolean | `false` |
| nzLoadingDelay | Specifies a delay in milliseconds for loading state (prevent flush) | number | 0 |
| nzScroll | Whether table can be scrolled in x/y direction, `x` or `y` can be a string that indicates the width and height of table body | object | - |
| nzTitle | Table title renderer | string丨`TemplateRef<void>` | - |
| nzFooter | Table footer renderer | string丨`TemplateRef<void>` | - |
| nzNoResult | Custom no result content | string丨`TemplateRef<void>` |  |
| nzPageSizeOptions | Specify the sizeChanger options | `number[]` | `[10, 20, 30, 40]` |
| nzShowQuickJumper | Determine whether you can jump to pages directly | boolean | false |
| nzShowSizeChanger | Determine whether `nzPageSize` can be changed | boolean | false |
| nzShowTotal | To display the total number and range	 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - |

### nz-th

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzShowCheckbox | Whether add nz-checkbox | boolean | - |
| nzDisabled | Whether disable checkbox | boolean | - |
| nzIndeterminate | Indeterminate status | boolean | - |
| nzChecked | Checked status, double binding | boolean | - |
| nzCheckedChange | Checked status change callback | (nzChecked:boolean)=>{} | - |

Selection property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzShowRowSelection | Whether show selections | boolean | - |
| nzSelections | Selection options include `text` and `onSelect` function | `Array<{ text: string, onSelect: any }>` | - |


Filter property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzShowFilter | Whether show filter | boolean | - |
| nzFilters | Filter options,  `text`，and `value` for callback | `Array<{ text: string; value: any }>` | - |
| nzFilterChange | Filter change callback `value` | (value:any[] 丨 any)=>{} | - |
| nzFilterMultiple | Whether filter multiple mode | boolean | true |

Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzWidth | Specify the column width, can not used when grouping columns | string | - |
| nzLeft | Left pixels, used to fixed column to left | string | - |
| nzRight | Right pixels, used to fixed column to right | string | - |

Other property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzExpand | Whether current column include expand icon | boolean | - |

### nz-td

Checkbox property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzShowCheckbox | Whether add nz-checkbox | boolean | - |
| nzDisabled | Whether disable checkbox | boolean | - |
| nzIndeterminate | Indeterminate status | boolean | - |
| nzChecked | Checked status, double binding | boolean | - |
| nzCheckedChange | Checked status change callback | (nzChecked:boolean)=>{} | - |

Expand property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzShowExpand | Whether show expand icon | boolean | - |
| nzExpand | Current expand status, double binding | boolean | - |
| nzExpandChange | Expand status change callback | (nzExpand:boolean)=>{} | - |

Style property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzLeft | Left pixels, used to fixed column to left | string | - |
| nzRight | Right pixels, used to fixed column to right | string | - |

Other property

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzIndentSize | Indent size in pixels of tree data | number | - |

### nz-thead

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzSortChange | sort change callback，should used with `nzSortKey` of `nz-th` | `(sortChange:{ nzSortKey: string, value: 'descend'丨'ascend'丨null })=>{}` | - |
| nzSingleSort | Whether single column sort mode | boolean | false |

### nz-tr

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzExpand | Whether expand current row，used with `nzExpand` of `nz-td`  | boolean | - |

