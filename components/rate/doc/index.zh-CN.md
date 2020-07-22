---
category: Components
subtitle: 评分
type: 数据录入
title: Rate
cover: https://gw.alipayobjects.com/zos/alicdn/R5uiIWmxe/Rate.svg
---

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

```ts
import { NzRateModule } from 'ng-zorro-antd/rate';
```

## API

### nz-rate

| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --- | --- | --- | --- | --- |
| `[nzAllowClear]` | 是否允许再次点击后清除 | `boolean` | `true` | ✅ |
| `[nzAllowHalf]` | 是否允许半选 | `boolean` | `false` | ✅ |
| `[nzAutoFocus]` | 自动获取焦点 | `boolean` | `false` |
| `[nzCharacter]` | 自定义字符 | `TemplateRef<void>` | `<i nz-icon nzType="star"></i>` |
| `[nzCount]` | star 总数 | `number` | `5` |
| `[nzDisabled]` | 只读，无法进行交互 | `boolean` | `false` |
| `[nzTooltips]` | 自定义每项的提示信息 | `string[]` | `[]` |
| `[ngModel]` | 当前数，可以双向绑定 | `number` | `0` |
| `(ngModelChange)` | 当前数改变时的回调 | `EventEmitter<number>` | - |
| `(nzOnBlur)` | 失去焦点时的回调 | `EventEmitter<FocusEvent>` | - |
| `(nzOnFocus)` | 获取焦点时的回调 | `EventEmitter<FocusEvent>` | - |
| `(nzOnHoverChange)` | 鼠标经过时数值变化的回调 | `EventEmitter<number>` | - |
| `(nzOnKeyDown)` | 按键回调 | `EventEmitter<KeyboardEvent>` | - |

#### 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
