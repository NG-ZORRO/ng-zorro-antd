---
category: Components
type: Data Display
title: Tag
cover: 'https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg'
description: Used for marking and categorization.
---

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## API

### nz-tag

| Property            | Description                                                                 | Type                                      | Default     |
| ------------------- | --------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `[nzMode]`          | Mode of tag                                                                 | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzChecked]`       | Checked status of Tag, double binding, only works when `nzMode="checkable"` | `boolean`                                 | `false`     |
| `[nzColor]`         | Color of the Tag                                                            | `string`                                  | -           |
| `[nzBordered]`      | Whether has border style                                                    | `boolean`                                 | `true`      |
| `(nzOnClose)`       | Callback executed when tag is closed, only works when `nzMode="closable"`   | `EventEmitter<MouseEvent>`                | -           |
| `(nzCheckedChange)` | Checked status change call back, only works when `nzMode="checkable"`       | `EventEmitter<boolean>`                   | -           |
