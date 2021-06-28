---
category: Components
type: 布局
subtitle: 间距
title: Space
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

```ts
import { NzSpaceModule } from 'ng-zorro-antd/space';
```

## API

### nz-space

| 参数 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --------- | -------- | ------------------------------------------ | ------------ | -- |
| `[nzSize]`      | 间距大小 | `'small' \| 'middle' \| 'large' \| number` | `'small'`  | ✅ |
| `[nzDirection]` | 间距方向 | `'vertical' \| 'horizontal'` | `horizontal` | |
| `[nzAlign]` | 对齐方式 | `'start' \| 'end' \| 'baseline' \| 'center'` | - | |
| `[nzWrap]` | 是否自动换行，仅在 `horizontal` 时有效 | `boolean` | `false` | |
| `[nzSplit]` | 设置分隔符 | `TemplateRef` | - | |
