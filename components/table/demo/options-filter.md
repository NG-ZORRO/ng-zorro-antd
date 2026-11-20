---
order: 6
title:
  en-US: Generated filter options
  zh-CN: 自动生成筛选项
---

## zh-CN

通过 `[nzFilterConfig]` 设置 `type: 'options'`，表格会根据全部数据自动生成去重后的筛选项。`null`、`undefined`、空字符串、`NaN` 和无效日期会合并为一个「空值」选项，并始终位于末尾。使用 `[(nzFilterValue)]` 可以读取或设置当前筛选值。

## en-US

Set `type: 'options'` in `[nzFilterConfig]` to generate unique filter options from all table data. `null`, `undefined`, empty strings, `NaN`, and invalid dates are grouped into one "(empty)" option, which is always listed last. Use `[(nzFilterValue)]` to read or set the applied filter value.
