---
category: Components
type: Other
title: Descriptions
subtitle: 描述列表
cols: 1
---

成组显示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### nz-descriptions

| 参数 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | 描述列表的标题，显示在最顶部 | `string｜TemplateRef<void>` | `false` |
| `[nzBorder]` | 是否展示边框 | `boolean` | `false` |
| `[nzColumn]` | 一行的 `nz-descriptions-item` 的数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number｜object` | - |
| `[nzSize]` | 设置列表的大小 | `'default'｜'middle'｜'small'` | `'default'` |


### nz-descriptions-item

| 参数 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| `[nzTitle]` | 内容的描述 | `boolean` | `false` |
| `[nzSpan]` | 包含列的数量 | `number` | `1` |
