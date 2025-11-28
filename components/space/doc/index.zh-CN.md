---
category: Components
type: 布局
subtitle: 间距
title: Space
cols: 1
cover: 'https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg'
description: 设置组件之间的间距。
---

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。
- 需要表单组件之间紧凑连接且合并边框时，使用 `<nz-space-compact>`。

与 Flex 组件的区别：

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## API

### nz-space

| 参数            | 说明                                   | 类型                                         | 默认值         | 支持全局配置 |
| --------------- | -------------------------------------- | -------------------------------------------- | -------------- | ------------ |
| `[nzSize]`      | 间距大小                               | `NzSpaceSize \| NzSpaceSize[]`               | `'small'`      | ✅           |
| `[nzDirection]` | 间距方向                               | `'vertical' \| 'horizontal'`                 | `'horizontal'` |              |
| `[nzAlign]`     | 对齐方式                               | `'start' \| 'end' \| 'baseline' \| 'center'` | -              |              |
| `[nzWrap]`      | 是否自动换行，仅在 `horizontal` 时有效 | `boolean`                                    | `false`        |              |
| `[nzSplit]`     | 设置分隔符                             | `TemplateRef \| string`                      | -              |              |

#### Interfaces

```ts
type NzSpaceSize = 'small' | 'middle' | 'large' | number;
```

### nz-space-compact

需要表单组件之间紧凑连接且合并边框时，使用 `<nz-space-compact>`。支持的组件有：

- Button
- Cascader
- DatePicker
- Input
- Select
- TimePicker
- TreeSelect

| 参数            | 说明                         | 类型                              | 默认值         | 支持全局配置 |
| --------------- | ---------------------------- | --------------------------------- | -------------- | ------------ |
| `[nzBlock]`     | 将宽度调整为父元素宽度的选项 | `boolean`                         | `false`        |              |
| `[nzDirection]` | 指定排列方向                 | `'vertical' \| 'horizontal'`      | `'horizontal'` |              |
| `[nzSize]`      | 子组件大小                   | `'large' \| 'small' \| 'default'` | `'default'`    |              |
