---
category: Components
type: Data Display
title: Avatar
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
```

## API

### nz-avatar

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzIcon]` | the `Icon` type for an icon avatar, see `Icon` | `string` | - |
| `[nzShape]` | the shape of avatar | `'circle' \| 'square'` | `'circle'` | ✅ |
| `[nzSize]` | the size of the avatar | `'large' \| 'small' \| 'default' \| number` | `'default'` | ✅ |
| `[nzSrc]` | the address of the image for an image avatar | `string` | - |
| `[nzSrcSet]` | a list of sources to use for different screen resolutions | string | - |
| `[nzAlt]` | This attribute defines the alternative text describing the image | string | - |
| `[nzText]` | letter type avatar | `string` | - |
| `(nzError)` | handler when img load error, call the `preventDefault` method to prevent default fallback behavior | `EventEmitter<Event>` | - |
