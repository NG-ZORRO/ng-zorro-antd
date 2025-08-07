---
category: Components
subtitle: 固钉
type: 其它
title: Affix
cover: 'https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg'
description: 将页面元素钉在可视范围。
---

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## API

### nz-affix

| 成员               | 说明                                                                      | 类型                    | 默认值   | 全局配置 |
| ------------------ | ------------------------------------------------------------------------- | ----------------------- | -------- | -------- |
| `[nzOffsetBottom]` | 距离窗口底部达到指定偏移量后触发                                          | `number`                | -        | ✅       |
| `[nzOffsetTop]`    | 距离窗口顶部达到指定偏移量后触发                                          | `number`                | `0`      | ✅       |
| `[nzTarget]`       | 设置 `nz-affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | `string \| HTMLElement` | `window` |
| `(nzChange)`       | 固定状态改变时触发的回调函数                                              | `EventEmitter<boolean>` | -        |

**注意：**`nz-affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `nz-affix` 为绝对定位：

```html
<nz-affix style="position: absolute; top: 10px, left: 10px"> ... </nz-affix>
```
