---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| property | description | type | default |
| -------- | ----------- | ---- | ------- |
| ngModel | current value, double binding | number ｜ string | - |
| ngModelChange | The callback triggered when the value is changed | (ngModel:number ｜ string)=>{} | - |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzDisabled | disable the input | boolean | false |
| nzMax | max vale | number | Infinity |
| nzMin | min value | number | -Infinity |
| nzFormatter | Specifies the format of the value presented | (value: number ｜ string):string=> {} | - |
| nzParser | Specifies the value extracted from nzFormatter | (value:string): number=>{} | - |
| nzPrecision | precision of input value | number | - |
| nzSize | width of input box | string | default |
| nzStep | The number to which the current value is increased or decreased. It can be an integer or decimal. | number ｜  string | 1 |

## Methods

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
