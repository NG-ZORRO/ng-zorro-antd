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

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
```

## API

### nz-carousel

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzAutoPlay]` | Whether to scroll automatically | `boolean` | `false` | ✅ |
| `[nzAutoPlaySpeed]` | Duration (milliseconds), does not scroll when set to 0 | `number` | `3000` | ✅ |
| `[nzDotRender]` | Dot render template | `TemplateRef<{ $implicit: number }>` | - |
| `[nzDotPosition]` | The position of the dots, which can be one of `top` `bottom` `left` `right` | `string` | `bottom` | ✅ |
| `[nzDots]` | Whether to show the dots at the bottom of the gallery | `boolean` | `true` | ✅ |
| `[nzEffect]` | Transition effect | `'scrollx'\|'fade'` | `'scrollx'` | ✅ |
| `[nzEnableSwipe]` | Whether to support swipe gesture | `boolean` | `true` | ✅ |
| `(nzAfterChange)` | Callback function called after the current index changes | `EventEmitter<number>` | - |
| `(nzBeforeChange)` | Callback function called before the current index changes | `EventEmitter{ from: number; to: number }>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| `goTo(slideNumber)` | Change current slide to given slide number |
| `next()` | Change current slide to next slide |
| `pre()` | Change current slide to previous slide |

### InjectionToken

| Token | Description | Parameters | Default Value |
| ----- | --- | ---- | --- |
| `NZ_CAROUSEL_CUSTOM_STRATEGIES` | Provide custom transitioning strategies | `CarouselStrategyRegistryItem[]` | - |

### Customizing transition effects

You can provide strategies that extends `NzCarouselBaseStrategy` to implement custom transition effects.
