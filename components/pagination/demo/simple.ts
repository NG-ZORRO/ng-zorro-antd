import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-simple',
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="2" [nzTotal]="50" nzSimple />`
})
export class NzDemoPaginationSimpleComponent {}
