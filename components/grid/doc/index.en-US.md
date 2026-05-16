---
category: Components
type: Layout
cols: 1
title: Grid
tag: updated
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mfJeS6cqZrEAAAAAAAAAAAAADrJ8AQ/original
description: 24 Grids System。
---

## Design concept

<div class="grid-demo">
  <div class="ant-row demo-row">
    <div class="ant-col-24 demo-col demo-col-1">
      100%
    </div>
  </div>
  <div class="ant-row demo-row">
    <div class="ant-col-6 demo-col demo-col-2">
      25%
    </div>
    <div class="ant-col-6 demo-col demo-col-3">
      25%
    </div>
    <div class="ant-col-6 demo-col demo-col-2">
      25%
    </div>
    <div class="ant-col-6 demo-col demo-col-3">
      25%
    </div>
  </div>
  <div class="ant-row demo-row">
    <div class="ant-col-8 demo-col demo-col-4">
      33.33%
    </div>
    <div class="ant-col-8 demo-col demo-col-5">
      33.33%
    </div>
    <div class="ant-col-8 demo-col demo-col-4">
      33.33%
    </div>
  </div>
  <div class="ant-row demo-row">
    <div class="ant-col-12 demo-col demo-col-1">
      50%
    </div>
    <div class="ant-col-12 demo-col demo-col-3">
      50%
    </div>
  </div>
  <div class="ant-row demo-row">
    <div class="ant-col-16 demo-col demo-col-4">
      66.66%
    </div>
    <div class="ant-col-8 demo-col demo-col-5">
      33.33%
    </div>
  </div>
</div>

In most business situations, Ant Design needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 sections.

We name the divided area 'box'. We suggest four boxes for horizontal arrangement at most, one at least. Boxes are proportional to the entire screen as shown in the picture above. To ensure a high level of visual comfort, we customize the typography inside of the box based on the box unit.

## Outline

In the grid system, we define the frame outside the information area based on `row` and `column`, to ensure that every area can have stable arrangement.

Following is a brief look at how it works:

- Establish a set of `column` in the horizontal space defined by `row` (abbreviated col)
- Your content elements should be placed directly in the `col`, and only `col` should be placed directly in `row`
- The column grid system is a value of 1-24 to represent its range spans. For example, three columns of equal width can be created by `<div nz-col [nzSpan]="8" />`.
- If the sum of `col` spans in a `row` are more than 24, then the overflowing `col` as a whole will start a new line arrangement.

Our grid systems base on Flex layout to allow the elements within the parent to be aligned horizontally - left, center, right, wide arrangement, and decentralized arrangement. The Grid system also supports vertical alignment - top aligned, vertically centered, bottom-aligned. You can also define the order of elements by using `order`.

Layout uses a 24 grid layout to define the width of each "box", but does not rigidly adhere to the grid layout.

## API

### [nz-row]

| Property      | Description                                                                                                                                                                                                                                                                          | Type                                                                                  | Default | Version                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------- | ------------------------ |
| `[nzAlign]`   | The vertical alignment                                                                                                                                                                                                                                                               | `'top' \| 'middle' \| 'bottom' \| 'stretch'`                                          | -       |
| `[nzGutter]`  | Spacing between grids, could be a [string CSS units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) or a object like `{ xs: 8, sm: 16, md: 24}`. Or you can use array to make horizontal and vertical spacing work at the same time `[horizontal, vertical]` | `string \| number \| object \| array`                                                 | `0`     | string CSS units: 21.3.0 |
| `[nzJustify]` | Horizontal arrangement                                                                                                                                                                                                                                                               | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | -       |

### [nz-col]

| Property     | Description                                                                                            | Type               | Default |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------------ | ------- |
| `[nzFlex]`   | Flex layout style                                                                                      | `string \| number` | -       |
| `[nzOffset]` | The number of cells to offset Col from the left                                                        | `number`           | `0`     |
| `[nzOrder]`  | Raster order                                                                                           | `number`           | `0`     |
| `[nzPull]`   | The number of cells that raster is moved to the left                                                   | `number`           | `0`     |
| `[nzPush]`   | The number of cells that raster is moved to the right                                                  | `number`           | `0`     |
| `[nzSpan]`   | Raster number of cells to occupy, 0 corresponds to `display: none`                                     | `number`           | -       |
| `[nzXs]`     | `screen < 576px` and also default setting, could be a `span` value or an object containing above props | `number \| object` | -       |
| `[nzSm]`     | `screen ≥ 576px`, could be a `span` value or an object containing above props                          | `number \| object` | -       |
| `[nzMd]`     | `screen ≥ 768px`, could be a `span` value or an object containing above props                          | `number \| object` | -       |
| `[nzLg]`     | `screen ≥ 992px`, could be a `span` value or an object containing above props                          | `number \| object` | -       |
| `[nzXl]`     | `screen ≥ 1200px`, could be a `span` value or an object containing above props                         | `number \| object` | -       |
| `[nzXXl]`    | `screen ≥ 1600px`, could be a `span` value or an object containing above props                         | `number \| object` | -       |

The breakpoints of responsive grid follow [BootStrap 4 media queries rules](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)(not including `occasionally part`).
