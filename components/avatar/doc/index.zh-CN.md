---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
---

用来代表用户或事物，支持图片、图标或字符展示。

## API

### 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzAvatarModule } from 'ng-zorro-antd';
```

### nz-avatar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzIcon]` | 设置头像的图标类型，参考 `Icon` | `string` | - |
| `[nzShape]` | 指定头像的形状 | `'circle'｜'square'` | `'circle'` |
| `[nzSize]` | 设置头像的大小 | `'large'｜'small'｜'default'｜number` | `'default'` |
| `[nzSrc]` | 图片类头像的资源地址 | `string` | - |
| `[nzText]` | 文本类头像 | `string` | - |
