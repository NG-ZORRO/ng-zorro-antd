---
category: Components
type: Data Display
title: Carousel
subtitle: 走马灯
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzAutoPlay | 是否自动切换 | boolean | false |
| nzAfterChange | 切换面板的回调 | (current)=>{} | 无 |
| nzBeforeChange | 切换面板的回调 | (from, to)=>{} | 无 |
| nzDots | 是否显示面板指示点 | boolean | true |
| nzEffect | 动画效果函数，可取 scrollx, fade | string | scrollx |
| nzVertical | 垂直显示 | boolean | false |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板 |
| next() | 切换到下一面板 |
| pre() | 切换到上一面板 |

