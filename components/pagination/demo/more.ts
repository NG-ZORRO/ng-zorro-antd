import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-more',
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="1" [nzTotal]="500"></nz-pagination>`
})
export class NzDemoPaginationMoreComponent {}
