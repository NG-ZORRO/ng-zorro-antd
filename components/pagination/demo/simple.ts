import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-simple',
  standalone: true,
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="2" [nzTotal]="50" nzSimple></nz-pagination>`
})
export class NzDemoPaginationSimpleComponent {}
