---
category: Components
subtitle: cron 表单
type: 数据录入
title: Cron Expression
cols: 1
experimental: true
description: 显示和编辑 cron 表达式。
---

## 何时使用

需要在表单中使用 cron 格式验证时使用。

## API

别忘记先安装 cron-parser：

```sh
npm install cron-parser
```

### nz-cron-expression

| 参数                  | 说明                   | 类型                          | 默认值    |
| --------------------- | ---------------------- | ----------------------------- | --------- |
| `[nzType]`            | cron 规则类型          | `'linux'｜'spring'`           | `linux`   |
| `[nzSize]`            | 设置输入框大小         | `'large'｜'small'｜'default'` | `default` |
| `[nzDisabled]`        | 禁用                   | `boolean`                     | `false`   |
| `[nzBorderless]`      | 是否隐藏边框           | `boolean`                     | `false`   |
| `[nzCollapseDisable]` | 隐藏折叠面板           | `boolean`                     | `false`   |
| `[nzExtra]`           | 自定义渲染右侧的内容   | `TemplateRef<void>`           | -         |
| `[nzSemantic]`        | 自定义渲染下次执行时间 | `TemplateRef<void>`           | -         |

## 注意

### 支持格式

```text
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31, L)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```
