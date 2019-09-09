---
category: Components
type: Data Entry
cols: 1
title: Form
---

Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.

Form is totally based on [Angular Forms](https://angular.io/guide/forms#forms), you can use [reactive forms](https://angular.io/guide/reactive-forms#reactive-forms) or [template-driven-forms](https://angular.io/guide/forms#template-driven-forms).

> Please make sure you have read the official form document before using the component.

## Form

You can align the controls of a `form` using the `layout` prop：

- `horizontal`：to horizontally align the `label`s and controls of the fields. (Default)
- `vertical`：to vertically align the `label`s and controls of the fields.
- `inline`：to render form fields in one line.

### nz-form-item

Used to separate the item in forms, contains label(optional) and control field.

### nz-form-label

The label of the form item, optional.

### nz-form-control

A form consists of one or more form fields whose type includes input, textarea, checkbox, radio, select, tag, and more.

```html
<form nz-form>
  <nz-form-item>
    <nz-form-label [nzSpan]="6" nzFor="email">E-mail</nz-form-label>
    <nz-form-control [nzSpan]="14">
      <input nz-input name="email" type="email" id="email">
    </nz-form-control>
  </nz-form-item >
</form>
```

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzFormModule } from 'ng-zorro-antd/form';
```

## API

### [nz-form]

| Property | Description | Type | Default Value | Global Config |
| -------- | ----------- | ---- | ------------- | ------------- |
| `[nzLayout]`| Form layout | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| `[nzNoColon]`| change default props `[nzNoColon]` value of `nz-form-label` | `boolean` | `false` | ✅ |


### nz-form-item

Used to separate the item in forms, contains label(optional) and control field.

> All api in [nz-row](/components/grid/zh) can be used in `nz-form-item`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[nzFlex]`| display flex | `boolean` | `false` |

### nz-form-label

The label of the form item, optional.

> All api in [nz-col](/components/grid/zh) can be used in `nz-form-label`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[nzRequired]`| add required style to current item | `boolean` | `false` |
| `[nzNoColon]`| whether to not display `:` after label text. | `boolean` | `false` |
| `[nzFor]`| The `for` property of `label` | `string` | - |

### nz-form-control
> Note：Due to the lack of partial Observable in [Angular Form](https://github.com/angular/angular/issues/10887), you have to notify `nz-form-control` to update its status with `updateValueAndValidity` when you update form status using methods like `markAsDirty`.

A form consists of one or more form fields whose type includes input, textarea, checkbox, radio, select, tag, and more.

> All api in [nz-col](/components/grid/zh) can be used in `nz-form-control`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[nzValidateStatus]` | Will generate status based on the input `FormControl`, `NgModel` or string, the default value is the first `FormControl` or `NgModel` in `nz-form-control` | `'success' \| 'warning' \| 'error' \| 'validating'  \|  FormControl  \|  NgModel` | first `FormControl` or `NgModel` in `nz-form-control` |
| `[nzHasFeedback]`| Used with `nzValidateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. | `boolean` | `false` |
| `[nzExtra]`| The extra prompt message | `string  \|  TemplateRef<void>` | - |
| `[nzSuccessTip]`| Tip display when validate success  | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[nzWarningTip]`| Tip display when validate warning | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[nzErrorTip]`| Tip display when validate error | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[nzValidatingTip]`| Tip display when validating | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |

### nz-form-split

The split icon of `-`

### nz-form-text

Text in `nz-form-control`

