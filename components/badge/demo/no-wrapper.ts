import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-no-wrapper',
  template: `
    <nz-badge nzStandalone [nzCount]="25"></nz-badge>
    <nz-badge
      nzStandalone
      [nzCount]="4"
      [nzStyle]="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }"
    ></nz-badge>
    <nz-badge nzStandalone [nzCount]="109" [nzStyle]="{ backgroundColor: '#52c41a' }"></nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }
    `
  ]
})
export class NzDemoBadgeNoWrapperComponent {}
