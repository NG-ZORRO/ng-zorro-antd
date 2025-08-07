---
order: 9
title:
  en-US: Ajax
  zh-CN: 远程加载数据
---

## zh-CN

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

- 分页：使用 `[nzFrontPagination]="false"` 指定由服务端分页。
- 排序：使用 `[nzSortFn]="true"` 指定由服务端排序，如果需要多列排序可使用 `[nzSortPriority]="true"`。
- 筛选：使用 `[nzFilters]` 来指定筛选项，使用 `[nzFilterFn]="true"` 指定由服务端筛选
- 参数传输：通过 `(nzQueryParams)` 服务端需要的参数，数据结构为

```typescript
{
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: 'ascend' | 'descend' | null }>;
  filter: Array<{ key: string; value: any | any[] }>;
}
```

**注意，此示例使用 [模拟接口](https://randomuser.me)，展示数据可能不准确，请打开网络面板查看请求。**

## en-US

This example shows how to fetch and present data from remote server, and how to implement filtering and sorting in server side by sending related parameters to server.

- Pagination：Set `[nzFrontPagination]="false"` to disable frontend pagination.
- Sort：Set `[nzSortFn]="true"` to enable server sort, if you need multiple sort, set `[nzSortPriority]="true"`.
- Filter：Pass options to `[nzFilters]` and set `[nzFilterFn]="true"` to enable server filter.
- Params：Get all params from `(nzQueryParams)`, the data structure is

```typescript
{
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: 'ascend' | 'descend' | null }>;
  filter: Array<{ key: string; value: any | any[] }>;
}
```

**Note, this example uses a [Mock API](https://randomuser.me) that you can look up in Network Console.**
