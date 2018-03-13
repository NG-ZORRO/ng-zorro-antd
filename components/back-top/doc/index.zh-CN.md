---
category: Components
subtitle: 回到顶部
type: Other
title: BackTop
---

返回页面顶部的操作按钮。

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## API

> 有默认样式，距离底部 `50px`，可覆盖。
> 自定义样式宽高不大于 `40px * 40px`。

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzTemplate | 自定义内容，见示例 | ng-template | - |
| nzVisibilityHeight | 滚动高度达到此参数值才出现 `nz-back-top` | number | `400` |
| nzClick | 点击按钮的回调函数 | EventEmitter | - |
| nzTarget | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | Element | `window` |
