---
category: Components
subtitle: 选择器
type: Data Entry
title: Select
---

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/zh) 是更好的选择。

## API

```html
<nz-select>
  <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
</nz-select>
```

### nz-select

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 当前选中的 nz-option 的 nzValue 值，可双向绑定，当 `nzMode` 为 `multiple` 或 `tags` 时，ngModel 为数组 | `any｜any[]` | - |
| `[compareWith]` | 与 [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection) 相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |
| `[nzAutoClearSearchValue]` | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效。 | boolean | `true` |
| `[nzAllowClear]` | 支持清除 | `boolean` | `false` |
| `[nzOpen]` | 下拉菜单是否打开，可双向绑定 | `boolean` | `false` |
| `[nzAutoFocus]` | 默认获取焦点 | `boolean` | `false` |
| `[nzDisabled]` | 是否禁用 | `boolean` | `false` |
| `[nzDropdownClassName]` | 下拉菜单的 className 属性 | `string` | - |
| `[nzDropdownMatchSelectWidth]` | 下拉菜单和选择器同宽 | `boolean` | `true` |
| `[nzDropdownStyle]` | 下拉菜单的 style 属性 | `object` | - |
| `[nzServerSearch]` | 是否使用服务端搜索，当为 true 时，将不再在前端对 nz-option 进行过滤 | `boolean` | `false` |
| `[nzFilterOption]` | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | `(input?: string, option?: NzOptionComponent) => boolean;` | - |
| `[nzMaxMultipleCount]` | 最多选中多少个标签| `number` | `Infinity` |
| `[nzMode]` | 设置 nz-select 的模式 | `'multiple'｜'tags'｜'default'` | `'default'` |
| `[nzNotFoundContent]` | 当下拉列表为空时显示的内容 | `string` | - |
| `[nzPlaceHolder]` | 选择框默认文字 | `string` | - |
| `[nzShowArrow]` | 是否显示下拉小箭头 | boolean | `true` |
| `[nzShowSearch]` | 使单选模式可搜索 | `boolean` | `false` |
| `[nzSize]` | 选择框大小 | `'large'｜'small'｜'default'` | `'default'` |
| `[nzSuffixIcon]` | 自定义的选择框后缀图标 | `TemplateRef<void>` | - |
| `[nzRemoveIcon]` | 自定义的多选框清除图标 | `TemplateRef<void>` | - |
| `[nzClearIcon]` | 自定义的多选框清空图标 | `TemplateRef<void>` | - |
| `[nzMenuItemSelectedIcon]` | 自定义当前选中的条目图标 | `TemplateRef<void>` | - |
| `[nzTokenSeparators]` | 在 tags 和 multiple 模式下自动分词的分隔符 | `string[]` | `[]` |
| `[nzLoading]` | 加载中状态 | boolean | `false` |
| `(ngModelChange)` | 选中的 nz-option 发生变化时，调用此函数 | `EventEmitter<any[]>` | - |
| `(nzOpenChange)` | 下拉菜单打开状态变化回调 | `EventEmitter<boolean>` | - |
| `(nzScrollToBottom)` | 下拉列表滚动到底部的回调 | `EventEmitter<void>` | - |
| `(nzOnSearch)` | 文本框值变化时回调 | `EventEmitter<string>` | - |
| `(nzFocus)` | focus时回调 | `EventEmitter<void>` | - |
| `(nzBlur)` | blur时回调 | `EventEmitter<void>` | - |

### nz-option

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDisabled]` | 是否禁用 | `boolean` | `false` |
| `[nzLabel]` | 选中该 nz-option 后，nz-select 中显示的文字 | `string` | - |
| `[nzValue]` | nz-select 中 ngModel 的值 | `any ` | - |
| `[nzCustomContent]` | 是否自定义在下拉菜单中的Template内容，当为 true 时，nz-option 包裹的内容将直接渲染在下拉菜单中 | `boolean` | `false` |

### nz-option-group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzLabel]` | 组名 | `string｜TemplateRef<void>` | - |


## 方法

### nz-select

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

