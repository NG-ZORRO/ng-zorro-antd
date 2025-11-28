---
category: Components
type: Data Display
title: Empty
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/MNbKfLBVb/Empty.svg'
description: Empty state placeholder.
---

## When To Use

When there is no data provided, display for friendly tips.

## API

### nz-empty

| Property              | Description                                                   | Type                                  | Default |
| --------------------- | ------------------------------------------------------------- | ------------------------------------- | ------- |
| `[nzNotFoundImage]`   | Customize image. Will tread as image url when string provided | `string \| TemplateRef<void>`         | -       |
| `[nzNotFoundContent]` | Custom description                                            | `string \| TemplateRef<void> \| null` | -       |
| `[nzNotFoundFooter]`  | Custom Footer                                                 | `string \| TemplateRef<void>`         | -       |

### `NZ_CONFIG`

The `nzEmpty` interface has properties as follows:

| Properties              | Description                                                                                             | Type                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `nzDefaultEmptyContent` | User default empty component. You can restore the system default empty content by providing `undefined` | `Type<any> \| TemplateRef<string> \| string \| undefined` |

### InjectionToken

| Token                     | Description                                                                                         | Parameters |
| ------------------------- | --------------------------------------------------------------------------------------------------- | ---------- |
| `NZ_EMPTY_COMPONENT_NAME` | Would be injected to `NZ_DEFAULT_EMPTY_CONTENT`, telling that component its parent component's name | `string`   |

### Global Customizable Empty Content

You may notice or used some inputs like `nzNotFoundContent` in some components. Now they would use `Empty` component. So you can provide `nzDefaultEmptyContent` to customize them.

```ts
{
  provide: NZ_CONFIG,
  useValue: {
    empty: {
      nzDefaultEmptyContent
    }
  }
}
```
