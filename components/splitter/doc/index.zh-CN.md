---
category: Components
type: 布局
title: Splitter
subtitle: 分隔面板
tag: 19.2.0
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original'
description: 自由切分指定区域。
---

## 何时使用

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## API

### nz-splitter

| 参数              | 说明             | 类型                         | 默认值         |
| ----------------- | ---------------- | ---------------------------- | -------------- |
| `[nzLayout]`      | 布局方向         | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `[nzLazy]`        | 延迟渲染模式     | `boolean`                    | `false`        |
| `(nzResizeStart)` | 开始拖拽之前回调 | `EventEmitter<number[]>`     | -              |
| `(nzResize)`      | 面板大小变化回调 | `EventEmitter<number[]>`     | -              |
| `(nzResizeEnd)`   | 拖拽结束回调     | `EventEmitter<number[]>`     | -              |

### nz-splitter-panel

| 参数              | 说明                                              | 类型                                             | 默认值  |
| ----------------- | ------------------------------------------------- | ------------------------------------------------ | ------- |
| `[nzDefaultSize]` | 初始面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string`                               | -       |
| `[nzMin]`         | 最小阈值，支持数字 px 或者文字 '百分比%' 类型     | `number \| string`                               | -       |
| `[nzMax]`         | 最大阈值，支持数字 px 或者文字 '百分比%' 类型     | `number \| string`                               | -       |
| `[nzSize]`        | 受控面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string`                               | -       |
| `[nzCollapsible]` | 快速折叠                                          | `boolean  \| { start?: boolean; end?: boolean }` | `false` |
| `[nzResizable]`   | 是否开启拖拽伸缩                                  | `boolean`                                        | `true`  |
