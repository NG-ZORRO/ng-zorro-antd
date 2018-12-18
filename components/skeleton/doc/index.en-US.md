---
category: Components
type: Feedback
title: Skeleton
cols: 1
---

Provide a placeholder at the place which need waiting for loading.

## When To Use

- When resource need long time loading, like low network speed.
- The component contains much information, such as List or Card.

## API

### nz-skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzActive]` | Show animation effect | boolean | false |
| `[nzAvatar]` | Show avatar placeholder | boolean ｜ NzSkeletonAvatar | false |
| `[nzLoading]` | Display the skeleton when `true` | boolean | - |
| `[nzParagraph]` | Show paragraph placeholder | boolean ｜ NzSkeletonParagraph | true |
| `[nzTitle]` | Show title placeholder | boolean ｜ NzSkeletonTitle | true |


### NzSkeletonAvatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `size` | Set the size of avatar | Enum{ 'large', 'small', 'default' } | - |
| `shape` | Set the shape of avatar | Enum{ 'circle', 'square' } | - |

### NzSkeletonTitle

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `width` | Set the width of title | number ｜ string | - |

### NzSkeletonParagraph

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `rows` | Set the row count of paragraph | number | - |
| `width` | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number ｜ string ｜ Array<number ｜ string> | - |