---
category: Components
subtitle: 锚点
type: 导航
title: Anchor
cover: 'https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg'
description: 用于跳转到页面指定位置。
---

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### nz-anchor

| 成员                 | 说明                                    | 类型                                  | 默认值       | 全局配置 |
| -------------------- | --------------------------------------- | ------------------------------------- | ------------ | -------- |
| `[nzAffix]`          | 固定模式                                | `boolean`                             | `true`       |
| `[nzBounds]`         | 锚点区域边界，单位：px                  | `number`                              | `5`          | ✅       |
| `[nzOffsetTop]`      | 距离窗口顶部达到指定偏移量后触发        | `number`                              | -            | ✅       |
| `[nzShowInkInFixed]` | 固定模式是否显示小圆点                  | `boolean`                             | `false`      | ✅       |
| `[nzTargetOffset]`   | 锚点滚动偏移量，默认与 `offsetTop` 相同 | number                                | -            |          |
| `[nzContainer]`      | 指定滚动的容器                          | `string \| HTMLElement`               | `window`     |
| `[nzCurrentAnchor]`  | 自定义高亮的锚点                        | string                                | -            |          |
| `[nzDirection]`      | 设置导航方向                            | `'vertical' \| 'horizontal'`          | `'vertical'` |          |
| `(nzClick)`          | 点击项触发                              | `EventEmitter<string>`                | -            |
| `(nzChange)`         | 监听锚点链接改变                        | `EventEmitter<string>`                | -            |          |
| `(nzScroll)`         | 滚动至某锚点时触发                      | `EventEmitter<NzAnchorLinkComponent>` | -            |

### nz-link

| 成员         | 说明                           | 类型                          |
| ------------ | ------------------------------ | ----------------------------- |
| `[nzHref]`   | 锚点链接                       | `string`                      |
| `[nzTarget]` | 该属性指定在何处显示链接的资源 | `string`                      |
| `[nzTitle]`  | 文字内容                       | `string \| TemplateRef<void>` |
