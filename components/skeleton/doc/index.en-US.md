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
| `size` | Set the size of avatar | `number |\ 'large' \| 'small' \| 'default'` | - |
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

### nz-skeleton-element [nzType="button"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzActive]` | Show animation effect | `boolean` | `false` |
| `[nzSize]` | Set the size | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzShape]` | Set the shape | `'circle' \| 'round' \| 'default'` | `'default'` |

### nz-skeleton-element [nzType="avatar"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzActive]` | Show animation effect | `boolean` | `false` |
| `[nzSize]` | Set the size | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| `[nzShape]` | Set the shape | `'circle' \| 'square'` | `'square'` |

### nz-skeleton-element [nzType="input"]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzActive]` | Show animation effect | `boolean` | `false` |
| `[nzSize]` | Set the size | `'large' \| 'small' \| 'default'` | `'default'` |
