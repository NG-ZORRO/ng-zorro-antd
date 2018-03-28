import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-date-render',
  template: `
    <nz-date-picker
      [nzDateRender]="tplRender"
    ></nz-date-picker>
    <nz-range-picker
      [nzDateRender]="getRangeRender.bind(this)"
    ></nz-range-picker>

    <ng-template #tplRender let-current>
      <div class="ant-calendar-date" [ngStyle]="current.getDate() === 1 ? { border: '1px solid #1890ff', 'border-radius': '50%' } : null">
        {{ current.getDate() }}
      </div>
    </ng-template>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerDateRenderComponent {
  @ViewChild('tplRender') tplRender;

  getRangeRender(current: CandyDate): TemplateRef<CandyDate> {
    // console.log('getRangeRender: ', current);
    return this.tplRender;
  }
}
