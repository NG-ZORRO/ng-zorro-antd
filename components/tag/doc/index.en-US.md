---
category: Components
type: Data Display
title: Tag
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

```ts
import { NzTagModule } from 'ng-zorro-antd/tag';
```

## API

### nz-tag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzMode]` | Mode of tag | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzCloseable]` | Closeable of tag | `boolean` |`false` |
| `[nzCheckable]` | Checkable of tag | `boolean` |`false` |
| `[nzChecked]` | Checked status of Tag, double binding, only works when `[nzCheckable]="true"` | `boolean` | `false` |
| `[nzColor]` | Color of the Tag | `string` | - |
| `(nzOnClose)` | Callback executed when tag is closed, only works when `[nzCloseable]="true"`| `EventEmitter<MouseEvent>` | - |
| `(nzCheckedChange)` | Checked status change call back, only works when `[nzCheckable]="true"` | `EventEmitter<boolean>` | - |
