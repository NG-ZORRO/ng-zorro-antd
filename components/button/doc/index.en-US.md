---
category: Components
type: General
title: Button
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzButtonModule } from 'ng-zorro-antd/button';
```

## API

### [nz-button]

> Note：nz-button is Directive, it accepts all props which native button [support](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).

To get a customized button, just set `nzType`/`nzShape`/`nzSize`/`nzLoading`/`disabled`.

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzGhost]` | make background transparent and invert text and border colors | `boolean` | `false` |
| `[nzLoading]` | set the loading status of button | `boolean` | `false` |
| `[nzShape]` | can be set to `circle` `round` or omitted | `'circle'\|'round'` | - | |
| `[nzSize]` | can be set to `small` `large` or omitted | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[nzType]` | can be set to `primary` `dashed` `danger` or omitted (meaning `default`) | `'primary'\|'dashed'\|'danger'\|'default'\|'link'` | `'default'` |
| `[nzBlock]` | option to fit button width to its parent width | `boolean` | `false` |
