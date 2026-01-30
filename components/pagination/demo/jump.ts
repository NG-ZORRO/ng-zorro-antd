import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-jump',
  imports: [NzPaginationModule],
  template: `
    <nz-pagination [nzPageIndex]="2" [nzTotal]="500" nzShowQuickJumper />
    <br />
    <nz-pagination [nzPageIndex]="2" [nzTotal]="500" nzShowQuickJumper nzDisabled />
  `
})
export class NzDemoPaginationJumpComponent {}
