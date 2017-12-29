import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-standalones',
  template: `
    <nz-badge [nzCount]="25" [nzStyle]="style1"></nz-badge>
    <nz-badge [nzCount]="4" [nzStyle]="style2"></nz-badge>
    <nz-badge [nzCount]="109" [nzStyle]="style3"></nz-badge>
  `,
  styles  : [ `
    :host ::ng-deep .ant-badge {
      margin-right: 16px;
    }
  ` ]
})
export class NzDemoBadgeStandAlonesComponent {

  style1 = {};

  style2 = {
    backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'
  };

  style3 = {
    backgroundColor: '#87d068'
  };
}
