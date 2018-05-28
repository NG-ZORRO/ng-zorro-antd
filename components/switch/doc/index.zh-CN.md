---
category: Components
subtitle: 开关
type: Data Entry
title: Switch
---

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ngModel | 指定当前是否选中，可双向绑定 | boolean | false |
| ngModelChange | 当前是否选中的回调 | (ngModel:boolean)=>{} | false |
| nzCheckedChildren | 选中时的内容 | string丨`TemplateRef<void>` |  |
| nzUnCheckedChildren | 非选中时的内容 | string丨`TemplateRef<void>` |  |
| nzDisabled | disable 状态 | boolean | false |
| nzSize | 开关大小，可选值：`default` `small` | string | `default` |
| nzLoading | 加载中的开关 | boolean | false |
| nzControl | 是否完全由用户控制状态 | boolean | false |

## 方法

| 名称 | 描述 |
| ---- | ----------- |
| focus() | 获取焦点 |
| blur() | 移除焦点 |
