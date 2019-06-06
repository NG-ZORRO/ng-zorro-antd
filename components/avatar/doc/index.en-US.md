---
category: Components
type: Data Display
title: Avatar
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzAvatarModule } from 'ng-zorro-antd';
```

### nz-avatar

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzIcon]` | the `Icon` type for an icon avatar, see `Icon` | `string` | - |
| `[nzShape]` | the shape of avatar | `'circle'｜'square'` | `'circle'` |
| `[nzSize]` | the size of the avatar | `'large'｜'small'｜'default'｜number` | `'default'` |
| `[nzSrc]` | the address of the image for an image avatar | `string` | - |
| `[nzText]` | letter type avatar | `string` | - |
