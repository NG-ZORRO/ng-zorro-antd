---
category: Components
type: Navigation
title: Anchor
cover: 'https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg'
description: Hyperlinks to scroll on one page.
---

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

## API

### nz-anchor

| Property             | Description                                                        | Type                                  | Default      | Global Config |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------- | ------------ | ------------- |
| `[nzAffix]`          | Fixed mode of Anchor                                               | `boolean`                             | `true`       |
| `[nzBounds]`         | Bounding distance of anchor area, unit: px                         | `number`                              | `5`          | ✅            |
| `[nzOffsetTop]`      | Pixels to offset from top when calculating position of scroll      | `number`                              | `0`          | ✅            |
| `[nzShowInkInFixed]` | Whether show ink-balls in fixed mode                               | `boolean`                             | `false`      | ✅            |
| `[nzTargetOffset]`   | Anchor scroll offset, default as `offsetTop`                       | `number`                              | -            |               |
| `[nzContainer]`      | Scrolling container                                                | `string \| HTMLElement`               | `window`     |
| `[nzCurrentAnchor]`  | Customize the anchor highlight                                     | `string`                              | -            |               |
| `[nzDirection]`      | Set Anchor direction                                               | `'vertical' \| 'horizontal'`          | `'vertical'` |               |
| `(nzClick)`          | Click of Anchor item                                               | `EventEmitter<string>`                | -            |
| `(nzChange)`         | Listening for anchor link change                                   | `EventEmitter<string>`                | -            |               |
| `(nzScroll)`         | The scroll function that is triggered when scrolling to an anchor. | `EventEmitter<NzAnchorLinkComponent>` | -            |

### nz-link

| Property     | Description                               | Type                          |
| ------------ | ----------------------------------------- | ----------------------------- |
| `[nzHref]`   | target of hyperlink                       | `string`                      |
| `[nzTarget]` | Specifies where to display the linked URL | `string`                      |
| `[nzTitle]`  | content of hyperlink                      | `string \| TemplateRef<void>` |
