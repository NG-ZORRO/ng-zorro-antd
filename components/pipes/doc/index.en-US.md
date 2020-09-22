---
category: Components
type: General
title: Pipes
cols: 1
experimental: true
---


Common Pipe Collections in Projects

## When To Use

- After introducing Pipe, use it like angular's default Pipe

```ts
import { NzPipesModule } from 'ng-zorro-antd/pipes';
```

## API

### __nz-safe-null__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `replace` | Replace character | `string` | '' |


### __nz-bytes__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `decimal` | Decimal | `number` | '0' |
| `from` | Unit of current value | `string` | 'B' |
| `to` | Units converted to target value | `string` | '' |

### __nz-css-unit__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `defaultUnit` | Default Unit | `string` | 'px' |

### __nz-ellipsis__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `length` | Truncate length | `number` | '' |
| `suffix` | Replace character | `string` | '' |


### __nz-aggregate__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | Aggregation | `'sum' \| 'max' \| 'min' \| 'avg'` | '' |

### __nz-sanitizer__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | sanitizer type | `string` | 'html' |
