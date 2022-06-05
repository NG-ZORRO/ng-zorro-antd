import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  template: `
    <a nz-popconfirm nzPopconfirmTitle="Are you sure?" [nzIcon]="iconTpl">Delete</a>
    <ng-template #iconTpl>
      <span nz-icon nzType="question-circle-o" style="color: red;"></span>
    </ng-template>
  `
})
export class NzDemoPopconfirmCustomIconComponent {}
