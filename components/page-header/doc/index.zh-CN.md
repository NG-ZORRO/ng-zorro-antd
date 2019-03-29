---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle: 页头
---

页头用来声明页面的主题，包含了用户所关注的最重要的信息。

## 何时使用

当需要用户快速理解当前页面是什么以及它的功能时使用。

## API

```html
<nz-page-header nzTitle="Page Title"></nz-page-header>
```

### nz-page-header
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzTitle]` | title 文字 | `string｜TemplateRef<void>` | - |
| `[nzSubTitle]` | subTitle 文字 | `string｜TemplateRef<void>` | - |
| `[nzBackIcon]` | 自定义 back icon | `string｜TemplateRef<void>` | - |
| `[nzBack]` | 返回按钮的点击事件 | `EventEmitter<void>` | - |

### Page header 组成部分
| 元素 | 说明 |
| ----- | ----------- | ---- | ------------- |
| `<nz-page-header-title>` | title 部分，`[nzTitle]` 优先级更高 |
| `<nz-page-header-subtitle>` | subtitle 部分，`[nzSubTitle]` 优先级更高 |
| `<nz-page-header-content>` | 内容部分 |
| `<nz-page-header-footer>` | 底部部分 |
| `<nz-page-header-tags>` |  title 旁的 tag 列表容器 |
| `<nz-page-header-extra>` | title 的行尾操作区部分 |
| `<nz-breadcrumb nz-page-header-breadcrumb>` | 面包屑部分 |

