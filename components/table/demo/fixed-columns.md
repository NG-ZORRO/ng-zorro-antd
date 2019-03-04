---
order: 18
title:
  en-US: Fixed Columns
  zh-CN: 固定列
---

## zh-CN


对于列数很多的数据，可以使用 `nzLeft` 和 `nzRight` 固定前后的列，横向滚动查看其它数据，需要和 `nzScroll.x` 配合使用。

> 固定列使用了 `sticky` 属性，浏览器支持情况可以参考[这里](https://caniuse.com/#feat=css-sticky)。

> 若列头与内容不对齐或出现列重复，请指定每一列的 `th` 的宽度 `nzWidth`。

> 建议指定 `nzScroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `nzScroll.x`。

## en-US


To fix some columns and scroll inside other columns, and you must set `nzScroll.x`, `nzLeft` and `nzRight` meanwhile.

> We use `sticky` property to fixed column，[browsers support](https://caniuse.com/#feat=css-sticky).

> Specify the width of `th` if header and cell do not align properly.

> A fixed value which is greater than table width for `nzScroll.x` is recommended. The sum of unfixed columns should not greater than `nzScroll.x`.

