---
category: Components
type: Data Display
title: Collapse
subtitle: 折叠面板
cols: 1
---

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## API

### nz-collapse

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAccordion]` | 是否每次只打开一个tab | boolean | false |
| `[nzBordered]` | 是否有边框 | boolean | true |

### nz-collapse-panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDisabled]` | 禁用后的面板展开与否将无法通过用户交互改变 | boolean | false |
| `[nzHeader]` | 面板头内容 | string｜ `TemplateRef<void>` | 无 |
| `[nzShowArrow]` | 是否展示箭头 | boolean | true |
| `[nzActive]` | 面板是否展开，可双向绑定 | boolean | 无 |
| `(nzActiveChange)` | 面板展开回调 | `EventEmitter<boolean>` | 无 |
