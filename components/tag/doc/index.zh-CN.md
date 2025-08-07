---
category: Components
subtitle: 标签
type: 数据展示
title: Tag
cover: 'https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg'
description: 进行标记和分类的小标签。
---

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### nz-tag

| 参数                | 说明                                                           | 类型                                      | 默认值      |
| ------------------- | -------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `[nzMode]`          | 设定标签工作的模式                                             | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzChecked]`       | 设置标签的选中状态，可双向绑定，在 `nzMode="checkable"` 时可用 | `boolean`                                 | `false`     |
| `[nzColor]`         | 标签色                                                         | `string`                                  | -           |
| `[nzBordered]`      | 是否有边框                                                     | `boolean`                                 | `true`      |
| `(nzOnClose)`       | 关闭时的回调，在 `nzMode="closable"` 时可用                    | `EventEmitter<MouseEvent>`                | -           |
| `(nzCheckedChange)` | 设置标签的选中状态的回调，在 `nzMode="checkable"` 时可用       | `EventEmitter<void>`                      | -           |
