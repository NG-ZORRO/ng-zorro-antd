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

## API

### 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzEmptyModule } from 'ng-zorro-antd';
```

### nz-empty

| 参数 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| `[nzNotFoundImage]` | 设置显示图片，为 `string` 时表示自定义图片地址 | `string` ｜ `TemplateRef<void>` | - |
| `[nzNotFoundContent]` | 自定义描述内容 | `string` ｜ `TemplateRef<void>` | - |
| `[nzNotFoundFooter]` | 设置自定义 footer | `string` ｜ `TemplateRef<void>` | - |

### NzEmptyService

| 属性/方法 | 说明 | 参数 |
| -------- | ----------- | ---- |
| `setDefaultEmptyContent` | 设置全局空内容，空组件的父组件名称将会被传递给模板 | `TemplateRef<string>` ｜ `string` |
| `resetDefault` | 重置默认空内容 | - |

### InjectionToken

| Token | 说明 | 参数 |
| ----- | --- | ---- |
| `NZ_DEFAULT_EMPTY_CONTENT` | 提供一个用户自定义的空组件 | `Component` ｜ `string` |
| `NZ_EMPTY_COMPONENT_NAME` | 将会被注入到 `NZ_DEFAULT_EMPTY_CONTENT` 中，告诉该组件其父组件的名称 | `string` |

### 全局自定义空组件

你或许知道或者用过一些类似 `nzNotFoundContent` 的属性来自定义组件数据为空时的内容，现在它们都会使用 `Empty` 组件。你甚至可以通过提供在根模块中提供 `NZ_DEFAULT_EMPTY_CONTENT`，或者是调用 `setDefaultEmptyContent` 方法来定义一个自定义的全局空组件。

