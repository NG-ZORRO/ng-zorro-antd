---
category: Components
type: Feedback
title: Skeleton
cols: 1
---

Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet.

## When To Use

- When resource need long time loading, like low network speed.
- The component contains much information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
```

## API

### nz-skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzActive]` | Show animation effect | `boolean` | `false` |
| `[nzAvatar]` | Show avatar placeholder | `boolean \| NzSkeletonAvatar` | `false` |
| `[nzLoading]` | Display the skeleton when `true` | `boolean` | - |
| `[nzParagraph]` | Show paragraph placeholder | `boolean \| NzSkeletonParagraph` | `true` |
| `[nzTitle]` | Show title placeholder | `boolean \| NzSkeletonTitle` | `true` |


### NzSkeletonAvatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `size` | Set the size of avatar | `'large' \| 'small' \| 'default'` | - |
| `shape` | Set the shape of avatar | `'circle' \| 'square'` | - |

### NzSkeletonTitle

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `width` | Set the width of title | `number \| string` | - |

### NzSkeletonParagraph

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `rows` | Set the row count of paragraph | `number` | - |
| `width` | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | `number \| string \| Array<number \| string>` | - |