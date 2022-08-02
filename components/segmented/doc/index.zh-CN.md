---
category: Components
subtitle: 分段控制器
type: 数据展示
title: Segmented
cover: https://gw.alipayobjects.com/zos/bmw-prod/a3ff040f-24ba-43e0-92e9-c845df1612ad.svg
---

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

```ts
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
```

## API

### Segmented

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| `[nzBlock]` | 将宽度调整为父元素宽度的选项 | `boolean` | false |  |
| `[nzDisabled]` | 是否禁用 | `boolean` | false |  |
| `[nzOptions]` | 数据化配置选项内容 | `string[] \| number[] \| Array<{ label: string; value: string \| number; icon: string; disabled?: boolean; useTemplate?: boolean }>` | - |  |
| `[nzSize]` | 控件尺寸 | `large \| default \| small` | - | ✅ |
| `[ngModel]` | 当前选中项目的 index | `number` | - |  |
| `(nzValueChange)` | 当前选中项目变化时触发回调 | `EventEmitter<number>` | - |  |
| `(ngModelChange)` | 当前选中项目变化时触发回调 | `EventEmitter<number>` | - |  |