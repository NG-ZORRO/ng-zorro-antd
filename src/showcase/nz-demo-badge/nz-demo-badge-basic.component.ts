import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-basic',
  template: `
    <nz-badge [nzCount]="5">
      <ng-template #content>
        <a class="head-example"></a>
      </ng-template>
    </nz-badge>
  `,
  styles  : [ `
    :host ::ng-deep .ant-badge {
      margin-right: 16px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 6px;
      background: #eee;
      display: inline-block;
    }
  ` ]
})
export class NzDemoBadgeBasicComponent { }
