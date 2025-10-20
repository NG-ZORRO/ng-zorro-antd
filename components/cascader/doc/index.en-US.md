---
category: Components
type: Data Entry
title: Cascader
cover: 'https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg'
description: Cascade selection box.
---

## When To Use

- When you need to select from a set of a hierarchical structure. Such as province/city/district, company level, and classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for a better user experience.

## API

```html
<nz-cascader [nzOptions]="options" [(ngModel)]="values"></nz-cascader>
```

### nz-cascader

| Property              | Description                                                                                                                            | Type                                                                  | Default           | Global Config | Version |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------- | ------------- | ------- |
| `[ngModel]`           | selected value                                                                                                                         | `any[]`                                                               | -                 |
| `[nzAllowClear]`      | whether allow clear                                                                                                                    | `boolean`                                                             | `true`            |
| `[nzAutoFocus]`       | whether auto focus the input box                                                                                                       | `boolean`                                                             | `false`           |
| `[nzBackdrop]`        | whether or not the overlay should attach a backdrop                                                                                    | `boolean`                                                             | `false`           |
| `[nzChangeOn]`        | change value on each selection if this function returns `true`                                                                         | `(option: any, index: number) => boolean`                             | -                 |
| `[nzChangeOnSelect]`  | change value on each selection if set to true, see above demo for details                                                              | `boolean`                                                             | `false`           |
| `[nzColumnClassName]` | additional className of column in the popup overlay                                                                                    | `string`                                                              | -                 |
| `[nzDisabled]`        | whether select should be disabled                                                                                                      | `boolean`                                                             | `false`           |
| `[nzExpandIcon]`      | customize the current item expand icon                                                                                                 | `string \| TemplateRef<void>`                                         | -                 |
| `[nzExpandTrigger]`   | expand current item when clicked or hovered, one of 'click' 'hover'                                                                    | `'click' \| 'hover'`                                                  | `'click'`         |
| `[nzLabelProperty]`   | the label property name of options                                                                                                     | `string`                                                              | `'label'`         |
| `[nzLabelRender]`     | render template of displaying selected options                                                                                         | `TemplateRef<any>`                                                    | -                 |
| `[nzLoadData]`        | to load option lazily. Lazy load will be called immediately if the setting is `ngModel` with an array value and `nzOptions` is not set | `(option: any, index?: index) => PromiseLike<any> \| Observable<any>` | -                 |
| `[nzMenuClassName]`   | additional className of popup overlay                                                                                                  | `string`                                                              | -                 |
| `[nzMouseEnterDelay]` | duration in milliseconds before opening the popup overlay when the mouse enters the trigger                                            | `number`                                                              | `150`             |
| `[nzMouseLeaveDelay]` | duration in milliseconds before closing the popup overlay when the mouse leaves the trigger                                            | `number`                                                              | `150`             |
| `[nzMenuStyle]`       | additional css style of popup overlay                                                                                                  | `object`                                                              | -                 |
| `[nzMultiple]`        | support multiple or not                                                                                                                | `boolean`                                                             | `false`           |
| `[nzNotFoundContent]` | specify content to show when no result matches                                                                                         | `string \| TemplateRef<void>`                                         | -                 |
| `[nzOptionRender]`    | render template of cascader options                                                                                                    | `TemplateRef<{ $implicit: NzCascaderOption, index: number }>`         |                   |
| `[nzOptions]`         | data options of cascade                                                                                                                | `object[]`                                                            | -                 |
| `[nzOpen]`            | Set visible of cascader popup                                                                                                          | `boolean`                                                             | `false`           | -             | 20.2.0  |
| `[nzPlaceHolder]`     | input placeholder                                                                                                                      | `string`                                                              | `'Please select'` |
| `[nzPlacement]`       | popup placement                                                                                                                        | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'`            | `'bottomLeft'`    |
| `[nzShowArrow]`       | whether show arrow                                                                                                                     | `boolean`                                                             | `true`            |
| `[nzShowInput]`       | whether show input                                                                                                                     | `boolean`                                                             | `true`            |
| `[nzShowSearch]`      | whether support search. Cannot be used with `[nzLoadData]` at the same time                                                            | `boolean \| NzShowSearchOptions`                                      | `false`           |
| `[nzSize]`            | input size, one of `large` `default` `small`                                                                                           | `'large' \| 'small' \| 'default'`                                     | `'default'`       | ✅            |
| `[nzStatus]`          | set validation status                                                                                                                  | `'error' \| 'warning'`                                                | -                 |
| `[nzPrefix]`          | custom prefix                                                                                                                          | `string\|TemplateRef<void>`                                           | -                 |
| `[nzSuffixIcon]`      | custom suffix icon                                                                                                                     | `string\|TemplateRef<void>`                                           | -                 |
| `[nzValueProperty]`   | value property name of options                                                                                                         | `string`                                                              | `'value'`         |
| `[nzVariant]`         | Variants of Cascader                                                                                                                   | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`              | `'outlined'`      | ✅            | 20.0.0  |
| `(ngModelChange)`     | emit on values change                                                                                                                  | `EventEmitter<any[]>`                                                 | -                 |
| `(nzClear)`           | emit on clear values                                                                                                                   | `EventEmitter<void>`                                                  | -                 |
| `(nzVisibleChange)`   | emit on popup menu visible or hide                                                                                                     | `EventEmitter<boolean>`                                               | -                 |
| `(nzRemoved)`         | emit on selected item removed when `nzMultiple` is `true`                                                                              | `EventEmitter<NzCascaderOption>`                                      | -                 |
| `(nzSelectionChange)` | emit on values change                                                                                                                  | `EventEmitter<NzCascaderOption[]>`                                    | -                 |

### Interfaces

#### NzCascaderOption

```ts
export interface NzCascaderOption {
  value?: any;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  children?: NzCascaderOption[];
  disableCheckbox?: boolean;

  [key: string]: any;
}
```

#### NzShowSearchOptions

When `nzShowSearch` is an object it should implement `NzShowSearchOptions`:

| Params   | Explanation                                                            | Type                                                                         | Default |
| -------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| `filter` | Optional. Be aware that all non-leaf CascaderOptions would be filtered | `(inputValue: string, path: NzCascaderOption[]): boolean`                    | -       |
| `sorter` | Optional                                                               | `(a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string): number` | -       |

The default filter looks as follows:

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
  });
};
```

#### Methods

| Name          | Description   |
| ------------- | ------------- |
| `blur()`      | remove focus  |
| `focus()`     | get focus     |
| `closeMenu()` | hide the menu |

## FAQ

### Q: An error is thrown when `nzLoadData` is used.

When you pass a function to `nzLoadData`, the function becomes a `NzCascaderComponent` property.
When the component calls the `nzLoadData` function, `this` is bound to nothing. You have to pass an arrow function or use `Function.bind` to bind `this` to the parent component.
[see example](https://stackoverflow.com/questions/60320913/ng-zorro-cascader-lazy-load-data-nzloaddata-function-got-this-undefined/60928983#60928983).

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
