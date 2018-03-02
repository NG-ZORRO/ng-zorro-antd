---
category: Components
subtitle: 徽标数
type: Data Display
title: Badge
---

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## API

```html
<nz-badge [nzCount]="5">
  <a class="head-example"></a>
</nz-badge>
```

```html
<nz-badge [nzCount]="5"></nz-badge>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzCount | 展示的数字，大于 nzOverflowCount 时显示为 `${nzOverflowCount}+`，为 0 时隐藏 | number |  |
| nzDot | 不展示数字，只有一个小红点 | boolean | false |
| nzOverflowCount | 展示封顶的数字值 | number | 99 |
| nzShowZero | 当数值为 0 时，是否展示 Badge | boolean | false |
| nzStatus | 设置 `nz-badge` 为状态点 | Enum{ 'success', 'processing', 'default', 'error', 'warning' } | '' |
| nzText | 在设置了 `nzStatus` 的前提下有效，设置状态点的文本 | string | '' |
