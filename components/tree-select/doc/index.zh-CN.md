---
category: Components
subtitle: 树选择
type: 数据录入
title: TreeSelect
---

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### nz-tree-select

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAllowClear]` | 显示清除按钮 | `boolean` | `false` |
| `[nzPlaceHolder]` | 选择框默认文字 | `string` | - |
| `[nzDisabled]` | 禁用选择器 | `boolean` | `false` |
| `[nzShowSearch]` | 显示搜索框 | `boolean` | `false` |
| `[nzNotFoundContent]` | 当下拉列表为空时显示的内容 | `string` | - |
| `[nzDropdownMatchSelectWidth]` | 下拉菜单和选择器同宽 | `boolean` | `true` |
| `[nzDropdownStyle]` | 下拉菜单的样式 | `{ [key: string]: string; }` | - |
| `[nzMultiple]` | 支持多选（当设置 nzCheckable 时自动变为true） | `boolean` | `false` |
| `[nzSize]` | 选择框大小 | `'large'｜'small'｜'default'` | `'default'` |
| `[nzCheckable]` | 节点前添加 Checkbox 复选框 | `boolean` | `false` |
| `[nzShowExpand]` | 节点前添加展开图标 | `boolean` | `true` |
| `[nzShowLine]` | 是否展示连接线 | `boolean` | `false` |
| `[nzAsyncData]` | 是否异步加载(显示加载状态) | `boolean` | `false` |
| `[nzNodes]` | treeNodes 数据 | `NzTreeNodeOptions[]` | `[]` |
| `[nzDefaultExpandAll]` | 默认展开所有树节点 | `boolean` | `false` |
| `[nzDefaultExpandedKeys]` | 默认展开指定的树节点 | `string[]` | - |
| `[nzDisplayWith]` | 如何在输入框显示所选的节点值的方法 | `(node: NzTreeNode) => string` | `(node: NzTreeNode) => node.title` |
| `[nzMaxTagCount]` | 最多显示多少个 tag | number | - |
| `[nzMaxTagPlaceholder]` | 隐藏 tag 时显示的内容 | TemplateRef<{ $implicit: NzTreeNode[] }> | - |
| `(nzExpandChange)` | 点击展开树节点图标调用 | `EventEmitter<NzFormatEmitEvent>` | - |
