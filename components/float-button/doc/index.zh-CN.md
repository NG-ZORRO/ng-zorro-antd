---
category: Components
subtitle: 悬浮按钮
type: 通用
title: FloatButton
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HS-wTIIwu0kAAAAAAAAAAAAADrJ8AQ/original'
tag: 19.0.0
description: 悬浮于页面上方的按钮。
---

## 何时使用

- 用于网站上的全局功能；
- 无论浏览到何处都可以看见的按钮。

## API

### 共同的 API

| 参数              | 说明                                                  | 类型                                  | 默认值      |
| ----------------- | ----------------------------------------------------- | ------------------------------------- | ----------- |
| `[nzIcon]`        | 自定义图标                                            | `string \| TemplateRef<void> \| null` | -           |
| `[nzDescription]` | 文字及其它内容                                        | `string \| TemplateRef<void> \| null` | -           |
| `[nzType]`        | 按钮类型                                              | `'default' \| 'primary'`              | `'default'` |
| `[nzShape]`       | 按钮形状                                              | `'circle' \| 'square'`                | `'circle'`  |
| `[nzHref]`        | 点击跳转的地址，指定此参数 button 的行为和 a 链接一致 | `string`                              | -           |
| `[nzTarget]`      | 相当于 a 标签的 target 属性，`nzHref` 存在时生效      | `string`                              | -           |
| `(nzOnClick)`     | 点击按钮时的回调                                      | `EventEmitter<boolean>`               | -           |

### nz-float-button-group

| 参数               | 说明                             | 类型                                     | 默认值     | 版本   |
| ------------------ | -------------------------------- | ---------------------------------------- | ---------- | ------ |
| `[nzShape]`        | 设置按钮组形状                   | `'circle' \| 'square'`                   | `'circle'` |
| `[nzTrigger]`      | 触发方式（有触发方式为菜单模式） | `'click' \| 'hover'`                     | -          |
| `[nzPlacement]`    | 自定义菜单弹出位置               | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    | 20.1.0 |
| `[nzOpen]`         | 受控展开                         | `boolean`                                | -          |
| `(nzOnOpenChange)` | 展开收起时的回调                 | `EventEmitter<boolean>`                  | -          |

### nz-float-button-top

| 参数                   | 说明                                                          | 类型                    | 默认值   | 全局配置 |
| ---------------------- | ------------------------------------------------------------- | ----------------------- | -------- | -------- |
| `[nzVisibilityHeight]` | 滚动高度达到此值时才出现 `nz-float-button-top`                | `number`                | `400`    | ✅       |
| `[nzTarget]`           | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | `string \| Element`     | `window` | -        |
| `[nzDuration]`         | 回到顶部所需时间（毫秒）                                      | `number`                | `450`    | -        |
| `(nzOnClick)`          | 点击按钮的回调函数                                            | `EventEmitter<boolean>` | -        | -        |
