---
category: Components
type: General
title: Pipes
cols: 1
experimental: true
description: Common Pipe Collections.
---

## When To Use

After importing Pipe, use it like Angular's built-in Pipe

## API

### nzBytes

| Property  | Description                     | Type     | Default |
| --------- | ------------------------------- | -------- | ------- |
| `decimal` | Decimal                         | `number` | '0'     |
| `from`    | Unit of current value           | `string` | 'B'     |
| `to`      | Units converted to target value | `string` | ''      |

### nzToCssUnit

| Property      | Description  | Type     | Default |
| ------------- | ------------ | -------- | ------- |
| `defaultUnit` | Default Unit | `string` | 'px'    |

### nzEllipsis

| Property | Description       | Type     | Default |
| -------- | ----------------- | -------- | ------- |
| `length` | Truncate length   | `number` | ''      |
| `suffix` | Replace character | `string` | ''      |

### nzAggregate

| Property | Description | Type                               | Default |
| -------- | ----------- | ---------------------------------- | ------- |
| `method` | Aggregation | `'sum' \| 'max' \| 'min' \| 'avg'` | ''      |

### nzSanitizer

| Property | Description    | Type     | Default |
| -------- | -------------- | -------- | ------- |
| `type`   | sanitizer type | `string` | 'html'  |
