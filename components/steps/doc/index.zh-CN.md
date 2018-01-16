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

```jsx
<Steps>
  <Step title="第一步" />
  <Step title="第二步" />
  <Step title="第三步" />
</Steps>
```

### Steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |
| direction | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | horizontal |
| progressDot | 点状步骤条，可以设置为一个 function | Boolean or (iconDot, {index, status, title, description}) => ReactNode | false |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | default |
| status | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | process |

### Steps.Step

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 步骤的详情描述，可选 | string | ReactNode | - |
| icon | 步骤图标的类型，可选 | string | ReactNode | - |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | wait |
| title | 标题 | string | ReactNode | - |
