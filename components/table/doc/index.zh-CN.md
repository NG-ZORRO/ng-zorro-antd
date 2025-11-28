---
category: Components
cols: 1
type: 数据展示
title: Table
subtitle: 表格
cover: 'https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg'
description: 展示行列数据。
---

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

将数据传入`[nzData]`，经过组件处理之后（包括分页、排序、筛选等），通过 [模板变量](https://angular.cn/guide/templates/template-statements#statement-context) 获取当前展示表格部分的数据，使用 `*ngFor` 依据需求将数据渲染。

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

| 参数                        | 说明                                                                                                                 | 类型                                                                   | 默认值                   | 全局配置 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------ | -------- |
| `[nzData]`                  | 数据数组                                                                                                             | `T[]`                                                                  | -                        |
| `[nzFrontPagination]`       | 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false                                 | `boolean`                                                              | `true`                   |
| `[nzTotal]`                 | 当前总数据，在服务器渲染时需要传入                                                                                   | `number`                                                               | -                        |
| `[nzCustomColumn]`          | 控制表格列的展示与排序，(开启后 `nzWidthConfig` 和 `th` 的 `[nzWidth]` 将不生效)                                     | `NzCustomColumn[]`                                                     | -                        |
| `[nzPageIndex]`             | 当前页码，可双向绑定                                                                                                 | `number`                                                               | -                        |
| `[nzPageSize]`              | 每页展示多少数据，可双向绑定                                                                                         | `number`                                                               | -                        |
| `[nzShowPagination]`        | 是否显示分页器                                                                                                       | `boolean`                                                              | `true`                   |
| `[nzPaginationPosition]`    | 指定分页显示的位置                                                                                                   | `'top' \| 'bottom' \| 'both'`                                          | `'bottom'`               |
| `[nzPaginationType]`        | 指定分页显示的尺寸                                                                                                   | `'default' \| 'small'`                                                 | `'default'`              |
| `[nzBordered]`              | 是否展示外边框和列边框                                                                                               | `boolean`                                                              | `false`                  | ✅       |
| `[nzOuterBordered]`         | 是否显示外边框                                                                                                       | `boolean`                                                              | `false`                  | -        |
| `[nzWidthConfig]`           | 表头分组时指定每列宽度，与 `th` 的 `[nzWidth]` 不可混用                                                              | `string[]`                                                             | `[]`                     |
| `[nzSize]`                  | 正常或迷你类型                                                                                                       | `'middle' \| 'small' \| 'default'`                                     | `'default'`              | ✅       |
| `[nzLoading]`               | 页面是否加载中                                                                                                       | `boolean`                                                              | `false`                  |
| `[nzLoadingIndicator]`      | 加载指示符                                                                                                           | `TemplateRef<void>`                                                    | -                        | ✅       |
| `[nzLoadingDelay]`          | 延迟显示加载效果的时间（防止闪烁）                                                                                   | `number`                                                               | `0`                      |
| `[nzScroll]`                | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：`{ x: "300px", y: "300px" }`                                       | `object`                                                               | -                        |
| `[nzTitle]`                 | 表格标题                                                                                                             | `string \| TemplateRef<void>`                                          | -                        |
| `[nzFooter]`                | 表格尾部                                                                                                             | `string \| TemplateRef<void>`                                          | -                        |
| `[nzNoResult]`              | 无数据时显示内容                                                                                                     | `string \| TemplateRef<void>`                                          | -                        |
| `[nzPageSizeOptions]`       | 页数选择器可选值                                                                                                     | `number[]`                                                             | `[ 10, 20, 30, 40, 50 ]` |
| `[nzShowQuickJumper]`       | 是否可以快速跳转至某页                                                                                               | `boolean`                                                              | `false`                  | ✅       |
| `[nzShowSizeChanger]`       | 是否可以改变 `nzPageSize`                                                                                            | `boolean`                                                              | `false`                  | ✅       |
| `[nzShowTotal]`             | 用于显示数据总量和当前数据范围，用法参照 Pagination 组件                                                             | `TemplateRef<{ $implicit: number, range: [ number, number ] }>`        | -                        |
| `[nzItemRender]`            | 用于自定义页码的结构，用法参照 Pagination 组件                                                                       | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next', page: number }>` | -                        |
| `[nzHideOnSinglePage]`      | 只有一页时是否隐藏分页器                                                                                             | `boolean`                                                              | `false`                  | ✅       |
| `[nzSimple]`                | 当添加该属性时，显示为简单分页                                                                                       | `boolean`                                                              | -                        | ✅       |
| `[nzTemplateMode]`          | 模板模式，无需将数据传递给 `nzData`                                                                                  | `boolean`                                                              | `false`                  |
| `[nzVirtualItemSize]`       | 虚拟滚动时每一列的高度，与 [cdk itemSize](https://material.angular.io/cdk/scrolling/api) 相同                        | `number`                                                               | `0`                      |
| `[nzVirtualMaxBufferPx]`    | 缓冲区最大像素高度，与 [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) 相同                         | `number`                                                               | `200`                    |
| `[nzVirtualMinBufferPx]`    | 缓冲区最小像素高度，低于该值时将加载新结构，与 [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) 相同 | `number`                                                               | `100`                    |
| `[nzVirtualForTrackBy]`     | 虚拟滚动数据 `TrackByFunction` 函数                                                                                  | `TrackByFunction<T>`                                                   | -                        |
| `(nzPageIndexChange)`       | 当前页码改变时的回调函数                                                                                             | `EventEmitter<number>`                                                 | -                        |
| `(nzPageSizeChange)`        | 页数改变时的回调函数                                                                                                 | `EventEmitter<number>`                                                 | -                        |
| `(nzCurrentPageDataChange)` | 当前页面展示数据改变的回调函数                                                                                       | `EventEmitter<T[]>`                                                    | -                        |
| `(nzCustomColumnChange)`    | 当表格重新排序后的回调                                                                                               | `EventEmitter<NzCustomColumn[]>`                                       | -                        |
| `(nzQueryParams)`           | 当服务端分页、筛选、排序时，用于获得参数，具体见示例                                                                 | `EventEmitter<NzTableQueryParams>`                                     | -                        |

### th

勾选属性

| 参数                | 说明                            | 类型                    | 默认值 |
| ------------------- | ------------------------------- | ----------------------- | ------ |
| `[nzShowCheckbox]`  | 是否添加 checkbox               | `boolean`               | -      |
| `[nzDisabled]`      | checkbox 是否禁用               | `boolean`               | -      |
| `[nzIndeterminate]` | checkbox indeterminate 状态     | `boolean`               | -      |
| `[nzLabel]`         | checkbox 的可访问性标签         | `string`                | -      |
| `[nzChecked]`       | checkbox 是否被选中，可双向绑定 | `boolean`               | -      |
| `(nzCheckedChange)` | 选中的回调                      | `EventEmitter<boolean>` | -      |

下拉选择属性

| 参数                   | 说明                                        | 类型                                     | 默认值 |
| ---------------------- | ------------------------------------------- | ---------------------------------------- | ------ |
| `[nzShowRowSelection]` | 是否显示下拉选择                            | `boolean`                                | -      |
| `[nzSelections]`       | 下拉选择的内容 `text` 及回调函数 `onSelect` | `Array<{ text: string, onSelect: any }>` | -      |

排序属性

| 参数                  | 说明                                                                                      | 类型                                          | 默认值                        |
| --------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------- |
| `[nzShowSort]`        | 是否显示排序                                                                              | `boolean`                                     | -                             |
| `[nzSortFn]`          | 排序函数，前端排序使用一个函数(参考 Array.sort 的 compareFunction)，服务端排序时传入 true | `NzTableSortFn<T> \| boolean`                 | -                             |
| `[nzSortDirections]`  | 支持的排序方式，取值为 `'ascend'`, `'descend'`, `null`                                    | `Array<'ascend' \| 'descend' \| null>`        | `['ascend', 'descend', null]` |
| `[nzSortOrder]`       | 当前排序状态，可双向绑定                                                                  | `'ascend' \| 'descend' \| null`               | null                          |
| `(nzSortOrderChange)` | 排序状态改变回调                                                                          | `EventEmitter<'ascend' \| 'descend' \| null>` | -                             |

过滤属性

| 参数                    | 说明                                                                                   | 类型                                                       | 默认值    |
| ----------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| `[nzShowFilter]`        | 是否显示过滤                                                                           | `boolean`                                                  | -         |
| `[nzFilterFn]`          | 前端排序时，确定筛选的运行函数，服务端排序时，传入 true                                | `NzTableFilterFn<T> \| boolean`                            | -         |
| `[noDataVirtualHeight]` | 没有数据时内部滚动的高度，如果没有传递任何内容，则使用默认值。                         | `string`                                                   | `'182px'` |
| `[nzFilters]`           | 过滤器内容, 显示数据 `text`，回调函数传出 `value`，设置 `byDefault` 以默认应用过滤规则 | `Array<{ text: string; value: any; byDefault?: boolean }>` | -         |
| `[nzFilterMultiple]`    | 是否为多选过滤器                                                                       | `boolean`                                                  | `true`    |
| `(nzFilterChange)`      | 过滤器内容选择的 value 数据回调                                                        | `EventEmitter<any[] \| any>`                               | -         |

样式属性

| 参数              | 说明                                                                                           | 类型                            | 默认值  |
| ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| `[nzWidth]`       | 指定该列宽度，表头未分组时可用                                                                 | `string`                        | -       |
| `[nzLeft]`        | 左侧距离，用于固定左侧列，当为 `true` 时自动计算，为 `false` 时停止固定                        | `string \| boolean`             | `false` |
| `[nzRight]`       | 右侧距离，用于固定右侧列，当为 `true` 时自动计算，为 `false` 时停止固定                        | `string \| boolean`             | `false` |
| `[nzAlign]`       | 设置列内容的对齐方式                                                                           | `'left' \| 'right' \| 'center'` | -       |
| `[nzCellControl]` | 设置列的位置，该值为 `NzCustomColumn` 类型中 `value` 字段的值                                  | `string`                        | -       |
| `[nzBreakWord]`   | 是否折行显示                                                                                   | `boolean`                       | `false` |
| `[nzEllipsis]`    | 超过宽度将自动省略，暂不支持和排序筛选一起使用。仅当表格布局将为 `nzTableLayout="fixed"`时可用 | `boolean`                       | `false` |
| `[colSpan]`       | 每单元格中扩展列的数量                                                                         | `number`                        | `null`  |
| `[rowSpan]`       | 每单元格中扩展行的数量                                                                         | `number`                        | `null`  |

其他

| 参数            | 说明                                   | 类型     | 默认值 |
| --------------- | -------------------------------------- | -------- | ------ |
| `[nzColumnKey]` | 当前列的 key，用于服务端筛选和排序使用 | `string` | -      |

### td

勾选属性

| 参数                | 说明                            | 类型                    | 默认值 |
| ------------------- | ------------------------------- | ----------------------- | ------ |
| `[nzShowCheckbox]`  | 是否添加 checkbox               | `boolean`               | -      |
| `[nzDisabled]`      | checkbox 是否禁用               | `boolean`               | -      |
| `[nzIndeterminate]` | checkbox indeterminate 状态     | `boolean`               | -      |
| `[nzLabel]`         | checkbox 的可访问性标签         | `string`                | -      |
| `[nzChecked]`       | checkbox 是否被选中，可双向绑定 | `boolean`               | -      |
| `(nzCheckedChange)` | 选中的回调                      | `EventEmitter<boolean>` | -      |
| `[colSpan]`         | 单元格可横跨的列数              | `number`                | `null` |
| `[rowSpan]`         | 单元格可横跨的行数              | `number`                | `null` |

展开属性

| 参数               | 说明                         | 类型                    | 默认值 |
| ------------------ | ---------------------------- | ----------------------- | ------ |
| `[nzShowExpand]`   | 是否显示展开按钮             | `boolean`               | -      |
| `[nzExpand]`       | 当前展开按钮状态，可双向绑定 | `boolean`               | -      |
| `[nzExpandIcon]`   | 自定义展开图标               | `TemplateRef<void>`     | -      |
| `(nzExpandChange)` | 当前展开按钮状态改变回调函数 | `EventEmitter<boolean>` | -      |

样式属性

| 参数              | 说明                                                                                           | 类型                            | 默认值  |
| ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| `[nzLeft]`        | 左侧距离，用于固定左侧列，当为 `true` 时自动计算，为 `false` 时停止固定                        | `string \| boolean`             | `false` |
| `[nzRight]`       | 右侧距离，用于固定右侧列，当为 `true` 时自动计算，为 `false` 时停止固定                        | `string \| boolean`             | `false` |
| `[nzAlign]`       | 设置列内容的对齐方式                                                                           | `'left' \| 'right' \| 'center'` | -       |
| `[nzCellControl]` | 设置列的位置，该值为 `NzCustomColumn` 类型中 `value` 字段的值                                  | `string`                        | -       |
| `[nzBreakWord]`   | 是否折行显示                                                                                   | `boolean`                       | `false` |
| `[nzEllipsis]`    | 超过宽度将自动省略，暂不支持和排序筛选一起使用。仅当表格布局将为 `nzTableLayout="fixed"`时可用 | `boolean`                       | `false` |

其他

| 参数             | 说明                                         | 类型     | 默认值 |
| ---------------- | -------------------------------------------- | -------- | ------ |
| `[nzIndentSize]` | 展示树形数据时，每层缩进的宽度，以 px 为单位 | `number` | -      |

### thead

| 参数                  | 说明                                                      | 类型                                                                  | 默认值 |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- | ------ |
| `(nzSortOrderChange)` | 排序状态改变回调，需要与 `th` 上的 `nzColumnKey` 同时使用 | `EventEmitter<{ key: string, value: 'descend' \| 'ascend' \| null }>` | -      |

### tr

| 参数         | 说明                                                 | 类型      | 默认值 |
| ------------ | ---------------------------------------------------- | --------- | ------ |
| `[nzExpand]` | 当前列是否展开，与 `td` 上的 `nzExpand` 属性配合使用 | `boolean` | -      |

### tfoot

| 参数          | 说明                                       | 类型                           | 默认值  |
| ------------- | ------------------------------------------ | ------------------------------ | ------- |
| `[nzSummary]` | 总结栏                                     | `boolean`                      | -       |
| `[nzFixed]`   | 总结栏是否固定，与 `nzScroll` 属性配合使用 | `boolean \| 'top' \| 'bottom'` | `false` |

### nz-filter-trigger

用于自定义筛选功能

| 参数                | 说明                                     | 类型                      | 默认值  |
| ------------------- | ---------------------------------------- | ------------------------- | ------- |
| `[nzDropdownMenu]`  | Dropdown 下拉菜单组件                    | `NzDropdownMenuComponent` | -       |
| `[nzVisible]`       | 菜单是否显示，可双向绑定                 | `boolean`                 | -       |
| `[nzActive]`        | 是否激活选中图标效果                     | `boolean`                 | `false` |
| `[nzHasBackdrop]`   | 是否附带背景板                           | `boolean`                 | `false` |
| `(nzVisibleChange)` | 菜单显示状态改变时调用，参数为 nzVisible | `EventEmitter<boolean>`   | -       |

### [nz-virtual-scroll]

虚拟滚动时配合 `ng-template` 使用, 格式为： `TemplateRef<{ $implicit: T, index: number }>`。

## 注意

为了获得更好的性能，NG-ZORRO 所有组件都运行在 [OnPush](https://angular.cn/guide/components/advanced-configuration#changedetectionstrategy) 模式下，这意味着对 `@Input()` 数据的 mutate 将不会生效，请使用 immutable 方式操作数组或者对象。

```typescript
// 增加数据
this.dataSet = [
  ...this.dataSet,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`
  }
];
// 删除数据
this.dataSet = this.dataSet.filter(d => d.key !== i);
```

开发者也可以使用 [immer](https://immerjs.github.io/immer/docs/introduction) 获得更好的操作体验。
