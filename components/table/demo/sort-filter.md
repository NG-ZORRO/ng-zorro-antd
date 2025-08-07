---
order: 5
title:
  en-US: Filter and sorter
  zh-CN: 筛选和排序
---

## zh-CN

筛选：对某一列数据进行筛选，通过指定 `[nzFilters]` 属性来指定筛选菜单，`[nzFilterFn]` 指定筛选函数，`[nzFilterMultiple]` 用于指定多选和单选，通过设置 `[nzFilters]` 中的 `{ byDefault: true }` 属性来默认启用一个筛选器。

排序：对某一列数据进行排序，通过指定 `[nzSortOrder]` 来指定默认排序顺序，`[nzSortFn]` 指定排序函数 `[nzSortDirections]` 改变每列可用的排序方式。

## en-US

Filter: Use `[nzFilters]` to define options of the filter menu, `[nzFilterFn]` to determine filtered result, and `[nzFilterMultiple]` to indicate whether it's multiple or single selection, you can enable a filter by default by setting a `[nzFilters]` object's property: `{ byDefault: true }`.

Sort: Use `[nzSortOrder]` to make a column sorted by default, use `[nzSortFn]` to determine sort result, and `[nzSortDirections]` to define available sort methods.
