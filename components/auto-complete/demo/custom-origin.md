---
order: 3
version: 22.1.0
title:
  zh-CN: 自定义浮层锚点
  en-US: Custom Overlay Origin
---

## zh-CN

使用 `nzAutocompleteOrigin` 和 `nzAutocompleteConnectedTo` 指定自动完成浮层的锚点。浮层定位和默认宽度将以锚点元素为准。在 `nz-autocomplete` 上设置 `[nzDropdownMatchSelectWidth]="false"` 可允许浮层随内容扩展，同时以锚点宽度作为最小宽度；如设置 `nzWidth`，则以该值作为最小宽度。

## en-US

Use `nzAutocompleteOrigin` and `nzAutocompleteConnectedTo` to specify the origin of the autocomplete overlay. The overlay position and default width are based on the origin element. Set `[nzDropdownMatchSelectWidth]="false"` on `nz-autocomplete` to let the panel grow with its content while using the origin width as its minimum width. If `nzWidth` is set, that value becomes the minimum width instead.
