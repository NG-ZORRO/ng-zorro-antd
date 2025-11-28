---
order: 18
title:
  en-US: Fixed Columns
  zh-CN: 固定列
---

## zh-CN

对于列数很多的数据，可以使用 `[nzLeft]` 和 `[nzRight]` 固定前后的列，横向滚动查看其它数据，需要和 `[nzScroll].x` 配合使用。

> 列头与内容不对齐或出现列重复，请指定固定列的宽度 `[nzWidth]`。如果指定 width 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
> 建议指定 `nzScroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `nzScroll.x`。
> 注意：固定列通过 sticky 实现，IE 11 会降级成横向滚动。

## en-US

To fix some columns and scroll inside other columns, and you must set `[nzScroll].x`, `[nzLeft]` and `[nzRight]` meanwhile.

> Specify the `[nzWidth]` of columns if header and cell do not align properly. If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no long word to break table layout.
> A fixed value which is greater than table width for `nzScroll.x` is recommended. The sum of unfixed columns should not greater than `nzScroll.x`.
> Note: We using sticky to implement fixed effect. IE 11 will downgrade to horizontal scroll.
