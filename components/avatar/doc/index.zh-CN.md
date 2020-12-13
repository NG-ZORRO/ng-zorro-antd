---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
cover: https://gw.alipayobjects.com/zos/antfincdn/aBcnbw68hP/Avatar.svg
---

用来代表用户或事物，支持图片、图标或字符展示。

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
| `[nzGap]` | 字符类型距离左右两侧边界单位像素 | `number` | `4` | ✅ |
| `[nzSrc]` | 图片类头像的资源地址 | `string` | - |
| `[nzSrcSet]` | 设置图片类头像响应式资源地址 | string | - |
| `[nzAlt]` | 图像无法显示时的替代文本 | string | - |
| `[nzText]` | 文本类头像 | `string` | - |
| `(nzError)` | 图片加载失败的事件，调用 `preventDefault` 方法会阻止组件默认的 fallback 行为 | `EventEmitter<Event>` | - |

### nz-avatar-group

```html
 <nz-avatar-group>
  <nz-avatar nzIcon="user"></nz-avatar>
  ...
</nz-avatar-group>
```
