---
category: Components
type: Data Display
title: Avatar
cover: 'https://gw.alipayobjects.com/zos/antfincdn/aBcnbw68hP/Avatar.svg'
description: Used to represent users or things, supporting the display of images, icons, or characters.
---

## API

### nz-avatar

| Property            | Description                                                                                                                                                     | Type                                        | Default     | Global Config |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------- | ------------- |
| `[nzIcon]`          | The `Icon` type for an icon avatar, see `Icon`                                                                                                                  | `string`                                    | -           |
| `[nzShape]`         | The shape of avatar                                                                                                                                             | `'circle' \| 'square'`                      | `'circle'`  | ✅            |
| `[nzSize]`          | The size of the avatar                                                                                                                                          | `'large' \| 'small' \| 'default' \| number` | `'default'` | ✅            |
| `[nzGap]`           | Letter type unit distance between left and right sides                                                                                                          | `number`                                    | `4`         | ✅            |
| `[nzSrc]`           | Avatar image URL                                                                                                                                                | `string`                                    | -           |
| `[nzSrcSet]`        | a list of sources to use for different screen resolutions                                                                                                       | `string`                                    | -           |
| `[nzAlt]`           | This attribute defines the alternative text describing the image                                                                                                | `string`                                    | -           |
| `[nzText]`          | Letter type avatar                                                                                                                                              | `string`                                    | -           |
| `[nzLoading]`       | Sets the native [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading) attribute on the avatar image element             | `'eager' \| 'lazy'`                         | `'eager'`   |               |
| `[nzFetchPriority]` | Sets the native [`fetchpriority`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#fetchpriority) attribute on the avatar image element | `'high' \| 'low' \| 'auto'`                 | `'auto'`    |               |
| `(nzError)`         | Handler when img load error, call the `preventDefault` method to prevent default fallback behavior                                                              | `EventEmitter<Event>`                       | -           |

### nz-avatar-group

```html
<nz-avatar-group>
  <nz-avatar nzIcon="user"></nz-avatar>
  <!--  ...  -->
</nz-avatar-group>
```
