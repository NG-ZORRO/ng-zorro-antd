---
category: Components
subtitle: 图片
type: 数据展示
title: Image
cover: https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg
---

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载大图时渐进加载或加载失败时容错处理。

```ts
import { NzImageModule } from 'ng-zorro-antd/image';
```

## API

### [nz-image]

| 参数        | 说明                               | 类型             | 默认值 | 支持全局配置  |
| ----------- | ---------------------------------- | ---------------- | ------ | ----- |
| nzSrc | url | `string` | - | |
| nzFallback | 加载失败容错地址 | `string` | - | ✅ |
| nzPlaceholder | 加载占位地址 | `string` | - | ✅ |
| nzDisablePreview | 是否禁止预览 | `boolean` | `false` | ✅ |
| nzCloseOnNavigation | 当用户在历史中前进/后退时是否关闭预览。注意，这通常不包括点击链接（除非用户使用HashLocationStrategy）。 | `boolean` | `false` | ✅ |
| nzDirection | 文字方向 | `Direction` | `'ltr'` | ✅ |

其他属性见 [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### nz-image

| 参数        | 说明                               | 类型             | 默认值 | 支持全局配置  |
| --- | --- | --- | --- | --- |
|nzSrc | url | `string` | - | |
|nzAlt | alt | `string` | - | |
|nzWidth | 宽度 | `number\|string` | `auto` | |
|nzHeight | 高度 | `number\|string` | `auto` | |
|nzLoader | 图片加载器 | `NzImageLoader` | `defaultLoader` | ✅ |
|nzOptimize | 是否优化图片加载 | `boolean` | `false` | ✅ |
|nzPreload | 是否预加载图片 | `boolean` | `false` | ✅ |
|nzOptimizeSizes | 优化加载尺寸 | `number[]` | `[16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]` | ✅ |

### NzImageService

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 预览图片 | `NzImage[]` | - |
| options | 预览参数 | `NzImagePreviewOptions` | - |

## 相关类型定义

### NzImage

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | src | `string` | - |
| alt | alt | `string` | - |
| width | 图片宽度 | `string` | - |
| height | 图片高度 | `string` | - |

### NzImagePreviewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzKeyboard      | 是否支持键盘 esc 关闭 | `boolean` | `true` |
| nzMaskClosable      | 点击蒙层是否允许关闭 | `boolean` | `true` |
| nzCloseOnNavigation      | 当用户在历史中前进/后退时是否关闭预览。注意，这通常不包括点击链接（除非用户使用HashLocationStrategy）。 | `boolean` | `true` |
| nzZIndex      | 设置预览层的 z-index | `number` | 1000 |
| nzZoom      | 缩放比例 | `number` | 1 |
| nzRotate      | 旋转角度 | `number` | 0 |

### NzImagePreviewRef

| 名称 | 描述 |
| --- | --- |
| switchTo(index: number): void | 设置预览索引 |
| prev(): void | 上一张 |
| next(): void | 下一张 |
| close(): void | 关闭预览 |

### NzImageLoader
```ts
export type NzImageLoader = (params: { src: string; width: number }) => string;

export const defaultLoader: NzImageLoader = ({ src }) => {
  return encodeURIComponent(src);
};
```