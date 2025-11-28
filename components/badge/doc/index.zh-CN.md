---
category: Components
subtitle: 徽标数
type: 数据展示
title: Badge
cover: 'https://gw.alipayobjects.com/zos/antfincdn/6%26GF9WHwvY/Badge.svg'
description: 图标右上角的圆形徽标数字。
---

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## API

### nz-badge

| 参数                | 说明                                                                         | 类型                                                             | 默认值      | 全局配置 |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------- | -------- |
| `[nzStandalone]`    | 是否独立使用                                                                 | `boolean`                                                        | -           | -        |
| `[nzColor]`         | 自定义小圆点的颜色                                                           | `string`                                                         | -           | ✅       |
| `[nzCount]`         | 展示的数字，大于 nzOverflowCount 时显示为 `${nzOverflowCount}+`，为 0 时隐藏 | `number \| TemplateRef<void>`                                    | -           |
| `[nzDot]`           | 不展示数字，只有一个小红点                                                   | `boolean`                                                        | `false`     |
| `[nzShowDot]`       | 是否展示小红点                                                               | `boolean`                                                        | `true`      |
| `[nzOverflowCount]` | 展示封顶的数字值                                                             | `number`                                                         | `99`        | ✅       |
| `[nzShowZero]`      | 当数值为 0 时，是否展示 Badge                                                | `boolean`                                                        | `false`     |
| `[nzSize]`          | 在设置了 `nzCount` 的前提下有效，设置小圆点的大小                            | `'default' \| 'small'`                                           | `'default'` |
| `[nzStatus]`        | 设置 `nz-badge` 为状态点                                                     | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | -           |
| `[nzText]`          | 在设置了 `nzStatus` 的前提下有效，设置状态点的文本                           | `string \| TemplateRef<void>`                                    | -           |
| `[nzTitle]`         | 设置鼠标放在状态点上时显示的文字 (非独立使用时), 为 `null` 时隐藏            | `string \| null`                                                 | `nzCount`   |
| `[nzOffset]`        | 设置状态点的位置偏移，格式为 `[x, y]` (非独立使用时)                         | `[number, number]`                                               | -           |

### nz-ribbon

| 参数            | 说明             | 类型                          | 默认值  |
| --------------- | ---------------- | ----------------------------- | ------- |
| `[nzColor]`     | 自定义缎带的颜色 | `string`                      | -       |
| `[nzPlacement]` | 缎带的位置       | `'start' \| 'end'`            | `'end'` |
| `[nzText]`      | 缎带中填入的内容 | `string \| TemplateRef<void>` | -       |
