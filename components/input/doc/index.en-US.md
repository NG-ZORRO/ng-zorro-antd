---
category: Components
type: Data Entry
title: Input
cover: https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg
---

A basic widget for getting the user input is a text field.
Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

```ts
import { NzInputModule } from 'ng-zorro-antd/input';
```

## API

### [nz-input]

All props of input supported by [w3c standards](https://www.w3schools.com/tags/tag_input.asp) and Angular can used in `nz-input`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzSize]` | The size of the input box. Note: in the context of a form, the `large` size is used. | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzAutosize]` | Only used for `textarea`, height autosize feature, can be set to `boolean` or an object `{ minRows: 2, maxRows: 6 }` | `boolean \| { minRows: number, maxRows: number }` | `false` |
| `[nzBorderless]` | Whether hide border | `boolean` | `false` |
| `[nzStatus]` | Set validation status | `'error' \| 'warning'` | - |

### nz-input-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAddOnAfter]` | The label text displayed after (on the right side of) the input field, can work with `nzAddOnBefore` | `string \| TemplateRef<void>` | - |
| `[nzAddOnBefore]` | The label text displayed before (on the left side of) the input field, can work with `nzAddOnAfter`   | `string \| TemplateRef<void>` | - |
| `[nzPrefix]` | The prefix icon for the Input, can work with `nzSuffix` | `string \| TemplateRef<void>` | - |
| `[nzSuffix]` | The suffix icon for the Input, can work with `nzPrefix` | `string \| TemplateRef<void>` | - |
| `[nzCompact]` | Whether use compact style | `boolean` | `false` |
| `[nzSize]` | The size of `nz-input-group` specifies the size of the included `nz-input` fields | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStatus]` | Set validation status | `'error' \| 'warning'` | - |

### nz-textarea-count

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzMaxCharacterCount]` | `textarea` maximum character count displayed | `number` | - |
| `[nzComputeCharacterCount]` | customized `characterCount` computation function | `(v: string) => number` | `v => v.length` |
