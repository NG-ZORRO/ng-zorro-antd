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


## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzFormModule } from 'ng-zorro-antd';
```

### nz-form


| Property | Description | Type | Default Value |
| -------- | ----------- | ---- | ------------- |
| `[nzLayout]`| Form layout | `'horizontal'｜'vertical'｜'inline'` | `'horizontal'` |
| `[nzNoColon]`| change default props `[nzNoColon]` value of `nz-form-label` | `boolean` | `false` |


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
| `[nzColon]` | Used with `label`, whether to display `:` after label text. | `boolean` | `true` |

### nz-form-control
> Note：Due to the lack of partial Observable in [Angular Form](https://github.com/angular/angular/issues/10887), you have to notify `nz-form-control` to update its status with `updateValueAndValidity` when you update form status using methods like `markAsDirty`.

A form consists of one or more form fields whose type includes input, textarea, checkbox, radio, select, tag, and more.

> All api in [nz-col](/components/grid/zh) can be used in `nz-form-control`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[nzValidateStatus]` | Reactive Forms: Will generate status based on FormControl | `FormControl` | first `FormControl` in `nz-form-control` |
| `[nzValidateStatus]` | Template-driven Forms: The validation status | `'success'｜'warning'｜'error'｜'validating'` | - |
| `[nzHasFeedback]`| Used with `nzValidateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. | `boolean` | `false` |

From `7.3.0` version, `nz-form-control` provide `status` variable, it will switch between `'success'｜'warning'｜'error'｜'validating'` automatically according to `[nzValidateStatus]` passed in, user can get it from template reference variables.

### nz-form-explain

Validation messages


### nz-form-extra

The extra prompt message. It is similar to help.

### nz-form-split

The split icon of `-`

### nz-form-text

Text in `nz-form-control`

