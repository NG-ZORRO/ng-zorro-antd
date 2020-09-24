---
category: Components
type: 通用
title: Pipes
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。</p>
<p>开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 <strong>breaking changes</strong>。</p>
</blockquote>


项目中常用 Pipe 集合

## 何时使用

- 引入 Pipe 后，像 angular 的默认 Pipe 一样使用

```ts
import { NzPipesModule } from 'ng-zorro-antd/pipes';
```

## API

### __nzSafeNull__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `replace` | 替换字符 | `string` | '' |

### __nzBytes__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `decimal` | 保留小数位 | `number` | '0' |
| `from` | 当前值的单位 | `string` | 'B' |
| `to` | 转换到目标值的单位 | `string` | '' |

### __nzToCssUnit__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `defaultUnit` | 默认单位 | `string` | 'px' |

### __nzEllipsis__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `length` | 截取长度 | `number` | '' |
| `suffix` | 替换字符 | `string` | '' |

### __nzAggregate__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `method` | 聚合方式 | `'sum' \| 'max' \| 'min' \| 'avg'` | '' |

### __nzSanitizer__

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | sanitizer 类型 | `string` | 'html' |

