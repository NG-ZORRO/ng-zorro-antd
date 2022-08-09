---
category: Components
type: Data Entry
title: Cascader
cover: https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg
---

Cascade selection box.

## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

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
| `[nzBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |
| `[nzChangeOn]` | change value on each selection if this function return `true` | `(option: any, index: number) => boolean` | - |
| `[nzChangeOnSelect]` | change value on each selection if set to true, see above demo for details | `boolean` | `false` |
| `[nzColumnClassName]` | additional className of column in the popup overlay | `string` | - |
| `[nzDisabled]` | whether disabled select | `boolean` | `false` |
| `[nzExpandIcon]` | Customize the current item expand icon | `string\|TemplateRef<void>` | - |
| `[nzExpandTrigger]` | expand current item when click or hover, one of 'click' 'hover' | `'click'\|'hover'` | `'click'` |
| `[nzLabelProperty]` | the label property name of options | `string` | `'label'` |
| `[nzLabelRender]` | render template of displaying selected options | `TemplateRef<any>` | - |
| `[nzLoadData]` | To load option lazily. If setting `ngModel` with an array value and `nzOptions` is not setting, lazy load will be call immediately | `(option: any, index?: index) => PromiseLike<any>` | - |
| `[nzMenuClassName]` | additional className of popup overlay | `string` | - |
| `[nzMenuStyle]` | additional css style of popup overlay | `object` | - |
| `[nzNotFoundContent]` | Specify content to show when no result matches. | `string\|TemplateRef<void>` | - |
| `[nzOptionRender]` | render template of cascader options | `TemplateRef<{ $implicit: NzCascaderOption, index: number }>` | |
| `[nzOptions]` | data options of cascade | `object[]` | - |
| `[nzPlaceHolder]` | input placeholder | `string` | `'Please select'` |
| `[nzShowArrow]` | Whether show arrow | `boolean` | `true` |
| `[nzShowInput]` | Whether show input | `boolean` | `true` |
| `[nzShowSearch]` | Whether support search. Cannot be used with `[nzLoadData]` at the same time | `boolean\|NzShowSearchOptions` | `false` |
| `[nzSize]` | input size, one of `large` `default` `small` | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[nzStatus]` | Set validation status | `'error' \| 'warning'` | - |
| `[nzSuffixIcon]` | 	The custom suffix icon | `string\|TemplateRef<void>` | - |
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

The default filter is like:

```ts
const defaultFilter: NzCascaderFilter = (i, p) => {
  return p.some(o => {
    const label = o.label;
    return !!label && label.indexOf(i) !== -1;
  });
};
```

For example, if you would like to ignore lower or upper case, you could use a filter function like this:

```ts
const filter: NzCascaderFilter = (i, p) => {
  return p.some(o => {
    const label = o.label;
    return !!label && label.toLowerCase().indexOf(i.toLowerCase()) !== -1;
  })
}
```

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
| closeMenu() | hide the menu |


## FAQ

### Q: An error is thrown when `nzLoadData` is used.

When you pass a function to `nzLoadData`, this function becomes a property of `NzCascaderComponent`. When the cascader component calls this method, `this` in in the function is bound to nothing. To fix this, you should pass an arrow function or use `Function.bind` to bind `this`. [An example](https://stackoverflow.com/questions/60320913/ng-zorro-cascader-lazy-load-data-nzloaddata-function-got-this-undefined/60928983#60928983).
