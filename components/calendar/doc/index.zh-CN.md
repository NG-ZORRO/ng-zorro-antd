---
category: Components
type: 数据展示
subtitle: 日历
cols: 1
title: Calendar
cover: 'https://gw.alipayobjects.com/zos/antfincdn/dPQmLq08DI/Calendar.svg'
description: 按照日历形式展示数据的容器。
---

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## API

**注意：**Calendar 的部分 locale 来自于 Angular 自身的国际化支持，需要在 `app.config.ts` 文件中 引入相应的 Angular 语言包。

例如：

```typescript
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
```

```html
<nz-calendar
  [nzDateCell]="dateCellTpl"
  [(ngModel)]="selectedDate"
  [(nzMode)]="mode"
  (nzPanelChange)="panelChange($event)"
  (nzSelectChange)="selectChange($event)"
>
  <!-- 定义 Cell 的另一种方式 -->
  <div *dateCell>Foo</div>
</nz-calendar>
<!-- 传入 TemplateRef 的方式 -->
<ng-template #dateCellTpl let-date><span>{{ date | date:'d'}}</span></ng-template>
```

### nz-calendar

| 参数                | 说明                                                         | 类型                                                    | 默认值    |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------- | --------- |
| `[(ngModel)]`       | （可双向绑定）展示日期                                       | `Date`                                                  | 当前日期  |
| `[(nzMode)]`        | （可双向绑定）显示模式                                       | `'month' \| 'year'`                                     | `'month'` |
| `[nzFullscreen]`    | 是否全屏显示                                                 | `boolean`                                               | `true`    |
| `[nzDateCell]`      | （可作为内容）自定义渲染日期单元格，模版内容会被追加到单元格 | `TemplateRef<Date>`                                     | -         |
| `[nzDateFullCell]`  | （可作为内容）自定义渲染日期单元格，模版内容覆盖单元格       | `TemplateRef<Date>`                                     | -         |
| `[nzMonthCell]`     | （可作为内容）自定义渲染月单元格，模版内容会被追加到单元格   | `TemplateRef<Date>`                                     | -         |
| `[nzMonthFullCell]` | （可作为内容）自定义渲染月单元格，模版内容覆盖单元格         | `TemplateRef<Date>`                                     | -         |
| `[nzCustomHeader]`  | 自定义头部内容                                               | `string \| TemplateRef<void>`                           | -         |
| `[nzDisabledDate]`  | 不可选择的日期                                               | `(current: Date) => boolean`                            | -         |
| `(nzPanelChange)`   | 面板变化的回调                                               | `EventEmitter<{ date: Date, mode: 'month' \| 'year' }>` | -         |
| `(nzSelectChange)`  | 选择日期的回调                                               | `EventEmitter<Date>`                                    | -         |
