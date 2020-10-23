---
category: Components
type: Data Display
title: Avatar
cover: https://gw.alipayobjects.com/zos/antfincdn/aBcnbw68hP/Avatar.svg
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

```ts
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
```

## API

### nz-avatar

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzIcon]` | The `Icon` type for an icon avatar, see `Icon` | `string` | - |
| `[nzShape]` | The shape of avatar | `'circle' \| 'square'` | `'circle'` | ✅ |
| `[nzSize]` | The size of the avatar | `'large' \| 'small' \| 'default' \| number` | `'default'` | ✅ |
| `[nzGap]` | Letter type unit distance between left and right sides | `number` | `4` | ✅ |
| `[nzSrc]` | The address of the image for an image avatar | `string` | - |
| `[nzSrcSet]` | a list of sources to use for different screen resolutions | string | - |
| `[nzAlt]` | This attribute defines the alternative text describing the image | string | - |
| `[nzText]` | Letter type avatar | `string` | - |
| `(nzError)` | Handler when img load error, call the `preventDefault` method to prevent default fallback behavior | `EventEmitter<Event>` | - |

### nz-avatar-group

```html
 <nz-avatar-group>
  <nz-avatar nzIcon="user"></nz-avatar>
  ...
</nz-avatar-group>
```
