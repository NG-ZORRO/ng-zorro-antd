---
category: Components
type: Plus
title: Resize
---

Resize component.

## When To Use

- Distribute space for two elements in the same container.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzResizeModule } from 'ng-zorro-antd/resize';
```

## API

### nz-resize

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzBaseElement]` | It's container element | `ElementRef` | - |
| `[nzShowBorder]` | Show a strike through line | `boolean` | `false` |
| `[nzMode]` | Vertical or horizontal | `'vertical'` \| `'horizontal'` | `'vertical'` | 
| `[nzHidden]` | Hide itself | `boolean` | false |
| `[nzMin]` | The minimum value of `nzLeft` or `nzTop` | `number` | `0` |
| `[nzMax]` | The maximum value of `nzLeft` or `nzTop` | `number` | `560` |
| `[nzTop]` | Top to its container element (only working when `nzMode` is `horizontal`) | `number` | - |
| `[nzLeft]` | Left to its container element (only working when `nzMode` is `vertical`) | `number` | - |
| `[nzLazy]` | Enable lazy mode | `boolean` | `false` |
| `(nzResizeStart)` | Emit the position when resizing starts  | `NzResizePosition` | - |
| `(nzResizeChange)` | Emit the position when resizing changes  | `NzResizePosition` | - |
| `(nzResizeEnd)` | Emit the position when resizing ends  | `NzResizePosition` | - |

### Lazy mode

In lazy mode, `nzResizeChange` would not emit events when the user is dragging but displays a dotted line. And it only emits when user stops dragging.
