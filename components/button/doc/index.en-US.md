---
category: Components
type: General
title: Button
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## API

### [nz-button]

To get a customized button, just set `nzType`/`nzShape`/`nzSize`/`nzLoading`/`disabled`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzGhost]` | make background transparent and invert text and border colors | boolean | false |
| `[nzLoading]` | set the loading status of button | boolean | false |
| `[nzShape]` | can be set to `circle` or omitted | string | - |
| `[nzSize]` | can be set to `small` `large` or omitted | string | `default` |
| `[nzType]` | can be set to `primary` `ghost` `dashed` `danger` or omitted (meaning `default`) | string | `default` |
| `[nzBlock]` | option to fit button width to its parent width | boolean | false |
