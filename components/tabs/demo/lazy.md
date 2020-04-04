---
order: 12
title:
  zh-CN: 懒加载
  en-US: LazyLoad
---

## zh-CN

默认情况下，`nz-tab` 中的组件的 `ngOnInit` 会提前触发，如果希望当 Tab 被激活时再触发 `ngOnInit`，可以使用该示例中的懒加载方式。

## en-US

By default, the contents in `nz-tab` are eagerly loaded. Tab contents can be lazy loaded by declaring the body in a `ng-template` with the `[nz-tab]` attribute.
