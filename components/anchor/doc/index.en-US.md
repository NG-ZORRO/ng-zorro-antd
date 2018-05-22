---
category: Components
type: Other
title: Anchor
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

## API

### Anchor Props

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAffix | Fixed mode of Anchor | boolean | true |
| nzBounds | Bounding distance of anchor area | number | 5(px) |
| nzOffsetBottom | Pixels to offset from bottom when calculating position of scroll | number | - |
| nzOffsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |
| nzShowInkInFixed | Whether show ink-balls in Fixed mode | boolean | false |
| nzClick | Click of Anchor item | EventEmitter | - |
| nzScroll | The scroll function that is triggered when scrolling to an anchor. | EventEmitter | - |

### Link Props

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzHref | target of hyperlink | string |  |
| nzTitle | content of  hyperlink | string丨TemplateRef |  |
