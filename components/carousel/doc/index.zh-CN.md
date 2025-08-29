---
category: Components
type: 数据展示
title: Carousel
subtitle: 走马灯
cover: 'https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg'
description: 一组轮播的区域。
---

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

### nz-carousel

| 参数                | 说明                                               | 类型                                         | 默认值      | 支持全局配置 |
| ------------------- | -------------------------------------------------- | -------------------------------------------- | ----------- | ------------ |
| `[nzAutoPlay]`      | 是否自动切换                                       | `boolean`                                    | `false`     | ✅           |
| `[nzAutoPlaySpeed]` | 切换时间(毫秒)，当设置为 0 时不切换                | `number`                                     | `3000`      | ✅           |
| `[nzDotRender]`     | Dot 渲染模板                                       | `TemplateRef<{ $implicit: number }>`         | -           |
| `[nzDotPosition]`   | 面板指示点位置，可选 `top` `bottom` `left` `right` | `'top' \| 'right' \| 'bottom' \| 'left'`     | `'bottom'`  | ✅           |
| `[nzDots]`          | 是否显示面板指示点                                 | `boolean`                                    | `true`      | ✅           |
| `[nzEffect]`        | 动画效果函数，可取 `scrollx`, `fade`               | `'scrollx' \| 'fade'`                        | `'scrollx'` | ✅           |
| `[nzEnableSwipe]`   | 是否支持手势划动切换                               | `boolean`                                    | `true`      | ✅           |
| `[nzLoop]`          | 是否支持循环                                       | `boolean`                                    | `true`      | ✅           |
| `[nzArrows]`        | 是否显示箭头按钮                                   | `boolean`                                    | `false`     | -            |
| `(nzAfterChange)`   | 切换面板的回调                                     | `EventEmitter<number>`                       | -           |
| `(nzBeforeChange)`  | 切换面板的回调                                     | `EventEmitter<{ from: number; to: number }>` | -           |

#### 方法

| 名称                | 描述           |
| ------------------- | -------------- |
| `goTo(slideNumber)` | 切换到指定面板 |
| `next()`            | 切换到下一面板 |
| `pre()`             | 切换到上一面板 |

### InjectionToken

| Token                           | 说明                     | 参数                             | 默认值 |
| ------------------------------- | ------------------------ | -------------------------------- | ------ |
| `NZ_CAROUSEL_CUSTOM_STRATEGIES` | 提供用户自定义的切换效果 | `CarouselStrategyRegistryItem[]` | -      |

### 自定义切换效果

你可以提供自定义的切换效果，切换效果应当继承 `NzCarouselBaseStrategy` 类（默认的两种切换效果同样基于该类）。
