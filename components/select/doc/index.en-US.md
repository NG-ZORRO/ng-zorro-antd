---
category: Components
type: Data Entry
title: Select
---

Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/en) is recommended when there are fewer total options (less than 5).

## API

```html
<nz-select>
  <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
</nz-select>
```

### Select props

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Current selected nz-option value, double binding. | `any 丨 any[]` | - |
| ngModelChange | Current selected nz-option value change callback. | (ngModel:`any 丨 any[]`)=>{} | - |
| compareWith | Same as [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection) | (o1: any, o2: any) => boolean | (o1: any, o2: any) => o1===o2 |
| nzAllowClear | Show clear button. | boolean | false |
| nzOpen | dropdown expand state, double binding | boolean | false |
| nzOpenChange | dropdown expand change callback | (nzOpen:boolean)=>{} | false |
| nzAutoFocus | Get focus by default | boolean | false |
| nzDisabled | Whether disabled select | boolean | false |
| nzDropdownClassName | className of dropdown menu | string | - |
| nzDropdownMatchSelectWidth | Whether dropdown's with is same with select. | boolean | true |
| nzDropdownStyle | style of dropdown menu | object | - |
| nzServerSearch | nz-option will not be filtered when set to true | boolean | false |
| nzFilterOption | Filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | `(input?: string, option?: NzOptionComponent) => boolean;` | - |
| nzMaxMultipleCount |  Max selected option can be selected | number | Infinity |
| nzMode | Set mode of Select | 'multiple' 丨 'tags' 丨 'default' | 'default' |
| nzNotFoundContent | Specify content to show when no result matches.. | string | 'Not Found' |
| nzPlaceHolder | Placeholder of select | string | - |
| nzShowSearch | Whether show search input in single mode. | boolean | false |
| nzSize | Size of Select input. `default` `large` `small` | string | default |
| nzScrollToBottom | Called when dropdown scrolls to bottom | ()=>{} | - |
| nzOnSearch | Callback function that is fired when input changed. | (inputValue: string)=>{} |  |


### nz-option

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDisabled | Disable this option | boolean | false |
| nzLabel | The text show in nz-select and dropdown menu | string | - |
| nzValue | The value passed to ngModel of nz-select | any | - |
| nzCustomContent | Whether custom nz-option content in drodown menu, the ng-content in nz-option will relace nzLabel when it was set to true | boolean | false |

### nz-option-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzLabel | Group label | string丨`TemplateRef<void>` | - |

## Methods

### nz-select

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
