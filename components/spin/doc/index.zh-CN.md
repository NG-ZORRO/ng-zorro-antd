---
category: Components
type: 反馈
title: Spin
subtitle: 加载中
---

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzSpinModule } from 'ng-zorro-antd/spin';
```

## API

### nz-spin

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzDelay]` | 延迟显示加载效果的时间（防止闪烁），单位：毫秒 | `number` | - |
| `[nzIndicator]` | 加载指示符 | `TemplateRef<void>` | - | ✅ |
| `[nzSize]` | 组件大小 | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzSpinning]` | 是否旋转 | `boolean` | `true` |
| `[nzSimple]` | 是否包裹元素 | `boolean` | `false` |
| `[nzTip]` | 当作为包裹元素时，可以自定义描述文案 | `string` | - |
