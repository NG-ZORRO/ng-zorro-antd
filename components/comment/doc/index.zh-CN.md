---
category: Components
type: 数据展示
title: Comment
subtitle: 评论
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/ILhxpGzBO/Comment.svg'
description: 对网站内容的反馈、评价和讨论。
---

## 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

## API

### nz-comment

| Property       | Description    | Type                          | Default |
| -------------- | -------------- | ----------------------------- | ------- |
| `[nzAuthor]`   | 显示评论的作者 | `string \| TemplateRef<void>` | -       |
| `[nzDatetime]` | 展示时间描述   | `string \| TemplateRef<void>` | -       |

### [nz-comment-avatar]

要显示为评论头像的元素。

### nz-comment-content

评论的主要内容。

### nz-comment-action

在评论内容下面呈现的操作项。
