---
order: 7
title:
  en-US: Reset filters and sorters
  zh-CN: 可控的筛选和排序
---

## zh-CN

使用受控属性对筛选状态进行控制。

> 1. 在`th` 中定义了 `nzSort` 属性即视为受控模式。
> 2. 通过手动指定 `nzSort` 来指定当前列的排序状态
> 3. 通过 `th` 的 `nzSortChange` 事件来获取当前列排序状态的改变
> 4. 不可与 `thead` 中的 `nzSortChange` 或 `nzSingleSort` 同时使用

## en-US

Control sorters by `nzSort` and `nzSortChange` on `th`.

> 1. Defining `nzSort` of `th` means that it is in the controlled mode.
> 2. Use `nzSort` to define current sort order.
> 3. Use `nzSortChange` to watch the change of sort order.
> 3. Can not used with `nzSortChange` or `nzSingleSort` of `thead`.

