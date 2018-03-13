---
category: Components
subtitle: 锚点
type: Other
title: Anchor
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### Anchor Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzAffix | 固定模式 | boolean | true |
| nzBounds | 锚点区域边界 | number | 5(px) |
| nzOffsetBottom | 距离窗口底部达到指定偏移量后触发 | number |  |
| nzOffsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |
| nzShowInkInFixed | 固定模式是否显示小圆点 | boolean | false |
| nzClick | 点击项触发 | EventEmitter | - |
| nzScroll | 滚动至某锚点时触发 | EventEmitter | - |

### Link Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzHref | 锚点链接 | string |  |
| nzTitle | 文字内容 | string丨TemplateRef |  |
