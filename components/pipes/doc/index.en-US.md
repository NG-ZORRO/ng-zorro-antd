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

### **nzSafeNull**:standalone

| Property  | Description       | Type     | Default |
| --------- | ----------------- | -------- | ------- |
| `replace` | Replace character | `string` | ''      |

### **nzBytes**:standalone

| Property  | Description                     | Type     | Default |
| --------- | ------------------------------- | -------- | ------- |
| `decimal` | Decimal                         | `number` | '0'     |
| `from`    | Unit of current value           | `string` | 'B'     |
| `to`      | Units converted to target value | `string` | ''      |

### **nzToCssUnit**:standalone

| Property      | Description  | Type     | Default |
| ------------- | ------------ | -------- | ------- |
| `defaultUnit` | Default Unit | `string` | 'px'    |

### **nzEllipsis**:standalone

| Property | Description       | Type     | Default |
| -------- | ----------------- | -------- | ------- |
| `length` | Truncate length   | `number` | ''      |
| `suffix` | Replace character | `string` | ''      |

### **nzAggregate**:standalone

| Property | Description | Type                               | Default |
| -------- | ----------- | ---------------------------------- | ------- |
| `method` | Aggregation | `'sum' \| 'max' \| 'min' \| 'avg'` | ''      |

### **nzSanitizer**:standalone

| Property | Description    | Type     | Default |
| -------- | -------------- | -------- | ------- |
| `type`   | sanitizer type | `string` | 'html'  |
