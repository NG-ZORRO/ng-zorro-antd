---
category: Components
type: General
title: Pipe
cols: 1
experimental: true
---


Common Pipe Collections in Projects

## When To Use

- After introducing Pipe, use it like angular's default Pipe

```ts
import { NzPipesModule } from 'ng-zorro-antd/pipe';
```

## API

```html
<div>{{ value | nzSafeNull : '-' }}</div>
```

### nz-safe-null

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `replace` | Replace character | `string` | '' |


### nz-bytes

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `decimal` | Decimal | `number` | '0' |
| `from` | Unit of current value | `string` | 'B' |
| `to` | Units converted to target value | `string` | '' |

### nz-css-unit

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `defaultUnit` | Default Unit | `string` | 'px' |

### nz-ellipsis

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `length` | Truncate length | `number` | '' |
| `suffix` | Replace character | `string` | '' |
| `preserve` | Whether to filter the length of spaces | `boolean` | false |


### nz-math

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `method` | Aggregation | `string` | '' |

### nz-sanitizer

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | sanitizer type | `string` | 'html' |


### nz-some

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `predicate` | function | `object` | '' |

### nz-trim

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `chars` | Regular expression | `string` | '\\s' |

### nz-time-range

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `format` | format | `string` | 'HH:mm:ss' |
