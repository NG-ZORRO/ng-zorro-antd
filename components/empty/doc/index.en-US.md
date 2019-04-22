---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzEmptyModule } from 'ng-zorro-antd';
```

### nz-empty

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzNotFoundImage]` | Customize image. Will tread as image url when string provided | `string` ｜ `TemplateRef<void>` | - |
| `[nzNotFoundContent]` | Custom description | `string` ｜ `TemplateRef<void>` | - |
| `[nzNotFoundFooter]` | Custom Footer | `string` ｜ `TemplateRef<void>` | - |

### NzEmptyService

| Methods/Properties | Description | Parameters |
| -------- | ----------- | ---- |
| `setDefaultContent` | To set the default empty content. The parent component name would be passed to the template. | `TemplateRef<string>` ｜ `string` |
| `resetDefault` | Reset default empty content | - |

### InjectionToken

| Token | Description | Parameters |
| ----- | --- | ---- |
| `NZ_DEFAULT_EMPTY_CONTENT` | To provide a user default empty component | `Component` ｜ `string` |
| `NZ_EMPTY_COMPONENT_NAME` | Would be injected to `NZ_DEFAULT_EMPTY_CONTENT`, telling that component its parent component's name | `string` |

### Global Customizable Empty Content

You may notice or used some inputs like `nzNotFoundContent` in some components. Now they would use `Empty` component. And you can even render a user default empty component, either by providing a `NZ_DEFAULT_EMPTY_CONTENT` in your root module or invoke `setDefaultEmptyContent`.

