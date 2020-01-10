---
category: Components
type: General
title: Button
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

In Ant Design we provide 4 types of button.

- Primary button: indicate the main action, one primary button at most in one section.
- Default button: indicate a series of actions without priority.
- Dashed button: used for adding action commonly.
- Link button: used for external links.

And 4 other properties additionally.

- `danger`: used for actions of risk, like deletion or authorization.
- `ghost`: used in situations with complex background, home pages usually.
- `disabled`: when actions is not available.
- `loading`: add loading spinner in button, avoiding multiple submits too.

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
| `[nzType]` | can be set to `primary` `dashed` `link` or omitted (meaning `default`) | `'primary'\|'dashed'\|'link'` | - |
| `[nzBlock]` | option to fit button width to its parent width | `boolean` | `false` |
| `[nzDanger]` | set the danger status of button | boolean | `false` |  |


### nz-button-group

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzSize]` | can be set to `small` `large` or omitted | `'large'\|'small'\|'default'` | `'default'` | - |
