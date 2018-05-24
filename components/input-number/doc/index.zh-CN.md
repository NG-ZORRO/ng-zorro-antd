---
category: Components
subtitle: 数字输入框
type: Data Entry
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ngModel | 当前值，可双向绑定 | number ｜ string | - |
| ngModelChange | 数值改变时回调 | (ngModel:number ｜ string)=>{} | - |
| nzAutoFocus | 自动获取焦点 | boolean | false |
| nzDisabled | 禁用 | boolean | false |
| nzMax | 最大值 | number | Infinity |
| nzMin | 最小值 | number | -Infinity |
| nzFormatter | 指定输入框展示值的格式 | (value: number ｜ string):string=> {} | - |
| nzParser | 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用 | (value:string): number=>{} | - |
| nzPrecision | 数值精度 | number | - |
| nzSize | 输入框大小 | string | default |
| nzStep | 每次改变步数，可以为小数 | number ｜ string | 1 |
| nzPlaceHolder | 选择框默认文字 | string | - |

## 方法

| 名称 | 描述 |
| ---- | ----------- |
| focus() | 获取焦点 |
| blur() | 移除焦点 |
