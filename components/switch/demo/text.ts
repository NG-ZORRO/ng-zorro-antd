import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-text',
  template: `
    <nz-switch [ngModel]="true" nzCheckedChildren="开" nzUnCheckedChildren="关"></nz-switch>
    <br>
    <nz-switch [ngModel]="false" nzCheckedChildren="1" nzUnCheckedChildren="0"></nz-switch>
    <br>
    <nz-switch [ngModel]="true" [nzCheckedChildren]="checkedTemplate" [nzUnCheckedChildren]="unCheckedTemplate"></nz-switch>
    <ng-template #checkedTemplate><i nz-icon type="check"></i></ng-template>
    <ng-template #unCheckedTemplate><i nz-icon type="close"></i></ng-template>
  `,
  styles  : [ `
    nz-switch {
      margin-bottom: 8px;
    }`
  ]
})
export class NzDemoSwitchTextComponent {
}
