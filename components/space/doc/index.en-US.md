---
category: Components
type: Layout
cols: 1
title: Space
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
tag: New
---

Set components spacing.

## When To Use

Avoid components clinging together and set a unified space.

```ts
import { NzSpaceModule } from 'ng-zorro-antd/space';
```

## API

### nz-space

| Property        | Description                                 | Type                                         | Default      | Global Config |
| --------------- | ------------------------------------------- | -------------------------------------------- | ------------ | ------------- |
| `[nzSize]`      | The space size                              | `'small' \| 'middle' \| 'large' \| number`   | `small`      | ✅             |
| `[nzDirection]` | The space direction                         | `'vertical' \| 'horizontal'`                 | `horizontal` |               |
| `[nzAlign]`     | Align items                                 | `'start' \| 'end' \| 'baseline' \| 'center'` | -            |               |
| `[nzWrap]`      | Auto wrap line, when `horizontal` effective | `boolean`                                    | `false`      |               |
| `[nzSplit]`     | Set split                                   | `TemplateRef \| string`                      | -            |               |

### nz-space-compact

Use `<nz-space-compact>` when child form components are compactly connected and the border is collapsed. The supported components are：

- Button
- Cascader
- DatePicker
- Input
- Select
- TimePicker
- TreeSelect
-
| 参数            | 说明                                       | 类型                              | 默认值         | 支持全局配置 |
| --------------- | ------------------------------------------ | --------------------------------- | -------------- | ------------ |
| `[nzBlock]`     | Option to fit width to its parent\'s width | `boolean`                         | `false`        |              |
| `[nzDirection]` | Set direction of layout                    | `'vertical' \| 'horizontal'`      | `'horizontal'` |              |
| `[nzSize]`      | Set child component size                   | `'large' \| 'default' \| 'small'` | `'default'`    |              |
