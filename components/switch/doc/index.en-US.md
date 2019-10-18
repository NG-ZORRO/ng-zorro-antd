---
category: Components
type: Data Entry
title: Switch
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzSwitchModule } from 'ng-zorro-antd/switch';
```

## API

### nz-switch

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[ngModel]` | determine whether the `nz-switch` is checked, double binding | `boolean` | `false` |
| `[nzCheckedChildren]` | content to be shown when the state is checked | `string \| TemplateRef<void>` | - |
| `[nzUnCheckedChildren]` | content to be shown when the state is unchecked | `string \| TemplateRef<void>` | - |
| `[nzDisabled]` | Disable switch | `boolean` | `false` |
| `[nzSize]` | the size of the `nz-switch`, options: `default` `small` | `'small' \| 'default'` | `'default'` | ✅ |
| `[nzLoading]` | loading state of switch | `boolean` | `false` |
| `[nzControl]` | determine whether fully control state by user  | `boolean` | `false` |
| `(ngModelChange)` | a callback function, can be executed when the checked state is changing | `EventEmitter<boolean>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
