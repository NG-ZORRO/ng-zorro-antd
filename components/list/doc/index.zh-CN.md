---
category: Components
subtitle: 列表
type: 数据展示
title: List
cols: 1
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzListModule } from 'ng-zorro-antd/list';
```

## API

### nz-list

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDataSource]` | 列表数据源 | `any[]` | - |
| `[nzRenderItem]` | 自定义列表项 | `TemplateRef<void>` | - |
| `[nzBordered]` | 是否展示边框 | `boolean` | `false` |
| `[nzFooter]` | 列表底部 | `string \| TemplateRef<void>` | - |
| `[nzGrid]` | 列表栅格配置 | `object` | - |
| `[nzHeader]` | 列表头部 | `string \| TemplateRef<void>` | - |
| `[nzItemLayout]` | 设置 `nz-list-item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | `'vertical' \| 'horizontal'` | `'horizontal'` |
| `[nzLoading]` | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | `boolean` | `false` |
| `[nzLoadMore]` | 加载更多 | `TemplateRef<void>` | - |
| `[nzNoResult]` | 当列表为空时加载的内容 | `string`  \|  `TemplateRef<void>` | - |
| `[nzPagination]` | 对应的 `pagination` 配置 | `TemplateRef<void>` | - |
| `[nzSize]` | list 的尺寸 | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzSplit]` | 是否展示分割线 | `boolean` | `true` |

#### nzGrid

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数 | `number` | - |
| gutter | 栅格间隔 | `number` | `0` |
| xs | `<576px` 展示的列数 | `number` | - |
| sm | `≥576px` 展示的列数 | `number` | - |
| md | `≥768px` 展示的列数 | `number` | - |
| lg | `≥992px` 展示的列数 | `number` | - |
| xl | `≥1200px` 展示的列数 | `number` | - |
| xxl | `≥1600px` 展示的列数 | `number` | - |

### nz-list-item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzContent]` | 内容项 | `string \| TemplateRef<void>` | - |
| `[nzActions]` | 列表操作组，根据 `nzItemLayout` 的不同, 位置在卡片底部或者最右侧。 | `Array<TemplateRef<void><void>>` | - |
| `[nzExtra]` | 额外内容, 通常用在 `nzItemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | `TemplateRef<void>` | - |
| `[nzNoFlex]` | 是否非 `flex` 布局渲染 | `boolean` | `false` |

### nz-list-item-meta

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAvatar]` | 列表元素的图标 | `string \| TemplateRef<void>` | - |
| `[nzDescription]` | 列表元素的描述内容 | `string \| TemplateRef<void>` | - |
| `[nzTitle]` | 列表元素的标题 | `string \| TemplateRef<void>` | - |
