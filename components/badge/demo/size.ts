import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'nz-demo-badge-size',
  imports: [NzBadgeModule],
  template: `
    <nz-badge nzSize="default" [nzCount]="5">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge nzSize="small" [nzCount]="5">
      <a class="head-example"></a>
    </nz-badge>
  `,
  styles: `
    nz-badge {
      margin-right: 20px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 4px;
      background: #eee;
      display: inline-block;
      vertical-align: middle;
    }
  `
})
export class NzDemoBadgeSizeComponent {}
