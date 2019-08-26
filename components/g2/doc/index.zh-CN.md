---
category: Components
type: 数据展示
title: G2
subtitle: G2 图表
cols: 2
experimental: true
---

使用 [@antv/g2](https://github.com/antvis/g2) 绘制图表。

<blockquote style="border-color: #faad14;"><p>该组件仅提供对 G2 图表的封装，不干预图形渲染过程。如何使用 G2 绘制图表请参考<a href="https://antv.alipay.com/zh-cn/g2/3.x/index.html" target="_blank">官方文档</a>。</p></blockquote>

## API

### [nz-g2]

声明在作为容器的 DIV 标签上。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzChartOptions]` | 创建图表时传入的配置项，参考[官网文档](https://www.yuque.com/antv/g2-docs/api-chart) | `object` | - |
| `(nzChartInitialized)` | 组件初始化时的事件 | `EventEmitter<Chart>` | - |
