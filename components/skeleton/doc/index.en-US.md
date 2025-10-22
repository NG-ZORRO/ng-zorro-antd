---
category: Components
type: Feedback
title: Skeleton
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/KpcciCJgv/Skeleton.svg'
description: Provide a placeholder while you wait for content to load or visualize content that doesn't exist yet.
---

## When To Use

- When resource needs long time loading, like low network speed.
- The component contains information, such as a List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation but can provide a better user experience.

## API

### nz-skeleton

| Property        | Description                                         | Type                             | Default |
| --------------- | --------------------------------------------------- | -------------------------------- | ------- |
| `[nzActive]`    | Show animation effect                               | `boolean`                        | `false` |
| `[nzAvatar]`    | Show avatar placeholder                             | `boolean \| NzSkeletonAvatar`    | `false` |
| `[nzLoading]`   | Display the skeleton when `true`                    | `boolean`                        | -       |
| `[nzParagraph]` | Show the paragraph placeholder                      | `boolean \| NzSkeletonParagraph` | `true`  |
| `[nzTitle]`     | Show the title placeholder                          | `boolean \| NzSkeletonTitle`     | `true`  |
| `[nzRound]`     | Show the paragraph and the title radius when `true` | `boolean`                        | `false` |

### NzSkeletonAvatar

| Property | Description          | Type                                        | Default |
| -------- | -------------------- | ------------------------------------------- | ------- |
| `size`   | Set the avatar size  | `number \| 'large' \| 'small' \| 'default'` | -       |
| `shape`  | Set the avatar shape | `'circle' \| 'square'`                      | -       |

### NzSkeletonTitle

| Property | Description         | Type               | Default |
| -------- | ------------------- | ------------------ | ------- |
| `width`  | Set the title width | `number \| string` | -       |

### NzSkeletonParagraph

| Property | Description                                                                                                                      | Type                                          | Default |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------- |
| `rows`   | Set the row count of the paragraph                                                                                               | `number`                                      | -       |
| `width`  | Set the width of the paragraph. When width is an Array, it can set the width of each row. Otherwise, only set the last row width | `number \| string \| Array<number \| string>` | -       |

### nz-skeleton-element [nzType="button"]

| Property     | Description           | Type                                           | Default     |
| ------------ | --------------------- | ---------------------------------------------- | ----------- |
| `[nzActive]` | Show animation effect | `boolean`                                      | `false`     |
| `[nzSize]`   | Set the size          | `'large' \| 'small' \| 'default'`              | `'default'` |
| `[nzShape]`  | Set the shape         | `'square' \| 'circle' \| 'round' \| 'default'` | `'default'` |

### nz-skeleton-element [nzType="avatar"]

| Property     | Description           | Type                                        | Default     |
| ------------ | --------------------- | ------------------------------------------- | ----------- |
| `[nzActive]` | Show animation effect | `boolean`                                   | `false`     |
| `[nzSize]`   | Set the size          | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| `[nzShape]`  | Set the shape         | `'circle' \| 'square'`                      | `'square'`  |

### nz-skeleton-element [nzType="input"]

| Property     | Description           | Type                              | Default     |
| ------------ | --------------------- | --------------------------------- | ----------- |
| `[nzActive]` | Show animation effect | `boolean`                         | `false`     |
| `[nzSize]`   | Set the size          | `'large' \| 'small' \| 'default'` | `'default'` |

### nz-skeleton-element [nzType="image"]

| Property     | Description           | Type      | Default |
| ------------ | --------------------- | --------- | ------- |
| `[nzActive]` | Show animation effect | `boolean` | `false` |
