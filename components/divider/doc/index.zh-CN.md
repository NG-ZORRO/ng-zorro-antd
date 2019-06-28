---
category: Components
type: 其他
title: Divider
subtitle: 分割线
---

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzDividerModule } from 'ng-zorro-antd/divider';
```

## API

### nz-divider

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDashed]` | 是否虚线 | `boolean` | `false` |
| `[nzType]` | 水平还是垂直类型 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `[nzText]` | 中间文字 | `string \| TemplateRef<void>` | - |
| `[nzOrientation]` | 中间文字方向 | `'center' \| 'left' \| 'right'` | `'center'` |
