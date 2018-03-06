---
order: 19
title:
  en-US: Fixed Columns and Header
  zh-CN: 固定头和列
---

## zh-CN


适合同时展示有大量数据和数据列。

> 固定列使用了 `sticky` 属性，浏览器支持情况可以参考[这里](https://caniuse.com/#feat=css-sticky)。

> 若列头与内容不对齐或出现列重复，请指定列的宽度 `nzWidth`。

> 建议指定 `nzScroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `nzScroll.x`。

## en-US

A Solution for displaying large amounts of data with long columns.

> We use `sticky` property to fixed column，[browsers support](https://caniuse.com/#feat=css-sticky).

> Specify the width of `th` if header and cell do not align properly.

> A fixed value which is greater than table width for `nzScroll.x` is recommended. The sum of unfixed columns should not greater than `nzScroll.x`.

