---
category: Components
subtitle: 图片
type: 数据展示
title: Image
cols: 1
experimental: true
description: 实验性的图片组件。
---

## 何时使用

- 需要浏览器优先加载图片时（需要在 SSR 下处理）。
- 需要对高清显示器（如视网膜屏）优化时。
- 使用图片 CDN 服务时。
- 以及 [Image documentation](/components/image/zh) 中的功能
- 下一步计划
  - 添加 [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) 属性及响应式的支持

## API

### nz-image

| 参数           | 说明                                                                                     | 类型               | 默认值                  | 支持全局配置 |
| -------------- | ---------------------------------------------------------------------------------------- | ------------------ | ----------------------- | ------------ |
| `nzSrc`        | url                                                                                      | `string`           | -                       |              |
| `nzAlt`        | alt                                                                                      | `string`           | -                       |              |
| `nzWidth`      | 宽度                                                                                     | `number\|string`   | `auto`                  |              |
| `nzHeight`     | 高度                                                                                     | `number\|string`   | `auto`                  |              |
| `nzAutoSrcset` | 是否优化图片加载                                                                         | `boolean`          | `false`                 | ✅           |
| `nzSrcLoader`  | 加载器                                                                                   | `NzImageSrcLoader` | `defaultImageSrcLoader` | ✅           |
| `nzPriority`   | 是否添加 [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) | `boolean`          | `false`                 |              |

### NzImageSrcLoader

```ts
export type NzImageSrcLoader = (params: { src: string; width: number }) => string;
```

## 注意

### nzSrcLoader

使用 `nzSrcLoader` 可以帮助你填充请求图片的关键信息，例如 `src` 和 `srcset`，默认为：

```ts
export const defaultImageSrcLoader: NzImageSrcLoader = ({ src }) => {
  return src;
};
```

内置的图片 CND 创建方法

```ts
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
export function createAliObjectsLoader(domain: string): NzImageSrcLoader;

/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
export function createImgixLoader(domain: string): NzImageSrcLoader;

/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
export function createCloudinaryLoader(domain: string): NzImageSrcLoader;
```

### 响应式图片和预加载图片

使用响应式图片可以帮助网页在不同的设备上显示良好的效果，预加载图片可以帮助你更快地加载图片，更多信息请参考：

- [preloading responsive images](https://web.dev/preload-responsive-images/)
- [next.js image component and image optimization](https://nextjs.org/docs/basic-features/image-optimization)
