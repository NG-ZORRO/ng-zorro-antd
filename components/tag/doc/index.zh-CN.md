---
category: Components
subtitle: 标签
type: 数据展示
title: Tag
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzTagModule } from 'ng-zorro-antd/tag';
```

## API

### nz-tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzMode]` | 设定标签工作的模式 | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzChecked]` | 设置标签的选中状态，可双向绑定，在 `nzMode="checkable"` 时可用 | `boolean` | `false` |
| `[nzColor]` | 标签色 | `string` | - |
| `(nzOnClose)` | 关闭时的回调，在 `nzMode="closable"` 时可用 | `EventEmitter<MouseEvent>` | - |
| `(nzCheckedChange)` | 设置标签的选中状态的回调，在 `nzMode="checkable"` 时可用 | `EventEmitter<void>` | - |
