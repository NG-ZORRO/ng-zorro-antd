import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-changer',
  imports: [NzPaginationModule],
  template: `
    <nz-pagination [nzPageIndex]="3" [nzTotal]="500" nzShowSizeChanger [nzPageSize]="10" />
    <br />
    <nz-pagination [nzPageIndex]="3" [nzTotal]="500" nzShowSizeChanger [nzPageSize]="10" nzDisabled />
  `
})
export class NzDemoPaginationChangerComponent {}
