---
category: Components
subtitle: 时间轴
type: 数据展示
title: Timeline
cover: 'https://gw.alipayobjects.com/zos/antfincdn/vJmo00mmgR/Timeline.svg'
description: 垂直展示的时间流信息。
---

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## API

```html
<nz-timeline>
  <nz-timeline-item>创建服务现场 2015-09-01</nz-timeline-item>
  <nz-timeline-item>初步排除网络异常 2015-09-01</nz-timeline-item>
  <nz-timeline-item>技术测试异常 2015-09-01</nz-timeline-item>
  <nz-timeline-item>网络异常正在修复 2015-09-01</nz-timeline-item>
</nz-timeline>
```

### nz-timeline

时间轴。

| 参数             | 说明                                     | 类型                                           | 默认值                         |
| ---------------- | ---------------------------------------- | ---------------------------------------------- | ------------------------------ |
| `[nzPending]`    | 指定最后一个幽灵节点是否存在或内容       | `string \| boolean \| TemplateRef<void>`       | `false`                        |
| `[nzPendingDot]` | 当最后一个幽灵节点存在時，指定其时间图点 | `string \| TemplateRef<void>`                  | `<nz-icon nzType="loading" />` |
| `[nzReverse]`    | 节点排序                                 | `boolean`                                      | `false`                        |
| `[nzMode]`       | 可以改变时间轴和内容的相对位置           | `'left' \| 'alternate' \| 'right' \| 'custom'` | -                              |

### nz-timeline-item

时间轴的每一个节点。

| 参数           | 说明                                                               | 类型                          | 默认值   |
| -------------- | ------------------------------------------------------------------ | ----------------------------- | -------- |
| `[nzColor]`    | 指定圆圈颜色 `'blue' \| 'red' \| 'green' \| 'gray'` 或自定义的色值 | `string`                      | `'blue'` |
| `[nzDot]`      | 自定义时间轴点                                                     | `string \| TemplateRef<void>` | -        |
| `[nzPosition]` | 自定义节点位置，仅当 `nzMode` 为 `custom` 时有效                   | `'left' \| 'right'`           | -        |
| `[nzLabel]`    | 设置标签                                                           | `string \| TemplateRef<void>` | -        |
