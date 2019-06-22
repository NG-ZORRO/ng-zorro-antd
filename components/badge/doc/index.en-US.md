---
category: Components
type: Data Display
title: Badge
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## API

```html
<nz-badge [nzCount]="5">
  <a class="head-example"></a>
</nz-badge>
```

```html
<nz-badge [nzCount]="5"></nz-badge>
```

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzBadgeModule } from 'ng-zorro-antd';
```

### nz-badge

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzColor]` | Customize Badge dot color | string | - |
| `[nzCount]` | Number to show in badge | `number \| TemplateRef<void>` | - |
| `[nzDot]` | Whether to display a red dot instead of `count` | `boolean` | `false` |
| `[nzShowDot]` | Whether to display the red dot | `boolean` | `true` |
| `[nzOverflowCount]` | Max count to show | `number` | `99` |
| `[nzShowZero]` | Whether to show badge when `count` is zero | `boolean` | `false` |
| `[nzStatus]` | Set `nz-badge` as a status dot | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `[nzText]` | If `nzStatus` is set, `text` sets the display text of the status `dot` | `string` | - |
