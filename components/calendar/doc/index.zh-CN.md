---
category: Components
type: Data Display
subtitle: 日历
cols: 1
title: Calendar
---

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## API

**注意：**Calendar 的部分 locale 来自于 Angular 自身的[国际化支持](https://angular.io/guide/i18n)，需要在 `main.ts`文件中 引入相应的 Angular 语言包。

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
  [(nzMode)]="mode">
  <!-- 定义 Cell 的另一种方式 -->
  <div *dateCell>Foo</div>
</nz-calendar>
<!-- 传入 TemplateRef 的方式 -->
<ng-template #dateCellTpl>Bar</ng-template>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ngModel | （可双向绑定）展示日期 | `Date` | 当前日期 |
| nzValue | （可双向绑定）同 `ngModel`，用于非表单场景 | `Date` | 当前日期 |
| nzMode | （可双向绑定）显示模式 | `'month'/'year'` | `'month'` |
| nzFullscreen | 是否全屏显示 | `boolean` | `true` |
| nzCard | 是否不全屏显示 | `boolean` | `false` |
| nzDateCell | （可作为内容）自定义渲染日期单元格，模版内容会被追加到单元格 | `TemplateRef<Date>` | 无 |
| nzDateFullCell | （可作为内容）自定义渲染日期单元格，模版内容覆盖单元格 | `TemplateRef<Date>` | 无 |
| nzMonthCell | （可作为内容）自定义渲染月单元格，模版内容会被追加到单元格 | `TemplateRef<Date>` | 无 |
| nzMonthFullCell | （可作为内容）自定义渲染月单元格，模版内容覆盖单元格 | `TemplateRef<Date>` | 无 |
