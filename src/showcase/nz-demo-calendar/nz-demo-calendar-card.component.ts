import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-card',
  template: `
    <nz-calendar [nzLocale]="'zh-cn'" [nzFullScreen]="false" style="width: 290px; border: 1px solid rgb(217, 217, 217); border-radius: 4px;"></nz-calendar>`,
  styles  : []
})
export class NzDemoCalendarCardComponent { }
