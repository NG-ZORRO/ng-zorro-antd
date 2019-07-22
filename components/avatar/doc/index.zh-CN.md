---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
---

用来代表用户或事物，支持图片、图标或字符展示。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
```

## API

### nz-avatar

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzIcon]` | 设置头像的图标类型，参考 `Icon` | `string` | - |
| `[nzShape]` | 指定头像的形状 | `'circle' \| 'square'` | `'circle'` | ✅ |
| `[nzSize]` | 设置头像的大小 | `'large' \| 'small' \| 'default' \| number` | `'default'` | ✅ |
| `[nzSrc]` | 图片类头像的资源地址 | `string` | - |
| `[nzSrcSet]` | 设置图片类头像响应式资源地址 | string | - |
| `[nzAlt]` | 图像无法显示时的替代文本 | string | - |
| `[nzText]` | 文本类头像 | `string` | - |
| `(nzError)` | 图片加载失败的事件，调用 `preventDefault` 方法会阻止组件默认的 fallback 行为 | `EventEmitter<Event>` | - |
