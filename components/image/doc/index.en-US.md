---
category: Components
type: Data Display
title: Image
cover: https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg
---

Previewable image.

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

```ts
import { NzImageModule } from 'ng-zorro-antd/image';
```

## API

### [nz-image]

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| nzSrc | Image path | `string` | - | - |
| nzFallback | Load failure fault-tolerant src | `string` | - | ✅ |
| nzPlaceholder | Load placeholder src | `string` | - | ✅ |
| nzDisablePreview | Whether to disable the preview | `boolean` | `false` | ✅ |
| nzCloseOnNavigation | Close preview while navigating | `boolean` | `false` | ✅ |
| nzDirection | Text directionality | `Direction` | `'ltr'` | ✅ |

Other attributes [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)


### NzImageService

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| images | Preview images | `NzImage[]` | - |
| options | Preview options | `NzImagePreviewOptions` | - |

## Related type definition

### NzImage

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| src | src | `string` | - |
| alt | alt | `string` | - |
| width | width | `string` | - |
| height | height | `string` | - |

### NzImagePreviewOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzKeyboard      | Whether support press `esc` to close | `boolean` | `true` |
| nzMaskClosable      | Whether to close the image preview when the mask (area outside the image) is clicked | `boolean` | `true` |
| nzCloseOnNavigation      | Whether to close the image preview when the navigation history changes | `boolean` | `true` |
| nzZIndex      | The z-index of the image preview | `number` | 1000 |
| nzZoom      | Zoom rate | `number` | 1 |
| nzRotate      | Rotate rate | `number` | 0 |

### NzImagePreviewRef

| Name | Description |
| --- | --- |
| switchTo(index: number): void | Switch to index |
| prev(): void | Previous image |
| next(): void | Next image |
| close(): void | Close image preview |
