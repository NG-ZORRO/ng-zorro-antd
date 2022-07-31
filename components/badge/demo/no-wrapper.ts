import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-no-wrapper',
  template: `
    <nz-space>
      <nz-switch [(ngModel)]="show"></nz-switch>
      <nz-badge nzStandalone [nzCount]="show ? 25 : 0"></nz-badge>
      <nz-badge
        nzStandalone
        [nzCount]="show ? 4 : 0"
        [nzStyle]="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }"
      ></nz-badge>
      <nz-badge [nzCount]="show ? iconTemplate : 0" nzStandalone>
        <a class="head-example"></a>
      </nz-badge>
      <ng-template #iconTemplate>
        <span nz-icon nzType="clock-circle" class="ant-scroll-number-custom-component" style="color: #f5222d"></span>
      </ng-template>
      <nz-badge nzStandalone [nzCount]="show ? 109 : 0" [nzStyle]="{ backgroundColor: '#52c41a' }"></nz-badge>
    </nz-space>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }
    `
  ]
})
export class NzDemoBadgeNoWrapperComponent {
  show = true;
}
