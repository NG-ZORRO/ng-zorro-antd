---
category: Components
subtitle: 弹性布局
type: 布局
cols: 1
title: Flex
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original'
tag: 17.1.0
description: 用于对齐的弹性布局容器。
---

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## API

### [nz-flex]

| 参数           | 说明                                                                                                                     | 类型                                                 | 默认值     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ---------- |
| `[nzVertical]` | 使用 `flex-direction: column`描述flex的垂直方向                                                                          | `boolean`                                            | `false`    |
| `[nzJustify]`  | 设置元素在主轴方向上的对齐方式，参照 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | `NzJustify`                                          | `'normal'` |
| `[nzAlign]`    | 设置元素在交叉轴方向上的对齐方式，参照 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)       | `NzAlign`                                            | `'normal'` |
| `[nzGap]`      | 设置项目的间隙                                                                                                           | `'small' \| 'middle' \| 'large' \| number \| string` | `0`        |
| `[nzWrap]`     | 指定 flex 元素单行显示还是多行显示，参照 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)         | `NzWrap`                                             | `'nowrap'` |
| `[nzFlex]`     | flex css简写属性，参照 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)                                     | `NzFlex`                                             | `'unset'`  |
