---
category: Components
type: 通用
title: Pipes
cols: 1
experimental: true
description: 常用 Pipes 集合。
---

## 何时使用

引入 Pipe 后，像 angular 的默认 Pipe 一样使用

## API

### nzBytes

| 参数      | 说明               | 类型     | 默认值 |
| --------- | ------------------ | -------- | ------ |
| `decimal` | 保留小数位         | `number` | '0'    |
| `from`    | 当前值的单位       | `string` | 'B'    |
| `to`      | 转换到目标值的单位 | `string` | ''     |

### nzToCssUnit

| 参数          | 说明     | 类型     | 默认值 |
| ------------- | -------- | -------- | ------ |
| `defaultUnit` | 默认单位 | `string` | 'px'   |

### nzEllipsis

| 参数     | 说明     | 类型     | 默认值 |
| -------- | -------- | -------- | ------ |
| `length` | 截取长度 | `number` | ''     |
| `suffix` | 替换字符 | `string` | ''     |

### nzAggregate

| 参数     | 说明     | 类型                               | 默认值 |
| -------- | -------- | ---------------------------------- | ------ |
| `method` | 聚合方式 | `'sum' \| 'max' \| 'min' \| 'avg'` | ''     |

### nzSanitizer

| 参数   | 说明           | 类型     | 默认值 |
| ------ | -------------- | -------- | ------ |
| `type` | sanitizer 类型 | `string` | 'html' |
