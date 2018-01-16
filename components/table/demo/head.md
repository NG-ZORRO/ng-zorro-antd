---
order: 7
title:
  en-US: Filter and sorter
  zh-CN: 筛选和排序
---

## zh-CN

对某一列数据进行筛选，使用列的 `filters` 属性来指定需要筛选菜单的列，`onFilter` 用于筛选当前数据，`filterMultiple` 用于指定多选和单选。

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。`sorter: function(a, b) { ... }`， a、b 为比较的两个列数据。

## en-US

Use `filters` to generate filter menu in columns, `onFilter` to determine filtered result, and `filterMultiple` to indicate whether it's multiple or single selection.

Use `sorter` to make a column sortable. `sorter` can be a function `function(a, b) { ... }` for sorting data locally.

Uses `defaultSortOrder` to make a column sorted by default.


