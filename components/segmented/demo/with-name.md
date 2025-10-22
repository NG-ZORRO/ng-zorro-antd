---
order: 11
title:
  zh-CN: 配合 name 使用
  en-US: With name
---

## zh-CN

可以为配置 `nzName` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把分段控制器下的 input 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。

## en-US

Passing the `nzName` property to all `input[type="radio"]` that are in the same nz-segmented. It is usually used to let the browser see your nz-segmented as a real "group" and keep the default behavior. For example, using left/right keyboard arrow to change your selection that in the same Segmented.
