---
category: Components
subtitle: 时间范围选择器
type: 数据录入
title: Time Range
cols: 1
experimental: true
---

时间范围组件。

## 何时使用

- 需要选择一段时间范围
- 需要得到一段自动刷新，截止时间为当前时间的时间范围

## API

### nz-time-range

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowAutoRefresh]` | 支持自动刷新 | `boolean` | `false` |
| `[nzAutoRefresh]` | 启动自动刷新 | `boolean` | `false` |
| `[nzAutoRefreshInterval]` | 自动刷新的时间间隔 | `number` | `5000` |
| `[nzRanges]` | 一组预先定义的时间范围（毫秒） | `number[]` | `[ 600000, 3600000, 43200000, 86400000 ]` |
| `[nzRange]` | 当前使用的时间范围（应为 `nzRanges` 之一） |  `number` | `60000` |
| `[nzStartTime]` | 当前使用的时间范围的起始时间 | `number \| Date` | - |
| `[nzStartTime]` | 当前使用的时间范围的终止时间 | `number \| Date` | - |
| `(nzAutoRefreshChange]` | 当切换自动刷新时触发 | `EventEmitter<boolean>` | - |
| `(nzRangeChange)` | 当时间范围变化时触发 | `EventEmitter<{ start: Date, stop: Date, range: number }>` | - |
