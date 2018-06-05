---
category: Components
subtitle: 标签
type: Data Display
title: Tag
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### nz-tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzMode]` | 设定标签工作的模式 | `'closeable'丨'default'丨'checkable'` | `default` |
| `[nzChecked]` | 设置标签的选中状态，可双向绑定，在 `nzMode="checkable"` 时可用 | boolean | false |
| `[nzColor]` | 标签色 | string | - |
| `(nzAfterClose)` | 关闭动画完成后的回调，在 `nzMode="closable"` 时可用 | `EventEmitter<void>` | - |
| `(nzOnClose)` | 关闭时的回调，在 `nzMode="closable"` 时可用 | `EventEmitter<MouseEvent>` | - |
| `(nzCheckedChange)` | 设置标签的选中状态的回调，在 `nzMode="checkable"` 时可用 | `EventEmitter<void>` | - |
