---
category: Components
type: 数据录入
title: DatePicker
subtitle: 日期选择框
cover: 'https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg'
description: 输入或选择日期的控件。
---

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

**注意：** nz-date-picker 的部分 locale 来自于 Angular 自身的[国际化支持](https://angular.cn/guide/i18n)
，需要在 `app.config.ts` 文件中 引入相应的 Angular 语言包。
例如：

```typescript
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);
```

**注意：**
所有输入输出日期对象均为 [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
，你可以通过 [date-fns](https://date-fns.org/) 工具库获得你需要的数据。

### 共同的 API

以下 API 为 nz-date-picker、nz-range-picker 共享的 API。

| 参数                     | 说明                                                          | 类型                                                       | 默认值                                                                                                      | 全局配置 | 版本   |
| ------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ------ |
| `[nzId]`                 | 组件内部 input 的 id 值                                       | `string`                                                   | -                                                                                                           |
| `[nzAllowClear]`         | 是否显示清除按钮                                              | `boolean`                                                  | `true`                                                                                                      | -        |
| `[nzAutoFocus]`          | 自动获取焦点                                                  | `boolean`                                                  | `false`                                                                                                     | -        |
| `[nzBackdrop]`           | 浮层是否应带有背景板                                          | `boolean`                                                  | `false`                                                                                                     |
| `[nzDefaultPickerValue]` | 默认面板日期                                                  | `Date \| Date[]`                                           | -                                                                                                           | -        |
| `[nzDisabled]`           | 禁用                                                          | `boolean`                                                  | `false`                                                                                                     | -        |
| `[nzDisabledDate]`       | 不可选择的日期                                                | `(current: Date) => boolean`                               | -                                                                                                           | -        |
| `[nzDropdownClassName]`  | 额外的弹出日历 className                                      | `string`                                                   | -                                                                                                           | -        |
| `[nzFormat]`             | 展示的日期格式，见`nzFormat特别说明`                          | `string`                                                   | -                                                                                                           |
| `[nzInputReadOnly]`      | 为 input 标签设置只读属性（避免在移动设备上触发小键盘）       | `boolean`                                                  | `false`                                                                                                     | -        |
| `[nzLocale]`             | 国际化配置                                                    | `object`                                                   | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) | -        |
| `[nzMode]`               | 选择模式                                                      | `'date' \| 'week' \| 'month' \| 'quarter'  \| 'year'`      | `'date'`                                                                                                    |
| `[nzPlaceHolder]`        | 输入框提示文字                                                | `string \| string[]`                                       | -                                                                                                           | -        |
| `[nzPopupStyle]`         | 额外的弹出日历样式                                            | `object`                                                   | `{}`                                                                                                        | -        |
| `[nzRenderExtraFooter]`  | 在面板中添加额外的页脚                                        | `TemplateRef \| string \| (() => TemplateRef \| string)`   | -                                                                                                           |
| `[nzSize]`               | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `'large' \| 'small'`                                       | -                                                                                                           | -        |
| `[nzStatus]`             | 设置校验状态                                                  | `'error' \| 'warning'`                                     | -                                                                                                           |
| `[nzPlacement]`          | 选择框弹出的位置                                              | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'`                                                                                              |          |
| `[nzSuffixIcon]`         | 自定义的后缀图标                                              | `string \| TemplateRef`                                    | -                                                                                                           | ✅       |
| `[nzVariant]`            | 形态变体                                                      | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`   | `'outlined'`                                                                                                | ✅       | 20.0.0 |
| `[nzInline]`             | 内联模式                                                      | `boolean`                                                  | `false`                                                                                                     | -        |
| `(nzOnOpenChange)`       | 弹出日历和关闭日历的回调                                      | `EventEmitter<boolean>`                                    | -                                                                                                           | -        |
| `(nzOnPanelChange)`      | 改变模式或日期的回调                                          | `EventEmitter<NzPanelChangeType>`                          | -                                                                                                           | -        |

### 共同的方法

| 名称      | 描述         |
| --------- | ------------ |
| `open()`  | 打开日历弹层 |
| `close()` | 关闭日历弹层 |

### nz-date-picker

| 参数          | 说明 | 类型   | 默认值 |
| ------------- | ---- | ------ | ------ |
| `[(ngModel)]` | 日期 | `Date` | -      |

### nz-date-picker[nzMode="date"]

| 参数                 | 说明                                                           | 类型                                                                           | 默认值                                               |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `[nzDateRender]`     | 自定义日期单元格的内容（month-picker/year-picker 不支持）      | `TemplateRef<Date> \| string \| ((d: Date) => TemplateRef<Date> \| string)`    | -                                                    |
| `[nzDisabledTime]`   | 不可选择的时间                                                 | `(current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | -                                                    |
| `[nzShowTime]`       | 增加时间选择功能                                               | `object \| boolean`                                                            | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzShowToday]`      | 是否展示“今天”按钮                                             | `boolean`                                                                      | `true`                                               |
| `[nzShowNow]`        | 当设定了`nzShowTime`的时候，面板是否显示“此刻”按钮             | `boolean`                                                                      | `true`                                               |
| `[nzShowWeekNumber]` | 是否在每一行显示周数（仅日期选择器支持。周选择器始终显示周数） | `boolean`                                                                      | `false`                                              |
| `(nzOnOk)`           | 点击确定按钮的回调                                             | `EventEmitter<Date>`                                                           | -                                                    |

### nz-range-picker

| 参数                   | 说明                   | 类型                                                               | 默认值 |
| ---------------------- | ---------------------- | ------------------------------------------------------------------ | ------ |
| `[(ngModel)]`          | 日期                   | `Date[]`                                                           | -      |
| `[nzRanges]`           | 预设时间范围快捷选择   | `{ [ key: string ]: Date[] } \| { [ key: string ]: () => Date[] }` | -      |
| `[nzSeparator]`        | 分隔符                 | `string \| TemplateRef`                                            | `'~'`  |
| `(nzOnCalendarChange)` | 待选日期发生变化的回调 | `EventEmitter<Date[]>`                                             | -      |

### nz-range-picker[nzMode="date"]

| 参数                 | 说明                                                           | 类型                                                                                                      | 默认值                                               |
| -------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `[nzShowTime]`       | 增加时间选择功能                                               | `object \| boolean`                                                                                       | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzDisabledTime]`   | 不可选择的时间                                                 | `(current: Date, partial: 'start' \| 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | -                                                    |
| `[nzShowWeekNumber]` | 是否在每一行显示周数（仅日期选择器支持。周选择器始终显示周数） | `boolean`                                                                                                 | `false`                                              |
| `(nzOnOk)`           | 点击确定按钮的回调                                             | `EventEmitter<Date[]>`                                                                                    | -                                                    |

> `nzShowTime` 中当前支持的 `nz-time-picker`
> 参数有：`nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`

### 伊斯兰历选择器

`nz-hijri-date-picker` 是基于乌姆库拉（Umm al-Qura）伊斯兰历的日期选择器。面板中的年、月、日均为伊斯兰历，
而绑定值仍然是原生 `Date`，因此可以直接替换 `nz-date-picker`，上述 API 全部通用。
相关组件包含在 `NzDatePickerModule` 中，无需引入额外的模块。

```typescript
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
```

```html
<nz-hijri-date-picker [(ngModel)]="date" />
<nz-hijri-range-picker [(ngModel)]="range" />
<nz-hijri-date-picker nzMode="month" [(ngModel)]="date" />
```

包含的组件有 `nz-hijri-date-picker`、`nz-hijri-range-picker`、`nz-hijri-month-picker`、
`nz-hijri-quarter-picker`、`nz-hijri-week-picker` 和 `nz-hijri-year-picker`。

#### 格式化

`nzFormat` 与 `nz-date-picker` 使用同一套占位符，其中的日期部分会按伊斯兰历解析。
星期和时间占位符（`E`、`HH`、`mm`、`ss`、`a`）与历法无关，仍由 date-fns 处理。

| 占位符 | 输出                 | 示例   |
| ------ | -------------------- | ------ |
| `yyyy` | 四位伊斯兰历年份     | `1447` |
| `yy`   | 两位伊斯兰历年份     | `47`   |
| `MMMM` | 伊斯兰历月份全称     | رمضان  |
| `MMM`  | 伊斯兰历月份简称     | Ram    |
| `MM`   | 两位伊斯兰历月份数字 | `09`   |
| `M`    | 伊斯兰历月份数字     | `9`    |
| `dd`   | 两位伊斯兰历日期     | `03`   |
| `d`    | 伊斯兰历日期         | `3`    |
| `Q`    | 伊斯兰历季度         | `3`    |
| `ww`   | 伊斯兰历年内周数     | `36`   |

月份名称来自当前语言包的 `DatePicker.lang.hijriMonths` 与 `DatePicker.lang.shortHijriMonths`。
尚未翻译的语言包会与其他缺失的翻译一样回退到 `en_US`。

#### 月份修正

各地实际观月的结果可能与乌姆库拉历表不同。通过 `NZ_HIJRI_MONTH_OVERRIDES` 可以修改单个月份的天数，
其后的所有月份会顺延相同的天数。

```typescript
import { NZ_HIJRI_MONTH_OVERRIDES } from 'ng-zorro-antd/date-picker';

providers: [{ provide: NZ_HIJRI_MONTH_OVERRIDES, useValue: [{ year: 1447, month: 9, days: 29 }] }];
```

如果修正值需要在运行时获取（例如来自后端配置），可以提供一个 signal 或任意取值函数。
每次日期换算都会重新读取，因此下一次渲染即可生效。

```typescript
const overrides = signal<NzHijriMonthOverride[]>([]);

providers: [{ provide: NZ_HIJRI_MONTH_OVERRIDES, useValue: overrides }];
```

支持的范围为伊斯兰历 1343 年至 1500 年（公历 1924 年至 2077 年）。

#### 全局使用伊斯兰历

如果希望所有日期相关组件都使用伊斯兰历，可以在应用级别提供日期适配器，而不使用上述组件：

```typescript
import { provideNzHijriDateAdapter } from 'ng-zorro-antd/date-picker';

export const appConfig: ApplicationConfig = {
  providers: [provideNzHijriDateAdapter()]
};
```

## FAQ

### 如何在 Date-Picker 中使用自定义日期库

参考 [日期适配器](/docs/date-adapter/zh)。

### 滚动时浮层元素没有跟随滚动位置

默认情况下，浮层元素使用 `body` 作为滚动容器，如果使用了其他滚动容器，在自定义滚动容器元素上添加 [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) 指令。
注意：您需要从 `@angular/cdk/scrolling` 导入 `CdkScrollable` 指令或 `ScrollingModule` 模块。
