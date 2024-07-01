import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-text',
  template: `
    <nz-switch [ngModel]="true" nzCheckedChildren="开" nzUnCheckedChildren="关"></nz-switch>
    <br />
    <br />
    <nz-switch [ngModel]="false" nzCheckedChildren="1" nzUnCheckedChildren="0"></nz-switch>
    <br />
    <br />
    <nz-switch
      [ngModel]="true"
      [nzCheckedChildren]="checkedTemplate"
      [nzUnCheckedChildren]="unCheckedTemplate"
    ></nz-switch>
    <ng-template #checkedTemplate><span nz-icon nzType="check"></span></ng-template>
    <ng-template #unCheckedTemplate><span nz-icon nzType="close"></span></ng-template>
  `
})
export class NzDemoSwitchTextComponent {}
