import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-prefix',
  template: `
    <nz-input-number-group nzPrefix="￥">
      <nz-input-number [ngModel]="value"></nz-input-number>
    </nz-input-number-group>
    <br />
    <br />
    <nz-input-number-group [nzAddOnBefore]="icon" nzPrefix="￥">
      <nz-input-number [ngModel]="value"></nz-input-number>
      <ng-template #icon><i nz-icon nzType="user" nzTheme="outline"></i></ng-template>
    </nz-input-number-group>
    <br />
    <br />
    <nz-input-number-group nzPrefix="￥">
      <nz-input-number nzDisabled></nz-input-number>
    </nz-input-number-group>
  `,
  styles: [
    `
      nz-input-number-group {
        width: 100%;
      }
    `
  ]
})
export class NzDemoInputNumberPrefixComponent {
  value = null;
}
