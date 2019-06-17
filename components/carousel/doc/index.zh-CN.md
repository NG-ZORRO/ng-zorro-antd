---
category: Components
type: 数据展示
title: Carousel
subtitle: 走马灯
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

### 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzCarouselModule } from 'ng-zorro-antd';
```

### nz-carousel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| `[nzAutoPlay]` | 是否自动切换 | `boolean` | `false` | |
| `[nzAutoPlaySpeed]` | 切换时间(毫秒)，当设置为0时不切换 | `number` | `3000` | |
| `[nzDotRender]` | Dot渲染模板 | `TemplateRef<{ $implicit: number }>` | - | |
| `[nzDotPosition]` | 面板指示点位置，可选 `top` `bottom` `left` `right` | `string` | `bottom` | 8.0.0 | |
| `[nzDots]` | 是否显示面板指示点 | `boolean` | `true` | |
| `[nzEffect]` | 动画效果函数，可取 `scrollx`, `fade` | `'scrollx'\|'fade'`|`'scrollx'` | |
| `[nzEnableSwipe]` | 是否支持手势划动切换 | `boolean` | `true` | |
| `(nzAfterChange)` | 切换面板的回调 | `EventEmitter<number>` | - | |
| `(nzBeforeChange)` | 切换面板的回调 | `EventEmitter<{ from: number; to: number }>` | - | |

#### 方法

| 名称 | 描述 |
| --- | --- |
| `goTo(slideNumber)` | 切换到指定面板 |
| `next()` | 切换到下一面板 |
| `pre()` | 切换到上一面板 |

### InjectionToken

| Token | 说明 | 参数 | 默认值 | 
| ----- | --- | ---- | --- |
| `NZ_CAROUSEL_CUSTOM_STRATEGIES` | 提供用户自定义的切换效果 | `CarouselStrategyRegistryItem[]` | - |

### 自定义切换效果

从 `7.5.0` 版本开始，你可以提供自定义的切换效果，切换效果应当继承 `NzCarouselBaseStrategy` 类（默认的两种切换效果同样基于该类）。
