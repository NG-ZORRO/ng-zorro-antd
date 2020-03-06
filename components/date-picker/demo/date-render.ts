import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-date-render',
  template: `
    <nz-date-picker [nzDateRender]="tplRender"></nz-date-picker>
    <nz-range-picker [nzDateRender]="tplRender"></nz-range-picker>

    <ng-template #tplRender let-current>
      <div class="ant-picker-cell-inner" [class.border]="current.getDate() === 1">
        {{ current.getDate() }}
      </div>
    </ng-template>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
      .border {
        border: 1px solid #1890ff;
        border-radius: 50%;
      }
    `
  ]
})
export class NzDemoDatePickerDateRenderComponent {}
