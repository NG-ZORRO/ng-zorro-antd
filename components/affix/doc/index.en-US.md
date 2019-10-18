---
category: Components
type: Navigation
title: Affix
---

Make an element stick to viewport.

## When To Use

When user browses a long web page, some content need to stick to the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzAffixModule } from 'ng-zorro-antd/affix';
```

## API

### nz-affix

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzOffsetBottom]` | Pixels to offset from bottom when calculating position of scroll | `number` | - | ✅ |
| `[nzOffsetTop]` | Pixels to offset from top when calculating position of scroll | `number` | `0` | ✅ |
| `[nzTarget]` | specifies the scrollable area dom node | `string \| HTMLElement` | `window` |
| `(nzChange)` | Callback for when affix state is changed | `EventEmitter<boolean>` | - |

**Note:** Children of `nz-affix` can not be `position: absolute`, but you can set `nz-affix` as `position: absolute`:

```jsx
<nz-affix style="position: absolute; top: 10px, left: 10px">
  ...
</nz-affix>
```
