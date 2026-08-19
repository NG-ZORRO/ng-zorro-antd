---
category: Components
type: 其他
subtitle: 边框流光
title: BorderBeam
tag: 22.1.0
description: 在容器边缘添加装饰性的移动流光。
---

## 何时使用

- 需要突出容器，但不表达业务状态时使用。
- 适用于登录面板、推荐卡片、AI 模块和关键操作区域。
- 本组件仅提供装饰效果，不能替代焦点轮廓、校验边框或状态反馈。

## API

导入指令后，在容器上添加 `nzBorderBeam`。宿主元素需要设置 `position: relative`（或其他定位上下文）。

| 参数                    | 说明                                                                                          | 类型                                   | 默认值 |
| ----------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------- | ------ |
| `nzBorderBeam`          | 是否显示流光。                                                                                | `boolean`                              | `true` |
| `nzBorderBeamColor`     | 流光颜色。支持单色或渐变色标；`percent` 的取值范围为 `0` 到 `100`，末尾区间会保留给透明渐隐。 | `string \| NzBorderBeamGradientStop[]` | -      |
| `nzBorderBeamCount`     | 均匀分布的流光数量。                                                                          | `number`                               | `1`    |
| `nzBorderBeamDuration`  | 完成一次循环所需秒数。                                                                        | `number`                               | `6`    |
| `nzBorderBeamLineWidth` | 流光线宽；数字按像素处理。                                                                    | `number \| string`                     | `1`    |
| `nzBorderBeamOutset`    | 流光层相对宿主边缘的外扩距离；省略时跟随宿主边框宽度。                                        | `number \| string`                     | -      |
| `nzBorderBeamSize`      | 可见流光片段尺寸；数字按像素处理。                                                            | `number \| string`                     | `100`  |

### NzBorderBeamGradientStop

| 参数      | 说明                            | 类型     |
| --------- | ------------------------------- | -------- |
| `color`   | 当前色标的颜色。                | `string` |
| `percent` | 色标位置，范围为 `0` 到 `100`。 | `number` |

## FAQ

### 减少动态效果时如何表现？

浏览器启用 `prefers-reduced-motion: reduce` 时，流光会被隐藏。

### `nzBorderBeamColor` 中的 `percent` 表示什么？

`percent` 是作者定义的色标位置，范围为 `0` 到 `100`。BorderBeam 会将色标映射到可见流光片段中，并保留末尾区间作为透明渐隐。

### `nzBorderBeamSize` 有限制吗？

流光使用边长为 `nzBorderBeamSize` 的正方形渐变层。建议其小于容器较短边的两倍：`size < 2 × min(width, height)`，否则可能会在对侧边缘产生可见重叠。

### 为什么没有看到流光？

流光层使用绝对定位，因此宿主元素需要提供定位上下文。通常为添加了 `nzBorderBeam` 的元素设置 `position: relative` 即可。

### 流光如何与圆角保持一致？

效果层继承宿主元素的 `border-radius`，因此通过 class、响应式样式或 CSS 变量修改圆角时，流光会自动保持一致。
