---
category: Components
type: 通用
title: Button
subtitle: 按钮
---
按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Ant Design 中，我们有四种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 链接按钮：用于次要或外链的行动点。

以及四种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

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
| `[nzType]` | 设置按钮类型，可选值为 `primary` `dashed` `link` 或者不设 | `'primary'\|'dashed'\|'link'` | - |
| `[nzBlock]` | 将按钮宽度调整为其父宽度的选项 | `boolean` | `false` |
| `[nzDanger]` | 设置危险按钮 | boolean | `false` |  |


### nz-button-group

| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --- | --- | --- | --- | --- |
| `[nzSize]` | 设置按钮大小，可选值为 `small` `large` 或者不设 | `'large'\|'small'\|'default'` | `'default'` | - |
