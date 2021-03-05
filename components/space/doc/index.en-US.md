---
category: Components
type: Layout
cols: 1
title: Space
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

Set components spacing.

## When To Use

Avoid components clinging together and set a unified space.

```ts
import { NzSpaceModule } from 'ng-zorro-antd/space';
```

## API

### nz-space


| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[nzSize]` | The space size | `'small' \| 'middle' \| 'large' \| number` | `small` | ✅ |
| `[nzDirection]` | The space direction | `'vertical' \| 'horizontal'` | `horizontal` |  |
| `[nzAlign]` | Align items | `'start' \| 'end' \| 'baseline' \| 'center'` | - | |
| `[nzWrap]` | Auto wrap line, when `horizontal` effective| `boolean` | `false` | |
| `[nzSplit]` | Set split | `TemplateRef` | - | |
