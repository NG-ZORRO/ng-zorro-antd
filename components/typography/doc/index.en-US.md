---
category: Components
type: General
title: Typography
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/GOM1KQ24O/Typography.svg'
description: Basic text writing, including headings, body text, lists, and more.
---

## When To Use

- When need to display title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### [nz-typography]

| Property            | Description                                                                    | Type                                                                 | Default             | Global Config |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------- | ------------- |
| `[nzContent]`       | Component content                                                              | `string`                                                             | -                   |               |
| `[nzCopyable]`      | Can copy, require use `[nzContent]`                                            | `boolean`                                                            | `false`             |               |
| `[nzEditable]`      | Editable, require use `[nzContent]`                                            | `boolean`                                                            | `false`             |               |
| `[nzCopyIcons]`     | Custom copy icons                                                              | `[string \| TemplateRef<void>, string \| TemplateRef<void>]`         | `['copy', 'check']` | ✅            |
| `[nzCopyTooltips]`  | Custom tooltips text, hide when it is `null`                                   | `null \| [string \| TemplateRef<void>, string \| TemplateRef<void>]` | -                   | ✅            |
| `[nzEditIcon]`      | Custom edit icon                                                               | `string \| TemplateRef<void>`                                        | `'edit'`            | ✅            |
| `[nzEditTooltip]`   | Custom tooltip text, hide when it is `null`                                    | `null \| string \| TemplateRef<void>`                                | -                   | ✅            |
| `[nzEllipsis]`      | Display ellipsis when overflow, require use `[nzContent]` when dynamic content | `boolean`                                                            | `false`             |               |
| `[nzSuffix]`        | The text suffix when used `nzEllipsis`                                         | `string`                                                             | -                   |               |
| `[nzCopyText]`      | Customize the copy text                                                        | `string`                                                             | -                   |               |
| `[nzDisabled]`      | Disable content                                                                | `boolean`                                                            | `false`             |               |
| `[nzExpandable]`    | Expandable when ellipsis                                                       | `boolean`                                                            | `false`             |               |
| `[nzEllipsisRows]`  | Line number                                                                    | `number`                                                             | `1`                 | ✅            |
| `[nzType]`          | Content type                                                                   | `'secondary' \| 'warning' \| 'danger' \| 'success'`                  | -                   |               |
| `(nzContentChange)` | Trigger when user edit the content                                             | `EventEmitter<string>`                                               | -                   |               |
| `(nzExpandChange)`  | Trigger when user expanded the content                                         | `EventEmitter<void>`                                                 | -                   |               |
| `(nzOnEllipsis)`    | Trigger when ellipsis status changed                                           | `EventEmitter<boolean>`                                              | -                   |               |
