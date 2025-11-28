---
category: Components
subtitle: 列表
type: 数据展示
title: List
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg'
description: 最基础的列表展示，可承载文字、列表、图片、段落。
---

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

### nz-list

| 参数             | 说明                                                                 | 类型                              | 默认值         |
| ---------------- | -------------------------------------------------------------------- | --------------------------------- | -------------- |
| `[nzBordered]`   | 是否展示边框                                                         | `boolean`                         | `false`        |
| `[nzFooter]`     | 列表底部                                                             | `string \| TemplateRef<void>`     | -              |
| `[nzHeader]`     | 列表头部                                                             | `string \| TemplateRef<void>`     | -              |
| `[nzItemLayout]` | 设置 `nz-list-item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | `'vertical' \| 'horizontal'`      | `'horizontal'` |
| `[nzLoading]`    | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位                | `boolean`                         | `false`        |
| `[nzSize]`       | list 的尺寸                                                          | `'large' \| 'small' \| 'default'` | `'default'`    |
| `[nzSplit]`      | 是否展示分割线                                                       | `boolean`                         | `true`         |

### nz-list-empty

列表空内容组件

| 参数           | 说明           | 类型                          | 默认值 |
| -------------- | -------------- | ----------------------------- | ------ |
| `[nzNoResult]` | 空内容显示内容 | `string \| TemplateRef<void>` | -      |

### nz-list[nzGrid]

使用栅格布局

### nz-list-header

列表头部位置组件

### nz-list-footer

列表脚部位置组件

### nz-list-pagination

列表分页位置组件

### nz-list-load-more

列表加载更多位置组件

---

### nz-list-item

| 参数         | 说明                   | 类型      | 默认值  |
| ------------ | ---------------------- | --------- | ------- |
| `[nzNoFlex]` | 是否非 `flex` 布局渲染 | `boolean` | `false` |

### ul[nz-list-item-actions]

列表项操作项容器组件

### nz-list-item-action

列表项操作项组件

### nz-list-item-extra

---

列表项扩展内容位置组件

### nz-list-item-meta

| 参数              | 说明               | 类型                          | 默认值 |
| ----------------- | ------------------ | ----------------------------- | ------ |
| `[nzAvatar]`      | 列表元素的图标     | `string \| TemplateRef<void>` | -      |
| `[nzDescription]` | 列表元素的描述内容 | `string \| TemplateRef<void>` | -      |
| `[nzTitle]`       | 列表元素的标题     | `string \| TemplateRef<void>` | -      |

### nz-list-item-meta-title

列表项元信息标题部分组件

### nz-list-item-meta-description

列表项元信息描述部分组件

### nz-list-item-meta-avatar

列表项元信息头像部分组件

| 参数      | 说明                 | 类型     | 默认值 |
| --------- | -------------------- | -------- | ------ |
| `[nzSrc]` | 图片类头像的资源地址 | `string` | -      |
