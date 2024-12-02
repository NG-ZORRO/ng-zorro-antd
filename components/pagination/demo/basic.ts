import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-basic',
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>`
})
export class NzDemoPaginationBasicComponent {}
