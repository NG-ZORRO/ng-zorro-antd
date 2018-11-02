---
category: Components
cols: 1
type: Data Display
title: Table
subtitle: 表格
---

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

Table 组件同时具备了易用性和高度可定制性

### 高度定制

在 `nz-table` 组件中完整的暴露了 [`W3C标准 <table>`](https://www.w3.org/TR/html401/struct/tables.html) 的所有组成部分，你可以像使用 `table` 元素一样使用 `nz-table` ，根据依据业务需求，使用者可以自由的控制任何一个部分的样式、内容、逻辑和事件绑定。

### 组件增强

在 `nz-table`, `thead`, `th`, `td` 等多个暴露的元素上，组件提供了增强语法，经过配置之后可以很方便的实现多选、过滤、排序、固定列、固定表头、服务端分页等功能。

### 数据处理

传入`[nzData]`中的数据，经过处理之后，可以通过 [模板变量](https://angular.io/guide/template-syntax#statement-context) 获取当前展示表格部分的数据，再使用 `*ngFor` 依据需求将数据渲染。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzData]` | 数据数组 | `any[]` | - |
| `[nzFrontPagination]` | 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false | boolean | true |
| `[nzTotal]` | 当前总数据，在服务器渲染时需要传入 | number | - |
| `[nzPageIndex]` | 当前页码，可双向绑定 | number | - |
| `[nzPageSize]` | 每页展示多少数据，可双向绑定 | number | - |
| `[nzShowPagination]` | 是否显示分页器 | boolean | true |
| `[nzBordered]` | 是否展示外边框和列边框 | boolean | false |
| `[nzWidthConfig]` | 表头分组时指定每列宽度，与 `th` 的 `nzWidth` 不可混用 | string[] | - |
| `[nzSize]` | 正常或迷你类型，`default` or `small` or `middle` | string | `default` |
| `[nzLoading]` | 页面是否加载中 | boolean | false |
| `[nzLoadingDelay]` | 延迟显示加载效果的时间（防止闪烁） | number | 0 |
| `[nzScroll]` | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：`{ x: "300px", y: "300px" }` | object | - |
| `[nzTitle]` | 表格标题 | string丨`TemplateRef<void>` | - |
| `[nzFooter]` | 表格尾部 | string丨`TemplateRef<void>` | - |
| `[nzNoResult]` | 无数据时显示内容 | string丨`TemplateRef<void>` | - |
| `[nzPageSizeOptions]` | 页数选择器可选值 | number[] | [ 10, 20, 30, 40, 50 ] |
| `[nzShowQuickJumper]` | 是否可以快速跳转至某页 | boolean | false |
| `[nzShowSizeChanger]` | 是否可以改变 `nzPageSize` | boolean | false |
| `[nzShowTotal]` | 用于显示数据总量和当前数据范围，与 Pagination 用法相同 | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - |
| `[nzHideOnSinglePage]` | 只有一页时是否隐藏分页器 | boolean | false |
| `[nzSimple]` | 当添加该属性时，显示为简单分页 | boolean | - |
| `(nzPageIndexChange)` | 当前页码改版时的回调函数 | `EventEmitter<number>` | - |
| `(nzPageSizeChange)` | 页数改变时的回调函数 | `EventEmitter<number>` | - |
| `(nzCurrentPageDataChange)` | 当前页面展示数据改变的回调函数 | `EventEmitter<any[]>` | - |

### th

勾选属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowCheckbox]` | 是否添加checkbox | boolean | - |
| `[nzDisabled]` | checkbox 是否禁用 | boolean | - |
| `[nzIndeterminate]` | checkbox indeterminate 状态 | boolean | - |
| `[nzChecked]` | checkbox 是否被选中，可双向绑定 | boolean | - |
| `(nzCheckedChange)` | 选中的回调 | `EventEmitter<boolean>` | - |

下拉选择属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowRowSelection]` | 是否显示下拉选择 | boolean | - |
| `[nzSelections]` | 下拉选择的内容 `text` 及回调函数 `onSelect` | `Array<{ text: string, onSelect: any }>` | - |

排序属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowSort]` | 是否显示排序 | boolean | - |
| `[nzSortKey]` | 排序key，非受控模式使用，与 `thead` 中 `nzSortChange` 配合使用 | string | - |
| `[nzSort]` | 当前排序状态，受控模式使用，可双向绑定 | 'descend'丨'ascend'丨null | null |
| `(nzSortChange)` | 排序状态改变回调，受控模式使用 | `EventEmitter<'descend'丨'ascend'丨null>` | - |

过滤属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowFilter]` | 是否显示过滤 | boolean | - |
| `[nzFilters]` | 过滤器内容, 显示数据 `text`，回调函数传出 `value`，设置 `byDefault` 以默认应用过滤规则 | `Array<{ text: string; value: any; byDefault?: boolean }>` | - |
| `[nzFilterMultiple]` | 是否为多选过滤器 | boolean | true |
| `(nzFilterChange)` | 过滤器内容选择的 value 数据回调 | `EventEmitter<any[]丨 any>` | - |

样式属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzWidth]` | 指定该列宽度，表头未分组时可用 | string | - |
| `[nzLeft]` | 左侧距离，用于固定左侧列 | string | - |
| `[nzRight]` | 右侧距离，用于固定右侧列 | string | - |

其他

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzExpand]` | 当前列是否包含展开按钮 | boolean | - |

### td

勾选属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowCheckbox]` | 是否添加checkbox | boolean | - |
| `[nzDisabled]` | checkbox 是否禁用 | boolean | - |
| `[nzIndeterminate]` | checkbox indeterminate 状态 | boolean | - |
| `[nzChecked]` | checkbox 是否被选中，可双向绑定 | boolean | - |
| `(nzCheckedChange)` | 选中的回调 | `EventEmitter<boolean>` | - |

展开属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowExpand]` | 是否显示展开按钮 | boolean | - |
| `[nzExpand]` | 当前展开按钮状态，可双向绑定 | boolean | - |
| `(nzExpandChange)` | 当前展开按钮状态改变回调函数 | `EventEmitter<boolean>` | - |

样式属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzLeft]` | 左侧距离，用于固定左侧列 | string | - |
| `[nzRight]` | 右侧距离，用于固定右侧列 | string | - |


其他

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzIndentSize]` | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | - |


### thead

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzSingleSort]` | 是否单列排序模式，非受控排序下使用 | boolean | false |
| `(nzSortChange)` | 排序改变时的回调函数，需要与 `th` 上的 `nzSortKey` 同时使用，非受控排序下使用 | `EventEmitter<{ nzSortKey: string, value: 'descend'丨'ascend'丨null }>` | - |


### nz-tr

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzExpand]` | 当前列是否展开，与 `td` 上的 `nzExpand` 属性配合使用 | boolean | - |


## 注意

按照 [Angular 的设计](https://angular.io/guide/lifecycle-hooks#onchanges)，当需要对 `nzData` 中的数据进行增删时需要使用以下操作，使用 `push` 或者 `splice` 修改 `nzData` 的数据不会生效


```typescript
    // 增加数据
    this.dataSet = [ ...this.dataSet, {
      key    : `${this.i}`,
      name   : `Edward King ${this.i}`,
      age    : '32',
      address: `London, Park Lane no. ${this.i}`
    }];
    // 删除数据
    this.dataSet = this.dataSet.filter(d => d.key !== i);
```
