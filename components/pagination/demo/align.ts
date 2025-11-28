import { Component } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-align',
  imports: [NzPaginationModule, NzFlexModule],
  template: `
    <div nz-flex nzVertical nzGap="2rem">
      <nz-pagination [nzPageIndex]="1" [nzTotal]="50" nzAlign="start" />
      <nz-pagination [nzPageIndex]="1" [nzTotal]="50" nzAlign="center" />
      <nz-pagination [nzPageIndex]="1" [nzTotal]="50" nzAlign="end" />
    </div>
  `
})
export class NzDemoPaginationAlignComponent {}
