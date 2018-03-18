---
category: Components
type: Data Display
title: Tag
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## API

### Tag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzMode | Mode of tag | `'closeable'丨'default'丨'checkable'` | `default` |
| nzAfterClose | Callback executed when close animation is completed, only works when `nzMode="closable"` | () => void | - |
| nzOnClose | Callback executed when tag is closed, only works when `nzMode="closable"`| (e:MouseEvent) => void | - |
| nzChecked | Checked status of Tag, double binding, only works when `nzMode="checkable"` | boolean | `false` |
| nzCheckedChange | Checked status change call back, only works when `nzMode="checkable"` | (nzChecked:boolean)=>{} | - |
| nzColor | Color of the Tag | string | - |
