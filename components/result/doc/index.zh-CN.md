---
category: Components
type: 反馈
title: Result
subtitle: 结果
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/9nepwjaLa/Result.svg'
description: 用于反馈一系列操作任务的处理结果。
---

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

### nz-result

| 属性         | 说明                       | 类型                                                                    | 默认值   |
| ------------ | -------------------------- | ----------------------------------------------------------------------- | -------- |
| `nzTitle`    | 标题                       | `TemplateRef<void> \| string`                                           | -        |
| `nzSubTitle` | 副标题                     | `TemplateRef<void> \| string`                                           | -        |
| `nzStatus`   | 结果的状态，决定图标和颜色 | `'success' \| 'error' \| 'info' \| 'warning'\| '404' \| '403' \| '500'` | `'info'` |
| `nzIcon`     | 自定义 icon                | `TemplateRef<void> \| string`                                           | -        |
| `nzExtra`    | 操作区域                   | `TemplateRef<void> \| string`                                           | -        |

### 子元素

你可以在 nz-result 中加入如下指令，它们的优先级低于上面的参数。

| 元素                      | 说明                     |
| ------------------------- | ------------------------ |
| `[nz-result-icon]`        | 在顶部展示的大图标       |
| `div[nz-result-title]`    | 标题                     |
| `div[nz-result-subtitle]` | 副标题                   |
| `div[nz-result-content]`  | 内容，可以展示详细的信息 |
| `div[nz-result-extra]`    | 操作区域                 |
