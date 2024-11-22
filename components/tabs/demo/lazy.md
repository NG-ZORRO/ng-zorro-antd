---
order: 13
title:
  zh-CN: 延迟加载
  en-US: LazyLoad
---

## zh-CN

默认情况下，`nz-tab` 中的组件是立即加载的。可以通过在 `ng-template` 中使用 `[nz-tab]` 指令来实现延迟加载选项卡内容。

> 配合 `nzDestroyInactiveTabPane` 使用，可以实现 tab 隐藏时销毁组件。

## en-US

By default, the contents in `nz-tab` are eagerly loaded. Tab contents can be lazy loaded by declaring the body in a `ng-template` with the `[nz-tab]` directive.

> Combine with `nzDestroyInactiveTabPane` to destroy the component when the tab is hidden.
