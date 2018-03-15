---
category: Components
type: Other
title: Divider
subtitle: 分割线
---

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDashed | 是否虚线 | Boolean | false |
| nzType | 水平还是垂直类型 | enum: `horizontal` `vertical` | `horizontal` |
| nzText | 中间文字 | `string丨TemplateRef<void>` | - |
| nzOrientation | 中间文字方向 | enum: `left` `right` | - |
