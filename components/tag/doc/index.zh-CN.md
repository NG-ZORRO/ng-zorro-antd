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

```ts
import { NzTagModule } from 'ng-zorro-antd/tag';
```

## API

### nz-tag

| 参数                | 说明                                                             | 类型                                      | 默认值      |
| ------------------- | ---------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `[nzMode]`          | 设定标签工作的模式                                               | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[nzCloseable]`     | 设置标签可否被关闭                                               | `boolean`                                 | `false`     |
| `[nzCheckable]`     | 设置标签可否被选中                                               | `boolean`                                 | `false`     |
| `[nzChecked]`       | 设置标签的选中状态，可双向绑定，在 `[nzCheckable]="true"` 时可用 | `boolean`                                 | `false`     |
| `[nzColor]`         | 标签色                                                           | `string`                                  | -           |
| `(nzOnClose)`       | 关闭时的回调，在 `[nzCloseable]="true"` 时可用                   | `EventEmitter<MouseEvent>`                | -           |
| `(nzCheckedChange)` | 设置标签的选中状态的回调，在 `[nzCheckable]="true"` 时可用       | `EventEmitter<void>`                      | -           |
