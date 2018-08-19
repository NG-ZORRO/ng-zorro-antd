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

## API

```html
<nz-cascader [nzOptions]="options" [(ngModel)]="values"></nz-cascader>
```

### nz-cascader

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | selected value | any[] | - |
| `[nzAllowClear]` | whether allow clear | boolean | true |
| `[nzAutoFocus]` | whether auto focus the input box | boolean | false |
| `[nzChangeOn]` | change value on each selection if this function return `true` | function(option: any, index: number) =&gt; boolean | - |
| `[nzChangeOnSelect]` | change value on each selection if set to true, see above demo for details | boolean | false |
| `[nzColumnClassName]` | additional className of column in the popup overlay | string | - |
| `[nzDisabled]` | whether disabled select | boolean | false |
| `[nzExpandTrigger]` | expand current item when click or hover, one of 'click' 'hover' | string | 'click' |
| `[nzMenuClassName]` | additional className of popup overlay | string | - |
| `[nzMenuStyle]` | additional css style of popup overlay | object | - |
| `[nzLabelProperty]` | the label property name of options | string | 'label' |
| `[nzLabelRender]` | render template of displaying selected options | TemplateRef&lt;any&gt; | - |
| `[nzLoadData]` | To load option lazily. If setting `ngModel` with an array value and `nzOptions` is not setting, lazy load will be call immediately | (option: any, index?: index) => PromiseLike&lt;any&gt; | - |
| `[nzOptions]` | data options of cascade | object[] | - |
| `[nzPlaceHolder]` | input placeholder | string | 'Please select' |
| `[nzShowArrow]` | Whether show arrow | boolean | true |
| `[nzShowInput]` | Whether show input | boolean | true |
| `[nzShowSearch]` | Whether support search. Cannot be used with `[nzLoadData]` at the same time | `boolean` `NzShowSearchOptions` | `false` |
| `[nzSize]` | input size, one of `large` `default` `small` | string | `default` |
| `[nzValueProperty]` | the value property name of options | string | 'value' |
| `(ngModelChange)` | Emit on values change | `EventEmitter<any[]>` | - |
| `(nzClear)` | Emit on clear values | `EventEmitter<void>` | - |
| `(nzVisibleChange)` | Emit on popup menu visible or hide | `EventEmitter<boolean>` | - |
| `(nzSelect)` | Emit on select | `EventEmitter<{option: any, index: number}>` | - |
| `(nzSelectionChange)` | Emit on selection change | `EventEmitter<any[]>` | - |

When `nzShowSearch` is an object it should implements `NzShowSearchOptions`：

| Params | Explanation | Type | Default |
| --- | --- | --- | --- |
| `filter` | Optional. Be aware that all non-leaf CascaderOptions would be filtered | `(inputValue: string, path: CascaderOption[]): boolean` | - |
| `sorter` | Optional | `(a: CascaderOption[], b: CascaderOption[], inputValue: string): number` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
| closeMenu() | hide the menu |
