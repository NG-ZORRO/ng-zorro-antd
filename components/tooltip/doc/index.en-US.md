---
category: Components
type: Data Display
title: Tooltip
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

```ts
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
```

## API

### [nz-tooltip]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzTooltipArrowPointAtCenter]` | Arrow point at center of the origin | `boolean` | `false` |
| `[nzTooltipTitle]` | The text shown in the tooltip | `string \| TemplateRef<void>` | - |
| `[nzTooltipTrigger]` | Tooltip trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[nzTooltipPlacement]` | The position of the tooltip relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'`   |
| `[nzTooltipColor]` | The background color | `string` | - |
| `[nzTooltipOrigin]` | Origin of the tooltip | `ElementRef` | - |
| `[nzTooltipVisible]` | Show or hide tooltip | `boolean` | `false` |
| `(nzTooltipVisibleChange)` | Callback of hide or show | `EventEmitter<boolean>` | - |
| `[nzTooltipMouseEnterDelay]` | Delay in seconds, before tooltip is shown on mouse enter | `number` | `0.15` |
| `[nzTooltipMouseLeaveDelay]` | Delay in seconds, before tooltip is hidden on mouse leave | `number` | `0.1` |
| `[nzTooltipOverlayClassName]` | Class name of the tooltip card | `string` | - |
| `[nzTooltipOverlayStyle]` | Style of the tooltip card | `object` | - |

### Common API

The following APIs are shared by `nz-tooltip`, `nz-popconfirm`, `nz-popover`.

| Method | Description |
| --- | --- |
| `show` | Show |
| `hide` | Hide |
| `updatePosition` | Update position |

## Exclude body element's scroll event need to refresh the position of CDK

In the usage of tooltip (including popconfirm、popover), body element's scroll event will update the position of tooltip. It will never update the position of tooltip if the scroll event happens in a custom element. You can add `cdkScrollable` directive to achieve the goal. Take notice that you need to import relative package `import {ScrollingModule} from '@angular/cdk/scrolling';`, for more information you can visit [scrolling/api](https://material.angular.io/cdk/scrolling/api).

## Note

Please ensure that the node of `[nz-tooltip]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
