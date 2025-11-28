---
category: Components
type: Data Display
title: Image
cover: 'https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg'
description: Preview-able image.
---

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault-tolerant handling when loading fail.

## API

### [nz-image]

| Property              | Description                                                                                                                                                                                        | Type        | Default | Global Config |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- | ------------- |
| `nzSrc`               | Image path                                                                                                                                                                                         | `string`    | -       | -             |
| `nzFallback`          | Load failure fault-tolerant src                                                                                                                                                                    | `string`    | -       | ✅            |
| `nzPlaceholder`       | Load placeholder src                                                                                                                                                                               | `string`    | -       | ✅            |
| `nzDisablePreview`    | Whether to disable the preview                                                                                                                                                                     | `boolean`   | `false` | ✅            |
| `nzCloseOnNavigation` | Whether to close the image preview when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean`   | `false` | ✅            |
| `nzDirection`         | Text directionality                                                                                                                                                                                | `Direction` | `'ltr'` | ✅            |
| `nzScaleStep`         | `1 + nzScaleStep` is the step to increase or decrease the scale                                                                                                                                    | `number`    | `0.5`   | ✅            |

Other attributes [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### NzImageService

| Property  | Description     | Type                    | Default |
| --------- | --------------- | ----------------------- | ------- |
| `images`  | Preview images  | `NzImage[]`             | -       |
| `options` | Preview options | `NzImagePreviewOptions` | -       |

## Related type definition

### NzImage

| Property | Description | Type     | Default |
| -------- | ----------- | -------- | ------- |
| `src`    | src         | `string` | -       |
| `alt`    | alt         | `string` | -       |
| `width`  | width       | `string` | -       |
| `height` | height      | `string` | -       |

### NzImagePreviewOptions

| Property              | Description                                                                                                                                                                                        | Type      | Default |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `nzKeyboard`          | Whether support press `esc` to close, press `left` or `right` to switch image                                                                                                                      | `boolean` | `true`  |
| `nzMaskClosable`      | Whether to close the image preview when the mask (area outside the image) is clicked                                                                                                               | `boolean` | `true`  |
| `nzCloseOnNavigation` | Whether to close the image preview when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true`  |
| `nzZIndex`            | The z-index of the image preview                                                                                                                                                                   | `number`  | `1000`  |
| `nzZoom`              | Zoom rate                                                                                                                                                                                          | `number`  | `1`     |
| `nzRotate`            | Rotate rate                                                                                                                                                                                        | `number`  | `0`     |
| `nzScaleStep`         | `1 + nzScaleStep` is the step to increase or decrease the scale                                                                                                                                    | `number`  | `0.5`   |
| `nzFlipHorizontally`  | Flip image on horizontal vector                                                                                                                                                                    | `boolean` | `false` |
| `nzFlipVertically`    | Flip image on vertical vector                                                                                                                                                                      | `boolean` | `false` |

### NzImagePreviewRef

| Name                            | Description         |
| ------------------------------- | ------------------- |
| `switchTo(index: number): void` | Switch to index     |
| `prev(): void`                  | Previous image      |
| `next(): void`                  | Next image          |
| `close(): void`                 | Close image preview |

### NzImageGroupComponent

| Property      | Description                                                                                                                     | Type     | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `nzScaleStep` | The value of `nzScaleStep` will be applied to all the images inside, unless an image has its own `nzScaleStep` value specified. | `number` | -       |
