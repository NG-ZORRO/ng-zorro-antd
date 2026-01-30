import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-controlled',
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="3" [nzTotal]="50" />`
})
export class NzDemoPaginationControlledComponent {}
