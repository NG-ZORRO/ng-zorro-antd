---
category: Components
type: 通用
title: Pipe
cols: 1
experimental: true
---


项目中常用 Pipe 集合

## 何时使用

- 引入 Pipe 后，像 angular 的默认 Pipe 一样使用

```ts
import { NzPipesModule } from 'ng-zorro-antd/pipe';
```

## API

```html
<div>{{ value | nzSafeNull }}</div>
```

### nz-safe-null

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `replace` | 替换字符 | `string` | '' |

### nz-bytes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `decimal` | 保留小数位 | `number` | '0' |
| `from` | 当前值的单位 | `string` | 'B' |
| `to` | 转换到目标值的单位 | `string` | '' |

### nz-css-unit

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `defaultUnit` | 默认单位 | `string` | 'px' |

### nz-ellipsis

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `length` | 截取长度 | `number` | '' |
| `suffix` | 替换字符 | `string` | '' |
| `preserve` | 是否过滤空格的长度 | `boolean` | false |


### nz-math

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `method` | 聚合方式 | `string` | '' |

### nz-sanitizer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | sanitizer类型 | `string` | 'html' |


### nz-some

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `predicate` | 函数 | `object` | '' |

### nz-trim

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `chars` | 正则表达式 | `string` | '\\s' |

### nz-time-range

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `format` | 格式 | `string` | 'HH:mm:ss' |
