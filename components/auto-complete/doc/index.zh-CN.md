---
category: Components
type: 数据录入
title: Autocomplete
subtitle: 自动完成
---

输入框自动完成功能。

## 何时使用

需要自动完成时。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
```

## API

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto">
<nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
```

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto">
<nz-autocomplete #auto>
  <nz-auto-option [nzValue]="'12345'">12345</nz-auto-option>
  <nz-auto-option [nzValue]="'23456'">23456</nz-auto-option>
  <nz-auto-option [nzValue]="'34567'">34567</nz-auto-option>
</nz-autocomplete>
```

### [nzAutocomplete]

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAutocomplete]` | 用于绑定 nzAutocomplete 组件 | `NzAutocompleteComponent` | - |

### nz-autocomplete

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzBackfill]` | 使用键盘选择选项的时候把选中项回填到输入框中 | `boolean` | `false` |
| `[nzDataSource]` | 自动完成的数据源 | `AutocompleteDataSource` | - |
| `[nzDefaultActiveFirstOption]` | 是否默认高亮第一个选项。 | `boolean` | `true` |
| `[nzWidth]` | 自定义宽度单位 px | `number` | 触发元素宽度 |
| `[nzOverlayClassName]` | 下拉根元素的类名称 | `string` | - |
| `[nzOverlayStyle]` | 下拉根元素的样式 | `object` | - |

### nz-auto-option

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzValue]` | 绑定到触发元素 ngModel 的值 | `any` | - |
| `[nzLabel]` | 填入触发元素显示的值 | `string` | - |
| `[nzDisabled]` | 禁用选项 | `boolean` | `false` |
