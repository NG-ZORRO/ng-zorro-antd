---
category: Components
subtitle: 栅格
type: Layout
cols: 1
title: Grid
---

24 栅格系统。

## 设计理念

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

在多数业务情况下，Ant Design需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过`row`在水平方向建立一组`column`（简写col）
- 你的内容应当放置于`col`内，并且，只有`col`可以作为`row`的直接元素
- 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用`.col-8`来创建
- 如果一个`row`中的`col`总和超过 24，那么多余的`col`会作为一个整体另起一行排列

## Flex 布局

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但排版则不拘泥于栅格。

## API

### nz-row

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzAlign | flex 布局下的垂直对齐方式：`top` `middle` `bottom` | string | `top` |
| nzGutter | 栅格间隔，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }` | number/object | 0 |
| nzJustify | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | string | `start` |
| nzType | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | string |  |

### nz-col

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzOffset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | 0 |
| nzOrder | 栅格顺序，`flex` 布局模式下有效 | number | 0 |
| nzPull | 栅格向左移动格数 | number | 0 |
| nzPush | 栅格向右移动格数 | number | 0 |
| nzSpan | 栅格占位格数，为 0 时相当于 `display: none` | number | - |
| nzXs | `<576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |
| nzSm | `≥576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |
| nzMd | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |
| nzLg | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |
| nzXl | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |
| nzXXl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number丨object | - |

响应式栅格的断点扩展自 [BootStrap 4 的规则](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)（不包含链接里 `occasionally` 的部分)。
