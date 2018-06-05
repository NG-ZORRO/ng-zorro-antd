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

### nz-badge

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzCount]` | Number to show in badge | number |  |
| `[nzDot]` | Whether to display a red dot instead of `count` | boolean | `false` |
| `[nzOverflowCount]` | Max count to show | number | 99 |
| `[nzShowZero]` | Whether to show badge when `count` is zero | boolean | `false` |
| `[nzStatus]` | Set `nz-badge` as a status dot | `success` ｜ `processing` ｜ `default` ｜ `error` ｜ `warning` | `''` |
| `[nzText]` | If `nzStatus` is set, `text` sets the display text of the status `dot` | string | `''` |
