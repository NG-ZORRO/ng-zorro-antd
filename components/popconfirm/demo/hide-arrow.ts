import { Component } from '@angular/core';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-hide-arrow',
  standalone: true,
  imports: [NzPopconfirmModule],
  template: `<a nz-popconfirm nzPopconfirmTitle="Are you sure?" [nzPopconfirmShowArrow]="false">Delete</a>`
})
export class NzDemoPopconfirmHideArrowComponent {}
