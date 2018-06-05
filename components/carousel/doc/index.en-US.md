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

### nz-carousel

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAutoPlay]` | Whether to scroll automatically | boolean | `false` |
| `[nzDots]` | Whether to show the dots at the bottom of the gallery | boolean | `true` |
| `[nzEffect]` | Transition effect | `scrollx` ｜ `fade` | `scrollx` |
| `[nzVertical]` | Whether to use a vertical display | boolean | `false` |
| `(nzAfterChange)` | Callback function called after the current index changes | `EventEmitter<number>` | - |
| `(nzBeforeChange)` | Callback function called before the current index changes | `EventEmitter{ from: number; to: number }>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| goTo(slideNumber) | Change current slide to given slide number |
| next() | Change current slide to next slide |
| pre() | Change current slide to previous slide |

