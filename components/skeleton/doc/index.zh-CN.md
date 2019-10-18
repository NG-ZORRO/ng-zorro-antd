---
category: Components
subtitle: 骨架屏
type: 反馈
title: Skeleton
cols: 1
---

在需要等待加载内容的位置提供一个占位图形组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只适合用在第一次加载数据的场景。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
```

## API

### nz-skeleton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzActive]` | 是否展示动画效果 | `boolean` | `false` |
| `[nzAvatar]` | 是否显示头像占位图 | `boolean \| NzSkeletonAvatar` | `false` |
| `[nzLoading]` | 为 `true` 时，显示占位图。反之则直接展示子组件 | `boolean` | - |
| `[nzParagraph]` | 是否显示段落占位图 | `boolean \| NzSkeletonParagraph` | `true` |
| `[nzTitle]` | 是否显示标题占位图 | `boolean \| NzSkeletonTitle` | `true` |

### NzSkeletonAvatar

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 设置头像占位图的大小 | `'large' \| 'small' \| 'default'` | - |
| `shape` | 指定头像的形状 | `'circle' \| 'square'` | - |

### NzSkeletonTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 设置标题占位图的宽度 | `number \| string` | - |

### NzSkeletonParagraph

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 设置段落占位图的行数 | `number` | - |
| `width` | 设置标题占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | `number \| string \| Array<number \| string>` | - |