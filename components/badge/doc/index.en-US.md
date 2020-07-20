---
category: Components
type: Data Display
title: Badge
cover: https://gw.alipayobjects.com/zos/antfincdn/6%26GF9WHwvY/Badge.svg
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

```ts
import { NzBadgeModule } from 'ng-zorro-antd/badge';
```

## API

```html
<nz-badge [nzCount]="5">
  <a class="head-example"></a>
</nz-badge>
```

```html
<nz-badge [nzCount]="5"></nz-badge>
```

### nz-badge

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzColor]` | Customize Badge dot color | string | - | ✅ |
| `[nzCount]` | Number to show in badge | `number \| TemplateRef<void>` | - |
| `[nzDot]` | Whether to display a red dot instead of `count` | `boolean` | `false` |
| `[nzShowDot]` | Whether to display the red dot | `boolean` | `true` |
| `[nzOverflowCount]` | Max count to show | `number` | `99` | ✅ |
| `[nzShowZero]` | Whether to show badge when `count` is zero | `boolean` | `false` |
| `[nzStatus]` | Set `nz-badge` as a status dot | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `[nzText]` | If `nzStatus` is set, `text` sets the display text of the status `dot` | `string` | - |
| `[nzTitle]` | Text to show when hovering over the badge（Only Non-standalone), hide when value is `null` | `string \| null` | `nzCount` |
| `[nzOffset]` | set offset of the badge dot, like[x, y] (Only Non-standalone) | `[number, number]` | - |
