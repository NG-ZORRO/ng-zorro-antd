import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  template: `
    <a nz-popconfirm nzPopconfirmTitle="Are you sure?" [nzIcon]="iconTpl">Delete</a>
    <ng-template #iconTpl>
      <i nz-icon nzType="question-circle-o" style="color: red;"></i>
    </ng-template>
  `
})
export class NzDemoPopconfirmCustomIconComponent {}
