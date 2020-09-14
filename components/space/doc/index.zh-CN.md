---
category: Components
type: 布局
subtitle: 间距
title: Space
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

Set components spacing.

## 何时使用

Avoid components clinging together and set a unified space.

```ts
import { NzSpaceModule } from 'ng-zorro-antd/space';
```

## API

### nz-space

| 参数 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --------- | -------- | ------------------------------------------ | ------------ | -- |
| `[nzSize]`      | 间距大小 | `small` \| `middle` \| `large` \| `number` | `small`  | ✅ |
| `[nzDirection]` | 间距方向 | `vertical` \| `horizontal` | `horizontal` | |
| `[nzAlign]` | 对齐方式 | `start` \| `end` \| `baseline` \| `horizontal` | - | |
