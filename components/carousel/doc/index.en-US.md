---
category: Components
type: Data Display
title: Carousel
---

A carousel component. Scales with its container.

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzCarouselModule } from 'ng-zorro-antd';
```

### nz-carousel

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAutoPlay]` | Whether to scroll automatically | `boolean` | `false` |
| `[nzAutoPlaySpeed]` | Duration (milliseconds), does not scroll when set to 0 | `number` | `3000` |
| `[nzDots]` | Whether to show the dots at the bottom of the gallery | `boolean` | `true` |
| `[nzDotRender]` | Dot render template | `TemplateRef<{ $implicit: number }>` | - |
| `[nzEffect]` | Transition effect | `'scrollx'｜'fade'` | `'scrollx'` |
| `[nzVertical]` | Whether to use a vertical display | `boolean` | `false` |
| `(nzAfterChange)` | Callback function called after the current index changes | `EventEmitter<number>` | - |
| `(nzBeforeChange)` | Callback function called before the current index changes | `EventEmitter{ from: number; to: number }>` | - |
| `[nzEnableSwipe]` | Whether to support swipe gesture | `boolean` | `true` |

#### Methods

| Name | Description |
| ---- | ----------- |
| goTo(slideNumber) | Change current slide to given slide number |
| next() | Change current slide to next slide |
| pre() | Change current slide to previous slide |

