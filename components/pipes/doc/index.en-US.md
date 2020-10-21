---
category: Components
type: General
title: Pipes
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

Common Pipe Collections in Projects

## When To Use

- After introducing Pipe, use it like angular's default Pipe

```ts
import { NzPipesModule } from 'ng-zorro-antd/pipes';
```

## API

### __nzSafeNull__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `replace` | Replace character | `string` | '' |

### __nzBytes__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `decimal` | Decimal | `number` | '0' |
| `from` | Unit of current value | `string` | 'B' |
| `to` | Units converted to target value | `string` | '' |

### __nzToCssUnit__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `defaultUnit` | Default Unit | `string` | 'px' |

### __nzEllipsis__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `length` | Truncate length | `number` | '' |
| `suffix` | Replace character | `string` | '' |


### __nzAggregate__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | Aggregation | `'sum' \| 'max' \| 'min' \| 'avg'` | '' |

### __nzSanitizer__

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | sanitizer type | `string` | 'html' |
