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

## API

| 参数        | 说明                               | 类型             | 默认值 | 支持全局配置  |
| ----------- | ---------------------------------- | ---------------- | ------ | ----- |
| nzSrc         | 图片地址                           | `string`           | -      | - |
| nzFallback    | 加载失败容错地址                   | `string`           | -      | - |
| nzPlaceholder | 加载占位地址                          | `string`        | -      | - |
| nzDisablePreview     | 是否禁止预览                       | `boolean`          | `false` | ✅ |

其他属性见 [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

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
| nzCloseOnNavigation      | 导航历史变化时是否关闭模态框 | `boolean` | `true` |
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