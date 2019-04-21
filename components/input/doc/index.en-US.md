---
category: Components
type: Data Entry
title: Input
---

A basic widget for getting the user input is a text field.
Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzInputModule } from 'ng-zorro-antd';
```

### [nz-input]

All props of input supported by [w3c standards](https://www.w3schools.com/tags/tag_input.asp) and Angular can used in `nz-input`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSize]` | The size of the input box. Note: in the context of a form, the `large` size is used. | `'large'｜'small'｜'default'` | `'default'` |
| `[nzAutosize]` | Only used for `textarea`, height autosize feature, can be set to `boolean` or an object `{ minRows: 2, maxRows: 6 }` | `boolean｜{ minRows: number, maxRows: number }` | `false` |


### nz-input-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAddonAfter]` | The label text displayed after (on the right side of) the input field. | `string｜TemplateRef<void>` | - |
| `[nzAddonBefore]` | The label text displayed before (on the left side of) the input field. | `string｜TemplateRef<void>` | - |
| `[nzPrefix]` | The prefix icon for the Input. | `string｜TemplateRef<void>` | - |
| `[nzSuffix]` | The suffix icon for the Input. | `string｜TemplateRef<void>` | - |
| `[nzCompact]` | Whether use compact style | `boolean` | `false` |
| `[nzSize]` | The size of `nz-input-group` specifies the size of the included `nz-input` fields | `'large'｜'small'｜'default'` | `'default'` |
