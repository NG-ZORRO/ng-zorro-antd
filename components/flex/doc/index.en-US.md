---
category: Components
type: Layout
cols: 1
title: Flex
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original'
tag: 17.1.0
description: A flex layout container for alignment.
---

## When To Use

- Good for setting spacing between elements.
- Suitable for setting various horizontal and vertical alignments.

### Difference with Space component

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for
  inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of
  child elements in vertical or horizontal direction, and provides more flexibility and control.

## API

### [nz-flex]

| Property       | Description                                                                | Type                                                                                          | Default    |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| `[nzVertical]` | Is direction of the flex vertical, use `flex-direction: column`            | `boolean`                                                                                     | `false`    |
| `[nzJustify]`  | Sets the alignment of elements in the direction of the main axis           | reference [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) | `'normal'` |
| `[nzAlign]`    | Sets the alignment of elements in the direction of the cross axis          | reference [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)         | `'normal'` |
| `[nzGap]`      | Sets the gap between items                                                 | `'small' \| 'middle' \| 'large' \| number \| string`                                          | `0`        |
| `[nzWrap]`     | Set whether the element is displayed in a single line or in multiple lines | reference [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)             | `'nowrap'` |
| `[nzFlex]`     | Flex CSS shorthand properties                                              | reference [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)                       | `'unset'`  |
