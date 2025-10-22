---
category: Components
type: 数据展示
title: Descriptions
subtitle: 描述列表
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/MjtG9_FOI/Descriptions.svg'
description: 展示多个只读字段的组合。
---

## 何时使用

常见于详情页的信息展示。

## API

### nz-descriptions

| 参数           | 说明                                                                                                  | 类型                               | 默认值                                          | 支持全局配置 |
| -------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | ------------ |
| `[nzTitle]`    | 描述列表的标题，显示在最顶部                                                                          | `string \| TemplateRef<void>`      | `false`                                         |
| `[nzExtra]`    | 描述列表的操作区域，显示在右上方                                                                      | `string \| TemplateRef<void>`      | `-`                                             |
| `[nzBordered]` | 是否展示边框                                                                                          | `boolean`                          | `false`                                         | ✅           |
| `[nzColumn]`   | 一行的 `nz-descriptions-item` 的数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number \| object`                 | `{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }` | ✅           |
| `[nzSize]`     | 设置列表的大小（只有设置 `nzBordered` 时生效）                                                        | `'default' \| 'middle' \| 'small'` | `'default'`                                     | ✅           |
| `[nzColon]`    | 在标题后显示冒号                                                                                      | `boolean`                          | `true`                                          | ✅           |

### nz-descriptions-item

| 参数        | 说明         | 类型                          | 默认值 |
| ----------- | ------------ | ----------------------------- | ------ |
| `[nzTitle]` | 内容的描述   | `string \| TemplateRef<void>` | -      |
| `[nzSpan]`  | 包含列的数量 | `number`                      | `1`    |
