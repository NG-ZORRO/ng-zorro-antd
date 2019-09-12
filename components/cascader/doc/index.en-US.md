---
category: Components
type: Data Entry
title: Cascader
---

Cascade selection box.

## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
```

## API

```html
<nz-cascader [nzOptions]="options" [(ngModel)]="values"></nz-cascader>
```

### nz-cascader

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | --------------------- |
| `[ngModel]` | selected value | `any[]` | - |
| `[nzAllowClear]` | whether allow clear | `boolean` | `true` |
| `[nzAutoFocus]` | whether auto focus the input box | `boolean` | `false` |
| `[nzChangeOn]` | change value on each selection if this function return `true` | `(option: any, index: number) => boolean` | - |
| `[nzChangeOnSelect]` | change value on each selection if set to true, see above demo for details | `boolean` | `false` |
| `[nzColumnClassName]` | additional className of column in the popup overlay | `string` | - |
| `[nzDisabled]` | whether disabled select | `boolean` | `false` |
| `[nzExpandTrigger]` | expand current item when click or hover, one of 'click' 'hover' | `'click'\|'hover'` | `'click'` |
| `[nzMenuClassName]` | additional className of popup overlay | `string` | - |
| `[nzMenuStyle]` | additional css style of popup overlay | `object` | - |
| `[nzNotFoundContent]` | Specify content to show when no result matches. | `string\|TemplateRef<void>` | - |
| `[nzLabelProperty]` | the label property name of options | `string` | `'label'` |
| `[nzLabelRender]` | render template of displaying selected options | `TemplateRef<any>` | - |
| `[nzOptionRender]` | render template of cascader options | `TemplateRef<{ $implicit: NzCascaderOption, index: number }>` | |
| `[nzLoadData]` | To load option lazily. If setting `ngModel` with an array value and `nzOptions` is not setting, lazy load will be call immediately | `(option: any, index?: index) => PromiseLike<any>` | - |
| `[nzOptions]` | data options of cascade | `object[]` | - |
| `[nzPlaceHolder]` | input placeholder | `string` | `'Please select'` |
| `[nzShowArrow]` | Whether show arrow | `boolean` | `true` |
| `[nzShowInput]` | Whether show input | `boolean` | `true` |
| `[nzShowSearch]` | Whether support search. Cannot be used with `[nzLoadData]` at the same time | `boolean\|NzShowSearchOptions` | `false` |
| `[nzSize]` | input size, one of `large` `default` `small` | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[nzValueProperty]` | the value property name of options | `string` | `'value'` |
| `(ngModelChange)` | Emit on values change | `EventEmitter<any[]>` | - |
| `(nzClear)` | Emit on clear values | `EventEmitter<void>` | - |
| `(nzVisibleChange)` | Emit on popup menu visible or hide | `EventEmitter<boolean>` | - |
| `(nzSelectionChange)` | Emit on values change | `EventEmitter<NzCascaderOption[]>` | - |

When `nzShowSearch` is an object it should implements `NzShowSearchOptions`：

| Params | Explanation | Type | Default |
| --- | --- | --- | --- |
| `filter` | Optional. Be aware that all non-leaf CascaderOptions would be filtered | `(inputValue: string, path: NzCascaderOption[]): boolean` | - |
| `sorter` | Optional | `(a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string): number` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
| closeMenu() | hide the menu |
