---
category: Components
type: General
title: Button
subtitle: 按钮
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## API

### [nz-button]

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`nzType` -> `nzShape` -> `nzSize` -> `nzLoading` -> `disabled`

按钮的属性说明如下：


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzGhost]` | 幽灵属性，使按钮背景透明 | boolean | false |
| `[nzLoading]` | 设置按钮载入状态 | boolean | false |
| `[nzShape]` | 设置按钮形状，可选值为 `circle` 或者不设 | string | - |
| `[nzSize]` | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | default |
| `[nzType]` | 设置按钮类型，可选值为 `primary` `dashed` `danger` 或者不设 | string | - |
| `[nzBlock]` | 将按钮宽度调整为其父宽度的选项 | boolean | false |
