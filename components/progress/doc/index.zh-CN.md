---
category: Components
subtitle: 进度条
type: 反馈
title: Progress
cover: 'https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg'
description: 展示操作的当前进度。
---

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；
- 当需要显示一个操作完成的百分比时。

## API

### nz-progress

各类型通用的属性。

| 属性                 | 说明                         | 类型                                                                                   | 默认值                     | 全局配置 |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------- | -------------------------- | -------- |
| `[nzType]`           | 类型                         | `'line' \| 'circle' \| 'dashboard'`                                                    | `'line'`                   |          |
| `[nzFormat]`         | 内容的模板函数               | `(percent: number) => string \| TemplateRef<{ $implicit: number }>`                    | `percent => percent + '%'` |
| `[nzPercent]`        | 百分比                       | `number`                                                                               | `0`                        |          |
| `[nzShowInfo]`       | 是否显示进度数值或状态图标   | `boolean`                                                                              | `true`                     | ✅       |
| `[nzStatus]`         | 状态                         | `'success' \| 'exception' \| 'active' \| 'normal'`                                     | -                          |          |
| `[nzStrokeLinecap]`  | 进度条端点形状               | `'round' \| 'square'`                                                                  | `'round'`                  | ✅       |
| `[nzStrokeColor]`    | 进度条颜色，传入对象时为渐变 | `string \| { from: string; to: string: direction: string; [percent: string]: string }` | -                          | ✅       |
| `[nzSuccessPercent]` | 已完成的分段百分比           | `number`                                                                               | 0                          |          |

### `nzType="line"`

| 属性              | 说明                    | 类型     | 默认值 |
| ----------------- | ----------------------- | -------- | ------ |
| `[nzStrokeWidth]` | 进度条线的宽度，单位 px | `number` | `8`    |
| `[nzSteps]`       | 进度条总共步数          | `number` | -      |

### `nzType="circle"`

| 属性              | 说明                                             | 类型     | 默认值 | 全局配置 |
| ----------------- | ------------------------------------------------ | -------- | ------ | -------- |
| `[nzWidth]`       | 圆形进度条画布宽度，单位 px                      | `number` | `132`  |          |
| `[nzStrokeWidth]` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | `number` | `6`    | ✅       |

### `nzType="dashboard"`

| 属性              | 说明                                               | 类型                                     | 默认值  | 全局配置 |
| ----------------- | -------------------------------------------------- | ---------------------------------------- | ------- | -------- |
| `[nzWidth]`       | 仪表盘进度条画布宽度，单位 px                      | `number`                                 | `132`   |          |
| `[nzStrokeWidth]` | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | `number`                                 | `6`     | ✅       |
| `[nzGapDegree]`   | 仪表盘进度条缺口角度，可取值 0 ~ 360               | `number`                                 | `0`     | ✅       |
| `[nzGapPosition]` | 仪表盘进度条缺口位置                               | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | ✅       |
