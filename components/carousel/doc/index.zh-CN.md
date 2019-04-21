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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAutoPlay]` | 是否自动切换 | `boolean` | `false` |
| `[nzAutoPlaySpeed]` | 切换时间(毫秒)，当设置为0时不切换 | `number` | `3000` |
| `[nzDots]` | 是否显示面板指示点 | `boolean` | `true` |
| `[nzDotRender]` | Dot渲染模板 | `TemplateRef<{ $implicit: number }>` | - |
| `[nzEffect]` | 动画效果函数，可取 scrollx, fade | `'scrollx'｜'fade'` | `'scrollx'` |
| `[nzVertical]` | 垂直显示 | `boolean` | `false` |
| `(nzAfterChange)` | 切换面板的回调 | `EventEmitter<number>` | - |
| `(nzBeforeChange)` | 切换面板的回调 | `EventEmitter<{ from: number; to: number }>` | - |
| `[nzEnableSwipe]` | 是否支持手势划动切换 | `boolean` | `true` |
#### 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板 |
| next() | 切换到下一面板 |
| pre() | 切换到上一面板 |

