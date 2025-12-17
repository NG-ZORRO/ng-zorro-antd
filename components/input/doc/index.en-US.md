---
category: Components
type: Data Entry
title: Input
tag: Update
cover: 'https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg'
description: Through mouse or keyboard input content, it is the most basic form field wrapper.
---

## When To Use

- A user input in a form field is needed.
- A search input is required.

## API

### [nz-input]

All props of input supported by [w3c standards](https://www.w3schools.com/tags/tag_input.asp) and Angular can used in `[nz-input]`.

| Property              | Description                                                                                                              | Type                                                     | Default      | Version |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------ | ------- |
| `[nzSize]`            | The size of the input box. Note: in the context of a form, the `large` size is used.                                     | `'large' \| 'small' \| 'default'`                        | `'default'`  |
| ~~`[nzAutosize]`~~    | ~~Only used for `textarea`, height autosize feature, can be set to `boolean` or an object `{ minRows: 2, maxRows: 6 }`~~ | ~~`boolean \| { minRows: number, maxRows: number }`~~    | ~~`false`~~  |
| `[nzVariant]`         | Variants of Input                                                                                                        | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'` | `'outlined'` | 20.0.0  |
| `[nzStatus]`          | Set validation status                                                                                                    | `'error' \| 'warning'`                                   | -            |
| ~~`[nzStepperless]`~~ | ~~Whether hide stepper when input type is number~~                                                                       | ~~`boolean`~~                                            | ~~`true`~~   |

#### Methods

You can get instance by `ViewChild`

| Name           | Description  | Parameters                                                                   |
| -------------- | ------------ | ---------------------------------------------------------------------------- |
| focus(option?) | get focus    | `(option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' })` |
| blur()         | remove focus | -                                                                            |

### nz-input-wrapper

Use when you need to add extra functionality to `[nz-input]`.

| Property          | Description                                                           | Type                     | Default |
| ----------------- | --------------------------------------------------------------------- | ------------------------ | ------- |
| `[nzAddonBefore]` | The label text displayed before (on the left side of) the input field | `string`                 | -       |
| `[nzAddonAfter]`  | The label text displayed after (on the right side of) the input field | `string`                 | -       |
| `[nzPrefix]`      | The prefix icon for the Input                                         | `string`                 | -       |
| `[nzSuffix]`      | The suffix icon for the Input                                         | `string`                 | -       |
| `[nzAllowClear]`  | If allow to remove input content with clear icon                      | `boolean`                | `false` |
| `(nzClear)`       | Event emitted when the clear icon is clicked                          | `OutputEmitterRef<void>` | -       |

### nz-input-password

All properties of `nz-input-wrapper` can be used.

| Property               | Description                                               | Type                        | Default |
| ---------------------- | --------------------------------------------------------- | --------------------------- | ------- |
| `[nzVisibilityToggle]` | Whether to show the toggle button                         | `boolean`                   | `true`  |
| `[nzVisible]`          | Whether the password is visible, supports two-way binding | `boolean`                   | `false` |
| `(nzVisibleChange)`    | Event emitted when the visibility of the password changes | `OutputEmitterRef<boolean>` | -       |

### nz-input-search

All properties of `nz-input-wrapper` can be used.

| Property          | Description                                                                                                                              | Type                                                          | Default |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| `[nzEnterButton]` | false displays the default button color, true uses the primary color, or you can provide a custom button. Conflicts with `nzAddonAfter`. | `boolean \| string`                                           | `false` |
| `[nzLoading]`     | Search box with loading                                                                                                                  | `boolean`                                                     | `false` |
| `(nzSearch)`      | The event triggered when you click on the search-icon, the clear-icon or press the Enter key                                             | `{ value: string, event: Event, source: 'clear' \| 'input' }` |         |

### nz-input-group

> ⚠️ `nz-input-group` has been deprecated in `v20.0.0` and will be removed in `v22.0.0`. Please use the `nz-input-wrapper` component instead.

| Property          | Description                                                                                          | Type                              | Default     |
| ----------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `[nzAddOnAfter]`  | The label text displayed after (on the right side of) the input field, can work with `nzAddOnBefore` | `string \| TemplateRef<void>`     | -           |
| `[nzAddOnBefore]` | The label text displayed before (on the left side of) the input field, can work with `nzAddOnAfter`  | `string \| TemplateRef<void>`     | -           |
| `[nzPrefix]`      | The prefix icon for the Input, can work with `nzSuffix`                                              | `string \| TemplateRef<void>`     | -           |
| `[nzSuffix]`      | The suffix icon for the Input, can work with `nzPrefix`                                              | `string \| TemplateRef<void>`     | -           |
| `[nzSize]`        | The size of `nz-input-group` specifies the size of the included `nz-input` fields                    | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStatus]`      | Set validation status                                                                                | `'error' \| 'warning'`            | -           |

### nz-textarea-count

| Property                    | Description                                      | Type                    | Default         |
| --------------------------- | ------------------------------------------------ | ----------------------- | --------------- |
| `[nzMaxCharacterCount]`     | `textarea` maximum character count displayed     | `number`                | -               |
| `[nzComputeCharacterCount]` | customized `characterCount` computation function | `(v: string) => number` | `v => v.length` |

### nz-input-otp

| Property        | Description                                             | Type                              | Default     |
| --------------- | ------------------------------------------------------- | --------------------------------- | ----------- |
| `[disabled]`    | Whether the input is disabled                           | `boolean`                         | `false`     |
| `[nzFormatter]` | Format display, blank fields will be filled with ` `    | `(value: string) => string`       | -           |
| `[nzMask]`      | Custom display, the original value will not be modified | `boolean  \| null`                | `null`      |
| `[nzLength]`    | The number of input elements                            | `number`                          | `6`         |
| `[nzStatus]`    | Set validation status                                   | `'error' \| 'warning'`            | -           |
| `[nzSize]`      | The size of the input box                               | `'large' \| 'small' \| 'default'` | `'default'` |

## Q&A

### How to use compact input group?

`nz-input-group` is no longer support compact mode directly in v20, you can use [nz-space-compact](/components/space/en#components-space-demo-compact) instead.

### NG0951 Error

If you attempt to dynamically render `nz-input` inside `nz-input-wrapper` using `ngTemplateOutlet` or similar methods, you may encounter the `NG0951` error.
This is because Angular's Content Projection and Child Query mechanisms are static and cannot recognize dynamically rendered components (Reference: [angular/angular#64504](https://github.com/angular/angular/issues/64504)).

Since `nz-input-wrapper` relies on content child queries to locate `nz-input`, it is recommended to treat `nz-input-wrapper` and `nz-input` as a single unit and avoid rendering them separately.

```html
@if (need_affix_or_addon) {
<nz-input-wrapper nzAddonBefore="...">
  <input nz-input />
</nz-input-wrapper>
} @else {
<input nz-input />
}
```
