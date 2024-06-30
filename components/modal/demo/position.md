---
order: 9
title:
  zh-CN: 自定义位置
  en-US: To customize the position of modal
---

## zh-CN

使用 `nzCentered` 或类似 `style.top` 的样式来设置对话框位置。

> **注意** 由于Angular的样式隔离，若在Component中没有加入`encapsulation: ViewEncapsulation.None`，则您可能需要在自定义样式内采用`::ng-deep`来覆盖NgZorro的样式

## en-US

You can use `nzCentered`,`style.top` or other styles to set position of modal dialog.

> **NOTE** Due to Angular's style isolation, you may need to override the NgZorro style with `:: ng-deep` within a custom style if `encapsulation: ViewEncapsulation.None` is not included in the Component
