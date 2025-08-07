---
category: Components
subtitle: 开关
type: 数据录入
title: Switch
cover: 'https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Switch.svg'
description: 使用开关切换两种状态之间。
---

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### nz-switch

| 参数                    | 说明                                | 类型                          | 默认值      | 全局配置 |
| ----------------------- | ----------------------------------- | ----------------------------- | ----------- | -------- |
| `[nzId]`                | 组件内部 button 的 id 值            | `string`                      | -           |
| `[ngModel]`             | 指定当前是否选中，可双向绑定        | `boolean`                     | `false`     |
| `[nzCheckedChildren]`   | 选中时的内容                        | `string \| TemplateRef<void>` | -           |
| `[nzUnCheckedChildren]` | 非选中时的内容                      | `string \| TemplateRef<void>` | -           |
| `[nzDisabled]`          | disable 状态                        | `boolean`                     | `false`     |
| `[nzSize]`              | 开关大小，可选值：`default` `small` | `'small' \| 'default'`        | `'default'` | ✅       |
| `[nzLoading]`           | 加载中的开关                        | `boolean`                     | `false`     |
| `[nzControl]`           | 是否完全由用户控制状态              | `boolean`                     | `false`     |
| `(ngModelChange)`       | 当前是否选中的回调                  | `EventEmitter<boolean>`       | `false`     |

#### 方法

| 名称    | 描述     |
| ------- | -------- |
| focus() | 获取焦点 |
| blur()  | 移除焦点 |
