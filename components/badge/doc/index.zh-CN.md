---
category: Components
subtitle: 徽标数
type: 数据展示
title: Badge
---

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzBadgeModule } from 'ng-zorro-antd/badge';
```

## API

```html
<nz-badge [nzCount]="5">
  <a class="head-example"></a>
</nz-badge>
```

```html
<nz-badge [nzCount]="5"></nz-badge>
```

### nz-badge

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzColor]` | 自定义小圆点的颜色 | string | - | ✅ |
| `[nzCount]` | 展示的数字，大于 nzOverflowCount 时显示为 `${nzOverflowCount}+`，为 0 时隐藏 | `number \| TemplateRef<void>` | - |
| `[nzDot]` | 不展示数字，只有一个小红点 | `boolean` | `false` |
| `[nzShowDot]` | 是否展示小红点 | `boolean` | `true` |
| `[nzOverflowCount]` | 展示封顶的数字值 | `number` | `99` | ✅ |
| `[nzShowZero]` | 当数值为 0 时，是否展示 Badge | `boolean` | `false` |
| `[nzStatus]` | 设置 `nz-badge` 为状态点 | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `[nzText]` | 在设置了 `nzStatus` 的前提下有效，设置状态点的文本 | `string` | - |
| `[nzTitle]` | 设置鼠标放在状态点上时显示的文字（非独立使用时) | `string` | `nzCount` |
| `[nzOffset]` | 设置状态点的位置偏移，格式为 [x, y] (非独立使用时) | `[number, number]` | - |
