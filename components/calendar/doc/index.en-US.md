---
category: Components
type: Data Display
cols: 1
title: Calendar
cover: 'https://gw.alipayobjects.com/zos/antfincdn/dPQmLq08DI/Calendar.svg'
description: Container for displaying data in calendar form.
---

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

## API

**Note:** Some of Calendar's locale are coming from [Angular i18n](https://angular.dev/guide/i18n), that should be provided in the file `app.config.ts`.

For example:

```typescript
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
```

```html
<nz-calendar
  [nzDateCell]="dateCellTpl"
  [(ngModel)]="selectedDate"
  [(nzMode)]="mode"
  (nzPanelChange)="panelChange($event)"
  (nzSelectChange)="selectChange($event)"
>
  <!-- Another method for cell definition -->
  <div *nzDateCell>Foo</div>
</nz-calendar>
<!-- Passing TemplateRef -->
<ng-template #dateCellTpl let-date><span>{{ date | date:'d'}}</span></ng-template>
```

### nz-calendar

| Property            | Description                                                                                              | Type                                                    | Default      |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------ |
| `[(ngModel)]`       | (Two-way bindable) The current selected date                                                             | `Date`                                                  | current date |
| `[(nzMode)]`        | The display mode of the calendar (two-way bindable)                                                      | `'month' \| 'year'`                                     | `'month'`    |
| `[nzFullscreen]`    | Whether to display in full-screen                                                                        | `boolean`                                               | `true`       |
| `[nzDateCell]`      | (Contentable) Customize the display of the date cell, the template content will be appended to the cell  | `TemplateRef<Date>`                                     | -            |
| `[nzDateFullCell]`  | (Contentable) Customize the display of the date cell, the template content will override the cell        | `TemplateRef<Date>`                                     | -            |
| `[nzMonthCell]`     | (Contentable) Customize the display of the month cell, the template content will be appended to the cell | `TemplateRef<Date>`                                     | -            |
| `[nzMonthFullCell]` | (Contentable) Customize the display of the month cell, the template content will override the cell       | `TemplateRef<Date>`                                     | -            |
| `[nzCustomHeader]`  | Render custom header in panel                                                                            | `string \| TemplateRef<void>`                           | -            |
| `[nzDisabledDate]`  | specify the date that cannot be selected                                                                 | `(current: Date) => boolean`                            | -            |
| `(nzPanelChange)`   | Callback for when panel changes                                                                          | `EventEmitter<{ date: Date, mode: 'month' \| 'year' }>` | -            |
| `(nzSelectChange)`  | A callback function of selected item                                                                     | `EventEmitter<Date>`                                    | -            |
