---
category: Components
type: Data Display
title: G2
cols: 2
experimental: true
---

Use [@antv/g2](https://github.com/antvis/g2) to draw graphs.

<blockquote style="border-color: #faad14;"><p>This component works only as a wrapper of G2. Please refer to <a href="https://antv.alipay.com/zh-cn/g2/3.x/index.html" target="_blank">the official website of G2</a>.</p></blockquote>

## API

### [nz-g2]

Declare this directive on a DIV element.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzChartOptions]` | Options when creating a new chart. Please refer to the [official website](https://www.yuque.com/antv/g2-docs-en/tutorial-creating-chart) | `object` | - |
| `(nzChartInitialized)` | When the chart initializes | `EventEmitter<Chart>` | - |
