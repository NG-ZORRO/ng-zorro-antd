---
category: Components
type: Other
title: Anchor
cover: https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

```ts
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
```

## API

### nz-anchor

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzAffix]` | Fixed mode of Anchor | `boolean` | `true` |
| `[nzBounds]` | Bounding distance of anchor area, unit: px | `number` | `5` | ✅ |
| `[nzOffsetTop]` | Pixels to offset from top when calculating position of scroll | `number` | `0` | ✅ |
| `[nzShowInkInFixed]` | Whether show ink-balls in Fixed mode | `boolean` | `false` | ✅ |
| `[nzContainer]` | Scrolling container | `string \| HTMLElement` | `window` |
| `(nzClick)` | Click of Anchor item | `EventEmitter<string>` | - |
| `(nzScroll)` | The scroll function that is triggered when scrolling to an anchor. | `EventEmitter<NzAnchorLinkComponent>` | - |

### nz-link

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzHref]` | target of hyperlink | `string` | - |
| `[nzTitle]` | content of  hyperlink | `string \| TemplateRef<void>` | - |
