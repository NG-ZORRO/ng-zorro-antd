---
order: 9
title:
  en-US: Ajax
  zh-CN: 远程加载数据
---

## zh-CN

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

- 排序：可使用单列或者多列排序
  - 单列排序：使用 `[nzSortKey]` 来指定排序的名称，在 thead 上通过 `(nzSortChange)` 来获取排序改变事件，通过 `[nzSingleSort]` 来指定是否单列排序。
  - 多列排序：使用 `[nzSortOrder]` 来指定排序，`(nzSortOrderChange)` 获取排序事件改变。
- 筛选：使用 `[nzFilters]` 来指定筛选选项，使用 `(nzFilterChange)` 来获取筛选事件。

**注意，此示例使用 [模拟接口](https://randomuser.me)，展示数据可能不准确，请打开网络面板查看请求。**

## en-US

This example shows how to fetch and present data from remote server, and how to implement filtering and sorting in server side by sending related parameters to server. 

- Sort: support both single sort and multiple sort
  - Single sort: Use `[nzSortKey]` to define sort key of column, use `(nzSortChange)` of thead to watch sort change, and `[nzSingleSort]` to indicate whether it is single column sort.
  - Multiple sort: Use `[nzSortOrder]` to define sort order, use `(nzSortOrderChange)` to get the sort order change event.
- Filter: Use `[nzFilters]` to set the filter options, use `(nzFilterChange)` to get the filter change event.
 
**Note, this example uses a [Mock API](https://randomuser.me) that you can look up in Network Console.**


