import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-badge-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-badge [nzCount]="5">
      <ng-template #content>
        <a class="head-example"></a>
      </ng-template>
    </nz-badge>
  `,
  styles       : [ `
    .ant-badge:not(.ant-badge-status) {
      margin-right: 20px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 4px;
      background: #eee;
      display: inline-block;
    }
  ` ]
})
export class NzDemoBadgeBasicComponent {
}
