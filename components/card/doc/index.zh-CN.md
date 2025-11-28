---
category: Components
type: 数据展示
title: Card
subtitle: 卡片
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/keNB-R8Y9/Card.svg'
description: 通用卡片容器。
---

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<nz-card nzTitle="卡片标题">卡片内容</nz-card>
```

### nz-card

| 参数            | 说明                                                | 类型                          | 默认值      | 支持全局配置 |
| --------------- | --------------------------------------------------- | ----------------------------- | ----------- | ------------ |
| `[nzActions]`   | 卡片操作组，位置在卡片底部                          | `Array<TemplateRef<void>>`    | -           |
| `[nzBodyStyle]` | 内容区域自定义样式                                  | `{ [key: string]: string }`   | -           |
| `[nzBordered]`  | 是否有边框                                          | `boolean`                     | `true`      | ✅           |
| `[nzCover]`     | 卡片封面                                            | `TemplateRef<void>`           | -           |
| `[nzExtra]`     | 卡片右上角的操作区域                                | `string \| TemplateRef<void>` | -           |
| `[nzHoverable]` | 鼠标移过时可浮起                                    | `boolean`                     | `false`     | ✅           |
| `[nzLoading]`   | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | `boolean`                     | `false`     |
| `[nzTitle]`     | 卡片标题                                            | `string \| TemplateRef<void>` | -           |
| `[nzType]`      | 卡片类型，可设置为 `inner` 或 不设置                | `'inner'`                     | -           |
| `[nzSize]`      | 卡片的尺寸                                          | `'default' \| 'small'`        | `'default'` | ✅           |

### nz-card-meta

| 参数              | 说明      | 类型                          | 默认值 |
| ----------------- | --------- | ----------------------------- | ------ |
| `[nzAvatar]`      | 头像/图标 | `TemplateRef<void>`           | -      |
| `[nzDescription]` | 描述内容  | `string \| TemplateRef<void>` | -      |
| `[nzTitle]`       | 标题内容  | `string \| TemplateRef<void>` | -      |

### [nz-card-grid]

| 参数            | 说明             | 类型      | 默认值 | 支持全局配置 |
| --------------- | ---------------- | --------- | ------ | ------------ |
| `[nzHoverable]` | 鼠标移过时可浮起 | `boolean` | `true` | -            |

分隔卡片内容区域

### nz-card-tab

分隔页签标题区域
