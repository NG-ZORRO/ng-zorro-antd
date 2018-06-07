---
category: Components
type: Other
title: BackTop
---

`nz-back-top` makes it easy to go back to the top of the page.

## When To Use

- When the page content is very long.
- When you need to go back to the top very frequently in order to view the contents.

## API

### nz-back-top

> The distance to the bottom is set to `50px` by default, which is overridable.
> If you decide to use custom styles, please note the size limit: no more than `40px * 40px`.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzTemplate]` | custom content | `TemplateRef<void>` | - |
| `[nzVisibilityHeight]` | the `nz-back-top` button will not show until the scroll height reaches this value | number | `400` |
| `[nzTarget]` | specifies the scrollable area dom node | Element | `window` |
| `(nzClick)` | a callback function, which can be executed when you click the button | `EventEmitter<boolean>` | - |

