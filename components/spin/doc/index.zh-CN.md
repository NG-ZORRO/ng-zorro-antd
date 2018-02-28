---
category: Components
type: Feedback
title: Spin
subtitle: 加载中
---

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDelay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | - |
| nzIndicator | 加载指示符 | `TemplateRef<void>` | - |
| nzSize | 组件大小，可选值为 `small` `default` `large` | string | 'default' |
| nzSpinning | 是否旋转 | boolean | true |
| nzTip | 当作为包裹元素时，可以自定义描述文案 | string | - |
