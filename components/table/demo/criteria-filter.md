---
order: 6
title:
  en-US: Text, number and date filters
  zh-CN: 文本、数字和日期筛选
---

## zh-CN

通过 `[nzFilterConfig]` 设置 `type: 'text'`、`'number'` 或 `'date'`，表格会提供条件选择和对应的输入控件。文本筛选支持「区分大小写」，`fuzzy` 条件需要通过 `fuzzyMatcher` 提供匹配函数。过滤值为可序列化的条件对象，可以通过 `[(nzFilterValue)]` 读取或设置。

## en-US

Set `type: 'text'`, `'number'` or `'date'` in `[nzFilterConfig]` to get a condition select with matching editors. Text filters support "Match case", and the `fuzzy` condition uses the `fuzzyMatcher` you provide. The applied value is a serializable criterion object that can be read or set with `[(nzFilterValue)]`.
