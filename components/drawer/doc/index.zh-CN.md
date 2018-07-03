---
type: Feedback
category: Components
subtitle: 抽屉
title: Drawer
---

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

## 何时使用


* 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
* 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。


## API

### nz-drawer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzClosable]` | 是否显示右上角的关闭按钮 | `boolean` | `true` |
| `[nzMaskClosable]` | 点击蒙层是否允许关闭 | `boolean` | `true` |
| `[nzMask]` | 是否展示遮罩 | `boolean` | `true` |
| `[nzMaskStyle]` | 遮罩样式 | `object` | `{}` |
| `[nzBodyStyle]` | Modal body 样式 | `object` | `{}` |
| `[nzTitle]` | 标题 | `string`  `TemplateRef<{}>` | - |
| `[nzVisible]` | Drawer 是否可见 | `boolean` | - |
| `[nzWidth]` | 宽度 | `number` `string` | `256` |
| `[nzWrapClassName]` | 对话框外层容器的类名 | `string` | - |
| `[nzZIndex]` | 设置 Drawer 的 `z-index` | `number` | `1000` |
| `[nzPlacement]` | 抽屉的方向 | `'left'` `'right'` | `'right'` |
| `[nzOffsetX]` | x 坐标移量(px) | `number` | `0` |
| `(nzOnClose)` | 点击遮罩层或右上角叉或取消按钮的回调 | `EventEmitter<MouseEvent>` | - |
