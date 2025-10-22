---
category: Components
type: Data Display
title: Comment
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/ILhxpGzBO/Comment.svg'
description: A comment displays user feedback and discussion to website content.
---

## When To Use

Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.

## API

### nz-comment

| Property       | Description                                            | Type                          | Default |
| -------------- | ------------------------------------------------------ | ----------------------------- | ------- |
| `[nzAuthor]`   | The element to display as the comment author           | `string \| TemplateRef<void>` | -       |
| `[nzDatetime]` | A datetime element containing the time to be displayed | `string \| TemplateRef<void>` | -       |

### [nz-comment-avatar]

The element to display as the comment avatar.

### nz-comment-content

The main content of the comment.

### nz-comment-action

The element items rendered below the comment content.
