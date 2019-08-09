---
category: Components
subtitle: 时间轴
type: 数据展示
title: Timeline
---

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
```

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
| `[nzPending]` | 指定最后一个幽灵节点是否存在或内容 | `string \| boolean \| TemplateRef<void>` | `false` |
| `[nzPendingDot]` | 当最后一个幽灵节点存在時，指定其时间图点 | `string \| TemplateRef<void>` | `<i nz-icon nzType="loading"></i>` |
| `[nzReverse]` | 节点排序 | `boolean` | `false` |
| `[nzMode]` | 可以改变时间轴和内容的相对位置 | `'left' \| 'alternate' \| 'right'` | - |

### nz-timeline-item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzColor]` | 指定圆圈颜色 `'blue' \| 'red' \| 'green' \| 'gray'`，或自定义的色值 (CSS 颜色) | `string` | blue |
| `[nzDot]` | 自定义时间轴点 | `string \| TemplateRef<void>` | - |
