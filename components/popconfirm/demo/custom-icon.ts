import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  imports: [NzIconModule, NzPopconfirmModule],
  template: `
    <a nz-popconfirm nzPopconfirmTitle="Are you sure?" [nzIcon]="iconTpl">Delete</a>
    <ng-template #iconTpl>
      <span nz-icon nzType="question-circle-o" style="color: red;"></span>
    </ng-template>
  `
})
export class NzDemoPopconfirmCustomIconComponent {}
