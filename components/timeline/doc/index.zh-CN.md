---
category: Components
subtitle: 时间轴
type: Data Display
title: Timeline
---

垂直展示的时间流信息。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzPending]` | 指定最后一个幽灵节点是否存在或内容 | boolean｜string｜`TemplateRef<void>` | false |

### nz-timeline-item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzColor]` | 指定圆圈颜色 `blue, red, green`，或自定义的色值(CSS 颜色) | string | blue |
| `[nzDot]` | 自定义时间轴点 | string｜`TemplateRef<void>` | - |
