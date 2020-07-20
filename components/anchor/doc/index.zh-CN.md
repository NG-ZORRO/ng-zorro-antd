---
category: Components
subtitle: 锚点
type: 其他
title: Anchor
cover: https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

```ts
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
```


## API

### nz-anchor

| 成员 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzAffix]` | 固定模式 | `boolean` | `true` |
| `[nzBounds]` | 锚点区域边界，单位：px | `number` | `5` | ✅ |
| `[nzOffsetTop]` | 距离窗口顶部达到指定偏移量后触发 | `number` | - | ✅ |
| `[nzShowInkInFixed]` | 固定模式是否显示小圆点 | `boolean` | `false` | ✅ |
| `[nzContainer]` | 指定滚动的容器 | `string \| HTMLElement` | `window` |
| `(nzClick)` | 点击项触发 | `EventEmitter<string>` | - |
| `(nzScroll)` | 滚动至某锚点时触发 | `EventEmitter<NzAnchorLinkComponent>` | - |

### nz-link

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzHref]` | 锚点链接 | `string` | - |
| `[nzTitle]` | 文字内容 | `string \| TemplateRef<void>` | - |
