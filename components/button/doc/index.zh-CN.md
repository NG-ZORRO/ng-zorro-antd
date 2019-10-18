---
category: Components
type: 通用
title: Button
subtitle: 按钮
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzButtonModule } from 'ng-zorro-antd/button';
```

## API

### [nz-button]

> 注意：nz-button 是一个 Directive，除以下表格之外还支持例如 disabled 等原生 button 的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`nzType` -> `nzShape` -> `nzSize` -> `nzLoading` -> `disabled`

按钮的属性说明如下：


| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --- | --- | --- | --- | --- |
| `[nzGhost]` | 幽灵属性，使按钮背景透明 | `boolean` | `false` |
| `[nzLoading]` | 设置按钮载入状态 | `boolean` | `false` |
| `[nzShape]` | 设置按钮形状，可选值为 `circle` `round` 或者不设 | `'circle'\|'round'` | - | |
| `[nzSize]` | 设置按钮大小，可选值为 `small` `large` 或者不设 | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[nzType]` | 设置按钮类型，可选值为 `primary` `dashed` `danger` 或者不设 | `'primary'\|'dashed'\|'danger'\|'default'\|'link'` | `'default'` |
| `[nzBlock]` | 将按钮宽度调整为其父宽度的选项 | `boolean` | `false` |
