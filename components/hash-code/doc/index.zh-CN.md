---
category: Components
subtitle: 哈希码
type: 特色组件
title: HashCode
tag: 17.0.0
cover: 'https://img.alicdn.com/imgextra/i3/O1CN01jn3OGS1qq7Xkq6O6b_!!6000000005546-2-tps-1074-374.png'
description: 展示区块链数据的哈希值。
---

## 何时使用

哈希码组件是以 64 位设计的样式，如果给出的数据不足或者高于 64 位，可能会带来一些展示上的差异。

## API

### nz-hash-code

| 参数         | 说明             | 类型                                        | 默认值       |
| ------------ | ---------------- | ------------------------------------------- | ------------ |
| `[nzValue]`  | 哈希码的值       | `string`                                    | -            |
| `[nzTitle]`  | 左上角的描述内容 | `string`                                    | `'HashCode'` |
| `[nzLogo]`   | 右上角的展示     | `TemplateRef<void> \| string`               | -            |
| `[nzMode]`   | 展示模式         | `'single' \| 'double' \| 'strip' \| 'rect'` | `'double'`   |
| `[nzType]`   | 样式             | `'default' \| 'primary'`                    | `'primary'`  |
| `(nzOnCopy)` | 点击"复制"的回调 | `EventEmitter<string>`                      | -            |
