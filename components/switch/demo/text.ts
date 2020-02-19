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
    <nz-switch [ngModel]="true" [nzCheckedChildren]="checkedTemplate" [nzUnCheckedChildren]="unCheckedTemplate"></nz-switch>
    <ng-template #checkedTemplate><i nz-icon nzType="check"></i></ng-template>
    <ng-template #unCheckedTemplate><i nz-icon nzType="close"></i></ng-template>
  `
})
export class NzDemoSwitchTextComponent {}
