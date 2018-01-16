---
category: Components
type: Data Entry
title: Switch
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| autoFocus | get focus when component mounted | boolean | false |
| checked | determine whether the `Switch` is checked | boolean | false |
| checkedChildren | content to be shown when the state is checked | string丨ReactNode |  |
| defaultChecked | to set the initial state | boolean | false |
| disabled | Disable switch | boolean | false |
| size | the size of the `Switch`, options: `default` `small` | string | default |
| unCheckedChildren | content to be shown when the state is unchecked | string丨ReactNode |  |
| onChange | a callback function, can be executed when the checked state is changing | Function(checked:Boolean) |  |
| loading | loading state of switch | boolean | false |

## Methods

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
