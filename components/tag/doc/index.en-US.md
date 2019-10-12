---
category: Components
type: Data Display
title: Tag
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTagModule } from 'ng-zorro-antd/tag';
```

## API

### Tag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzMode]` | Mode of tag | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzChecked]` | Checked status of Tag, double binding, only works when `nzMode="checkable"` | `boolean` | `false` |
| `[nzColor]` | Color of the Tag | `string` | - |
| `(nzOnClose)` | Callback executed when tag is closed, only works when `nzMode="closable"`| `EventEmitter<MouseEvent>` | - |
| `(nzCheckedChange)` | Checked status change call back, only works when `nzMode="checkable"` | `EventEmitter<boolean>` | - |
