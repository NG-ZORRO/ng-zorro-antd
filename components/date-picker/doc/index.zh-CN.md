---
category: Components
type: 数据录入
title: DatePicker
subtitle: 日期选择框
cover: https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

```ts
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
```

## API

**注意：** nz-date-picker 的部分 locale 来自于 Angular 自身的[国际化支持](https://angular.io/guide/i18n)，需要在 `app.module.ts` 文件中 引入相应的 Angular 语言包。
例如：
```typescript
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
```

**注意：** 所有输入输出日期对象均为 [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)，你可以通过 [date-fns](https://date-fns.org/) 工具库获得你需要的数据。

### 共同的 API

以下 API 为 nz-date-picker、nz-range-picker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | - |
| `[nzAllowClear]` | 是否显示清除按钮 | `boolean` | `true` | - |
| `[nzAutoFocus]` | 自动获取焦点 | `boolean` | `false` | - |
| `[nzDefaultPickerValue]` | 默认面板日期 | `Date` \| `Date[]` | - | - |
| `[nzDisabled]` | 禁用 | `boolean` | `false` | - |
| `[nzDisabledDate]` | 不可选择的日期 | `(current: Date) => boolean` | - | - |
| `[nzDropdownClassName]` | 额外的弹出日历 className | `string` | - | - |
| `[nzFormat]` | 展示的日期格式，见`nzFormat特别说明` | `string` | - |
| `[nzInputReadOnly]` | 为 input 标签设置只读属性（避免在移动设备上触发小键盘） | `boolean` | `false` | - |
| `[nzLocale]` | 国际化配置 | `object` | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) | - |
| `[nzMode]` | 选择模式 | `'date'` \| `'week'` \| `'month'` \| `'year'` | `'date'` |
| `[nzPlaceHolder]` | 输入框提示文字 | `string` \| '' | - |
| `[nzPopupStyle]` | 额外的弹出日历样式 | `object` | `{}` | - |
| `[nzRenderExtraFooter]` | 在面板中添加额外的页脚 | `TemplateRef \| string \| (() => TemplateRef \| string)` | - |
| `[nzSize]` | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `'large' \| 'small'` | - | - |
| `[nzSuffixIcon]` | 自定义的后缀图标 | `string` \| `TemplateRef` | - | ✅ |
| `[nzBorderless]` | 移除边框 | `boolean` | `false` | - |
| `(nzOnOpenChange)` | 弹出日历和关闭日历的回调 | `EventEmitter<boolean>` | - | - |

### 共同的方法

| 名称 | 描述 |
| ---- | ----------- |
| `open()` | 打开日历弹层 |
| `close()` | 关闭日历弹层 |

### nz-date-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(ngModel)]` | 日期 | `Date` | - |
| `[nzId]` | 组件内部 input 的 id 值 | `string` | - |

### nz-date-picker[nzMode="date"]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDateRender]` | 自定义日期单元格的内容（month-picker/year-picker不支持） | `TemplateRef<Date> \| string \| ((d: Date) => TemplateRef<Date> \| string)` | - | - |
| `[nzDisabledTime]` | 不可选择的时间 | `(current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | - |
| `[nzShowTime]` | 增加时间选择功能 | `object \| boolean` | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzShowToday]` | 是否展示“今天”按钮 | `boolean` | `true` |
| `[nzShowNow]` | 当设定了`nzShowTime`的时候，面板是否显示“此刻”按钮 | `boolean` | `true` |
| `(nzOnOk)` | 点击确定按钮的回调 | `EventEmitter<Date>` | - |


### nz-range-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[(ngModel)]` | 日期 | `Date[]` | - |
| `[nzRanges]` | 预设时间范围快捷选择 | `{ [ key: string ]: Date[] }  \|  { [ key: string ]: () => Date[] }` | - |
| `[nzSeparator]` | 分隔符 | `string` | `'~'` |
| `(nzOnCalendarChange)` | 待选日期发生变化的回调 | `EventEmitter<Date[]>` | - |

### nz-range-picker[nzMode="date"]
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzShowTime]` | 增加时间选择功能 | `object \| boolean` | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzDisabledTime]` | 不可选择的时间 | `(current: Date, partial: 'start' \| 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | - |
| `(nzOnOk)` | 点击确定按钮的回调 | `EventEmitter<Date[]>` | - |

> `nzShowTime` 中当前支持的 `nz-time-picker` 参数有：`nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`

### nzFormat 特别说明

日期格式化目前同时支持两种方式：`DatePipe`（默认，[语法参考](https://angular.io/api/common/DatePipe)） 和 `date-fns`（[语法参考](https://date-fns.org/docs/format#description)，见[`如何使用 date-fns 进行日期格式化`](/docs/i18n/zh#如何使用Date-fns进行日期格式化)）。
