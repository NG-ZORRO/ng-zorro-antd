import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-date-render',
  imports: [NzDatePickerModule],
  template: `
    <nz-date-picker [nzDateRender]="tplRender" />
    <nz-range-picker [nzDateRender]="tplRender" />

    <ng-template #tplRender let-current>
      <div class="ant-picker-cell-inner" [class.border]="current.getDate() === 1"> {{ current.getDate() }} </div>
    </ng-template>

    <br />
    <nz-date-picker nzMode="quarter" nzFormat="yyyy年Q季度" [nzDateRender]="tplQuarterRender" />
    <ng-template #tplQuarterRender let-current>
      <div class="ant-picker-cell-inner">{{ getQuarter(current) }}</div>
    </ng-template>
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
    .border {
      border: 1px solid #1890ff;
      border-radius: 50%;
    }
  `
})
export class NzDemoDatePickerDateRenderComponent {
  getQuarter(date: Date): string {
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    const quarterMapper: Record<string, string> = { 1: '一', 2: '二', 3: '三', 4: '四' };
    return `${quarterMapper[quarter]}季度`;
  }
}
