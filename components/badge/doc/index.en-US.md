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
<nz-badge [nzCount]="5" nzStandalone></nz-badge>
```

### nz-badge

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzStandalone]` | Whether standalone mode | `boolean` | - | - |
| `[nzColor]` | Customize Badge dot color | string | - | ✅ |
| `[nzCount]` | Number to show in badge | `number \| TemplateRef<void>` | - |
| `[nzDot]` | Whether to display a red dot instead of `count` | `boolean` | `false` |
| `[nzShowDot]` | Whether to display the red dot | `boolean` | `true` |
| `[nzOverflowCount]` | Max count to show | `number` | `99` | ✅ |
| `[nzShowZero]` | Whether to show badge when `count` is zero | `boolean` | `false` |
| `[nzStatus]` | Set `nz-badge` as a status dot | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `[nzText]` | If `nzStatus` is set, `text` sets the display text of the status `dot` | `string \| TemplateRef<void>` | - |
| `[nzTitle]` | Text to show when hovering over the badge（Only Non-standalone), hide when value is `null` | `string \| null` | `nzCount` |
| `[nzOffset]` | set offset of the badge dot, like[x, y] (Only Non-standalone) | `[number, number]` | - |


### nz-ribbon

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzColor | Customize Ribbon color | `string` | - |
| nzPlacement | The placement of the Ribbon | `start` \| `end` | `end` |
| nzText | Content inside the Ribbon | `string \| TemplateRef<void>` | - |  |