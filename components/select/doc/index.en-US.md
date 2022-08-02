---
category: Components
type: Data Entry
title: Select
cover: https://gw.alipayobjects.com/zos/alicdn/_0XzgOis7/Select.svg
---

Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/en) is recommended when there are fewer total options (less than 5).

```ts
import { NzSelectModule } from 'ng-zorro-antd/select';
```

## API

```html
<nz-select>
  <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
</nz-select>
```

### nz-select

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------- |
| `[nzId]` | input id attribute inside the component| `string` | - |
| `[ngModel]` | Current selected nz-option value, double binding. | `any \| any[]` | - |
| `[compareWith]` | Same as [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection) | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |
| `[nzAutoClearSearchValue]` | Whether the current search will be cleared on selecting an item. Only applies when `mode` is set to `multiple` or `tags`. | `boolean` | `true` |
| `[nzAllowClear]` | Show clear button. | `boolean` | `false` |
| `[nzBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |
| `[nzBorderless]` | whether has borderless style | `boolean` | `false` | ✅ |
| `[nzOpen]` | dropdown expand state, double binding | `boolean` | `false` |
| `[nzAutoFocus]` | Get focus by default | `boolean` | `false` |
| `[nzDisabled]` | Whether disabled select | `boolean` | `false` |
| `[nzDropdownClassName]` | className of dropdown menu | `string` | - |
| `[nzDropdownMatchSelectWidth]` | Whether dropdown's width is same width than select. | `boolean` | `true` |
| `[nzDropdownStyle]` | style of dropdown menu | `object` | - |
| `[nzCustomTemplate]` | The custom template of select | `TemplateRef<{ $implicit: NzOptionComponent }>` | - |
| `[nzServerSearch]` | nz-option will not be filtered when set to true | `boolean` | `false` |
| `[nzFilterOption]` | Filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | `(input?: string, option?: NzOptionComponent) => boolean;` | - |
| `[nzMaxMultipleCount]` |  Max selected option can be selected | `number` | `Infinity` |
| `[nzMode]` | Set mode of Select | `'multiple' \| 'tags' \| 'default'` | `'default'` |
| `[nzNotFoundContent]` | Specify content to show when no result matches.. | `string  \|  TemplateRef<void>` | `'Not Found'` |
| `[nzPlaceHolder]` | Placeholder of select | `string` | - |
| `[nzShowArrow]` | Whether to show the drop-down arrow | `boolean` | `true`(for single select), `false`(for multiple select) |
| `[nzShowSearch]` | Whether show search input in single mode. | `boolean` | `false` |
| `[nzSize]` | Size of Select input | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStatus]` | Set validation status | `'error' \| 'warning'` | - |
| `[nzSuffixIcon]` | The custom suffix icon | `TemplateRef<any> \| string` | - |  ✅ |
| `[nzRemoveIcon]` | The custom remove icon | `TemplateRef<any>` | - |
| `[nzClearIcon]` | The custom clear icon | `TemplateRef<any>` | - |
| `[nzMenuItemSelectedIcon]` | The custom menuItemSelected icon | `TemplateRef<any>` | - |
| `[nzTokenSeparators]` | Separator used to tokenize on tag/multiple mode | `string[]` | `[]` |
| `[nzLoading]` | indicate loading state | `boolean` | false |
| `[nzMaxTagCount]` | Max tag count to show| `number` | - |
| `[nzOptions]` | use nzOptions or `nz-option` to pass options to the select  | `Array<{ label: string  \| number \| TemplateRef<any>; value: any; disabled?: boolean; hide?: boolean; groupLabel?: string \| TemplateRef<any>;}>` | - |
| `[nzMaxTagPlaceholder]` | Placeholder for not showing tags | `TemplateRef<{ $implicit: any[] }>` | - |
| `[nzOptionHeightPx]` | Each option height inside the dropdown | `number` | `32` |
| `[nzOptionOverflowSize]` | Max option size inside the dropdown, overflow when exceed the size | `number` | `8` |
| `(ngModelChange)` | Current selected nz-option value change callback. | `EventEmitter<any[]>` | - |
| `(nzOpenChange)` | dropdown expand change callback | `EventEmitter<boolean>` | `false` |
| `(nzScrollToBottom)` | Called when dropdown scrolls to bottom | `EventEmitter<any>` | - |
| `(nzOnSearch)` | Callback function that is fired when input changed. | `EventEmitter<string>` | - |
| `(nzFocus)` | focus callback | `EventEmitter<any>` | - |
| `(nzBlur)` | blur callback | `EventEmitter<any>` | - |

### nz-option

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDisabled]` | Disable this option | `boolean` | `false` |
| `[nzLabel]` | The text show in nz-select and dropdown menu | `string  \| number` | - |
| `[nzValue]` | The value passed to ngModel of nz-select | `any ` | - |
| `[nzHide]` | Whether hide the option in the option list | `boolean` | `false` |
| `[nzCustomContent]` | Whether custom nz-option content in drodown menu, the ng-content in nz-option will replace nzLabel when it was set to true | `boolean` | `false` |

### nz-option-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzLabel]` | Group label | `string  \| number \| TemplateRef<void>` | - |

## Methods

### nz-select

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
