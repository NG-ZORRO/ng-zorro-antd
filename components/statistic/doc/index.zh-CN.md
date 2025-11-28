---
category: Components
title: Statistic
subtitle: 统计
type: 数据展示
cover: 'https://gw.alipayobjects.com/zos/antfincdn/rcBNhLBrKbE/Statistic.svg'
description: 展示统计数字。
---

## 何时使用

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## API

### nz-statistic

| 参数                | 说明           | 类型                                           | 默认值  |
| ------------------- | -------------- | ---------------------------------------------- | ------- |
| `[nzPrefix]`        | 设置数值的前缀 | `string \| TemplateRef<void>`                  | -       |
| `[nzSuffix]`        | 设置数值的后缀 | `string \| TemplateRef<void>`                  | -       |
| `[nzTitle]`         | 数值的标题     | `string \| TemplateRef<void>`                  | -       |
| `[nzValue]`         | 数值内容       | `string \| number`                             | -       |
| `[nzValueStyle]`    | 设置数值的样式 | `Object`                                       | -       |
| `[nzValueTemplate]` | 自定义数值展示 | `TemplateRef<{ $implicit: string \| number }>` | -       |
| `[nzLoading]`       | 数值是否加载中 | `boolean`                                      | `false` |

### nz-countdown

| 参数                  | 说明                   | 类型                                 | 默认值       |
| --------------------- | ---------------------- | ------------------------------------ | ------------ |
| `[nzFormat]`          | 格式化倒计时展示       | `string`                             | `'HH:mm:ss'` |
| `[nzPrefix]`          | 设置数值的前缀         | `string \| TemplateRef<void>`        | -            |
| `[nzSuffix]`          | 设置数值的后缀         | `string \| TemplateRef<void>`        | -            |
| `[nzTitle]`           | 数值的标题             | `string \| TemplateRef<void>`        | -            |
| `[nzValue]`           | 时间戳格式的目标时间   | `string \| number`                   | -            |
| `[nzValueTemplate]`   | 自定义时间展示         | `TemplateRef<{ $implicit: number }>` | -            |
| `(nzCountdownFinish)` | 当倒计时完成时发出事件 | `void`                               | -            |

### nzFormat

| 占位符 | 描述 |
| ------ | ---- |
| `Y`    | 年   |
| `M`    | 月   |
| `D`    | 日   |
| `H`    | 时   |
| `m`    | 分   |
| `s`    | 秒   |
| `S`    | 毫秒 |
