---
category: Components
type: 数据展示
subtitle: 空状态
title: Empty
cols: 1
---

空状态时的展示占位图。

## 何时使用

当目前没有数据时，用于显式的用户提示。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzEmptyModule } from 'ng-zorro-antd/empty';
```

## API

### nz-empty

| 参数 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| `[nzNotFoundImage]` | 设置显示图片，为 `string` 时表示自定义图片地址 | `string`  \|  `TemplateRef<void>` | - |
| `[nzNotFoundContent]` | 自定义描述内容 | `string`  \|  `TemplateRef<void>` | - |
| `[nzNotFoundFooter]` | 设置自定义 footer | `string`  \|  `TemplateRef<void>` | - |

### `NZ_CONFIG`

`nzEmpty` 接口有如下字段：

| 参数 | 说明 | 类型 |
| ----- | --- | ---- |
| `nzDefaultEmptyContent` | 用户自定义的全局空组件，可通过 `undefined` 来取消自定义的全局空组件 | `Type<any>\|TemplateRef<string>\|string\|undefined` |

### InjectionToken

| Token | 说明 | 参数 |
| ----- | --- | ---- |
| `NZ_EMPTY_COMPONENT_NAME` | 将会被注入到用户的全局自定义空组件中，告诉该组件其所在组件的名称 | `string` |

### 全局自定义空组件

你或许知道或者用过一些类似 `nzNotFoundContent` 的属性来自定义组件数据为空时的内容，现在它们都会使用 `Empty` 组件。你可以通过在 `NZ_CONFIG` 中提供 `{ nzEmpty: { nzDefaultEmptyContent } }` 来定义一个自定义的全局空组件。

