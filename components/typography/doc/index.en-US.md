---
category: Components
type: General
title: Typography
cols: 1
---

Basic text writing, including headings, body text, lists, and more.

## When To Use

- When need to display title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### [nz-typography]

> `p[nz-paragraph]`, `span[nz-text]`, `h1[nz-title]`, `h2[nz-title]`, `h3[nz-title]`, `h4[nz-title]` are used in the same way as the `[nz-typography]`

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzContent]` | Component content | `string` | - ||
| `[nzCopyable]` | Can copy, require use `[nzContent]` | `boolean` | `false` ||
| `[nzEditable]` | Editable, require use `[nzContent]` | `boolean` | `false` ||
| `[nzEllipsis]` | Display ellipsis when overflow, require use `[nzContent]` when dynamic content | `boolean` | `false` ||
| `[nzCopyText]` | Customize the copy text | `string` | - ||
| `[nzDisabled]` | Disable content | `boolean` | `false` ||
| `[nzExpandable]` | Expandable when ellipsis | `boolean` | `false` ||
| `[nzEllipsisRows]` | Line number | `number` | `1` | ✅ |
| `[nzType]` | Content type | `'secondary'｜'warning'｜'danger'` | - ||
| `(nzContentChange)` | Trigger when user edit the content | `EventEmitter<string>` | - ||
| `(nzExpandChange)` | Trigger when user expanded the content | `EventEmitter<void>` | - ||