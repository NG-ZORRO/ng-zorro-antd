---
category: Components
type: Data Entry
title: Rate
---

Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

## API

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| nzAllowClear | whether to allow clear when click again | boolean | true |
| nzAllowHalf | whether to allow semi selection | boolean | false |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzCharacter | custom character of rate | `TemplateRef<void>` | `<i class="anticon anticon-star"></i>` |
| nzCount | star count | number | 5 |
| nzDisabled | read only, unable to interact | boolean | false |
| ngModel | current value , double binding | number | - |
| ngModelChange | callback when select value | (ngModel: number)=>{} | - |
| nzOnBlur | callback when component lose focus | (e:FocusEvent)=>{} | - |
| nzOnFocus | callback when component get focus | (e:FocusEvent)=>{} | - |
| nzOnHoverChange | callback when hover item | (value: number)=>{} | - |
| nzOnKeyDown | callback when keydown on component | (event:KeyboardEvent)=>{} | - |

## Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
