---
order: 5
title:
  en-US: Filter and sorter
  zh-CN: 筛选和排序
---

## zh-CN

对某一列数据进行筛选，通过指定 `th` 的 `nzShowFilter` 属性来展示筛选菜单， 使用 `nzFilters` 属性来指定筛选选项，`nzFilterChange` 用于获取当前选中的选项，`nzFilterMultiple` 用于指定多选和单选。

对某一列数据进行排序，通过指定 `th` 的 `nzShowSort` 属性来展示排序按钮，使用 `nzSortKey` 来指定排序的 key，在 `thead` 上通过 `nzSortChange` 来获取排序改变事件，通过 `nzSingleSort` 来指定是否单列排序。

## en-US

Use `nzShowFilter` of `th` to show filter menu, `nzFilters` to define options of the filter menu, `nzFilterChange` to get current selected filter option, and `nzFilterMultiple` to indicate whether it's multiple or single selection.

Use `nzShowSort` of `th` to make table sortable . `nzSortKey` to define sort key of column, use `nzSortChange` of `thead` to watch sort change, and `nzSingleSort` to indicate whether it is single column sort.


