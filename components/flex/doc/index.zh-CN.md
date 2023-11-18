---
category: Components
subtitle: 栅格
type: 布局
cols: 1
title: Flex
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

弹性布局

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

### 引入模块

```ts
import { NzFlexModule } from 'ng-zorro-antd/flex';
```

## API

### [nz-flex]:standalone

| Property       | Description                                                                | Type                                                                                          | Default    |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| `[nzVertical]` | Is direction of the flex vertical, use `flex-direction: column`            | `boolean`                                                                                     | `false`    |
| `[nzJustify]`  | Sets the alignment of elements in the direction of the main axis           | reference [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) | `'normal'` |
| `[nzAlign]`    | Sets the alignment of elements in the direction of the cross axis          | reference [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)         | `'normal'` |
| `[nzGap]`      | Sets the gap between items                                                 | `'small' \| 'middle' \| 'large' \| number \| string`                                          | `0`        |
| `[nzWrap]`     | Set whether the element is displayed in a single line or in multiple lines | reference [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)             | `'nowrap'` |
| `[nzFlex]`     | Flex CSS shorthand properties                                              | reference [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)                       | `'unset'`  |
