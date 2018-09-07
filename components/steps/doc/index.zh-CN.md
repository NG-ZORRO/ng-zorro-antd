---
category: Components
subtitle: 步骤条
type: Navigation
cols: 1
title: Steps
---

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## API

```html
<nz-steps>
  <nz-step nzTitle="第一步"></nz-step>
  <nz-step nzTitle="第二步"></nz-step>
  <nz-step nzTitle="第三步"></nz-step>
</nz-steps>
```

### nz-steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzCurrent]` | 指定当前步骤，从 0 开始记数。在子 `nz-step` 元素中，可以通过 `nzStatus` 属性覆盖状态 | number | 0 |
| `[nzDirection]` | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | horizontal |
| `[nzProgressDot]` | 点状步骤条，可以设置为一个 TemplateRef | Boolean 丨 `TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>` | false |
| `[nzSize]` | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | default |
| `[nzStatus]` | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | process |
| `[nzStartIndex]` | 指定起始位置的序号 | number | 0 |

### nz-step

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDescription]` | 步骤的详情描述，可选 | string 丨 `TemplateRef<void>` | - |
| `[nzIcon]` | 步骤图标的类型，可选 | `string 丨 string[] 丨 Set<string> 丨 { [klass: string]: any; };` 丨 `TemplateRef<void>` | - |
| `[nzStatus]` | 指定状态。当不配置该属性时，会使用 `nz-steps` 的 `nzCurrent` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | wait |
| `[nzTitle]` | 标题 | string 丨 `TemplateRef<void>` | - |
