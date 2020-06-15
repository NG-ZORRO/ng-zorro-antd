---
category: Components
subtitle: 排版
type: 通用
title: Typography
cols: 1
---
文本的基本格式。

## 何时使用

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

```ts
import { NzTypographyModule } from 'ng-zorro-antd/typography';
```

## API

### [nz-typography]

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzContent]` | 组件内容 | `string` | - |
| `[nzCopyable]` | 是否可拷贝，需要配合 `[nzContent]` 使用 | `boolean` | `false` |
| `[nzEditable]` | 是否可编辑，需要配合 `[nzContent]` 使用 | `boolean` | `false` |
| `[nzEllipsis]` | 自动溢出省略，动态内容时需要配合 `[nzContent]` 使用 | `boolean` | `false` |
| `[nzExpandable]` | 自动溢出省略时是否可展开 | `boolean` | `false` |
| `[nzSuffix]` | 自动溢出省略时的文本后缀 | `string` | - |
| `[nzCopyText]` | 自定义被拷贝的文本 | `string` | - |
| `[nzDisabled]` | 禁用文本 | `boolean` | `false` |
| `[nzEllipsisRows]` | 自动溢出省略时省略行数 | `number` | `1` | ✅ |
| `[nzType]` | 文本类型 | `'secondary'｜'warning'｜'danger'` | - |
| `(nzContentChange)` | 当用户提交编辑内容时触发 | `EventEmitter<string>` | - |
| `(nzExpandChange)` | 展开省略文本时触发 | `EventEmitter<void>` | - |
