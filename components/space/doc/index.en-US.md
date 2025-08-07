---
category: Components
type: Layout
cols: 1
title: Space
cover: 'https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg'
description: Set components spacing.
---

## When To Use

- Avoid components clinging together and set a unified space.
- Use `<nz-space-compact>` when child form components are compactly connected and the border is collapsed.

The difference with Flex component is:

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.

## API

### nz-space

| Property        | Description                                 | Type                                         | Default        | Global Config |
| --------------- | ------------------------------------------- | -------------------------------------------- | -------------- | ------------- |
| `[nzSize]`      | The space size                              | `NzSpaceSize \| NzSpaceSize[]`               | `'small'`      | ✅            |
| `[nzDirection]` | The space direction                         | `'vertical' \| 'horizontal'`                 | `'horizontal'` |               |
| `[nzAlign]`     | Align items                                 | `'start' \| 'end' \| 'baseline' \| 'center'` | -              |               |
| `[nzWrap]`      | Auto wrap line, when `horizontal` effective | `boolean`                                    | `false`        |               |
| `[nzSplit]`     | Set split                                   | `TemplateRef \| string`                      | -              |               |

#### Interfaces

```ts
type NzSpaceSize = 'small' | 'middle' | 'large' | number;
```

### nz-space-compact

Use `<nz-space-compact>` when child form components are compactly connected and the border is collapsed. The supported components are：

- Button
- Cascader
- DatePicker
- Input
- Select
- TimePicker
- TreeSelect

| 参数            | 说明                                       | 类型                              | 默认值         | 支持全局配置 |
| --------------- | ------------------------------------------ | --------------------------------- | -------------- | ------------ |
| `[nzBlock]`     | Option to fit width to its parent\'s width | `boolean`                         | `false`        |              |
| `[nzDirection]` | Set direction of layout                    | `'vertical' \| 'horizontal'`      | `'horizontal'` |              |
| `[nzSize]`      | Set child component size                   | `'large' \| 'small' \| 'default'` | `'default'`    |              |
