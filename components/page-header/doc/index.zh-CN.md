---
category: Components
type: 导航
title: PageHeader
cols: 1
subtitle: 页头
cover: 'https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg'
description: 带有通用操作的页头。
---

## 何时使用

页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题、页面内容简介、页面级操作等、页面级导航组成。

当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。

## API

```html
<nz-page-header nzTitle="Page Title"></nz-page-header>
```

### nz-page-header

| 参数           | 说明               | 类型                          | 默认值                                                                                                                                                                                                                | 全局配置 |
| -------------- | ------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `[nzGhost]`    | 使背景色透明       | `boolean`                     | `true`                                                                                                                                                                                                                | ✅       |
| `[nzTitle]`    | title 文字         | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                     | -        |
| `[nzSubtitle]` | subTitle 文字      | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                     | -        |
| `[nzBackIcon]` | 自定义 back icon   | `string \| TemplateRef<void>` | -                                                                                                                                                                                                                     | -        |
| `(nzBack)`     | 返回按钮的点击事件 | `EventEmitter<void>`          | 未订阅该事件时默认调用 [Location#back](https://angular.cn/api/common/Location#back)（需要引入 [RouterModule](https://angular.cn/api/router/RouterModule) 或者注册 [Location](https://angular.cn/api/common/Location)) | -        |

### Page header 组成部分

| 元素                                       | 说明                                     |
| ------------------------------------------ | ---------------------------------------- |
| `nz-page-header-title`                     | title 部分，`[nzTitle]` 优先级更高       |
| `nz-page-header-subtitle`                  | subtitle 部分，`[nzSubtitle]` 优先级更高 |
| `nz-page-header-content`                   | 内容部分                                 |
| `nz-page-header-footer`                    | 底部部分                                 |
| `nz-page-header-tags`                      | title 旁的 tag 列表容器                  |
| `nz-page-header-extra`                     | title 的行尾操作区部分                   |
| `nz-breadcrumb[nz-page-header-breadcrumb]` | 面包屑部分                               |
| `nz-avatar[nz-page-header-avatar]`         | 头像部分                                 |
