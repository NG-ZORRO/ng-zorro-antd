import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-controlled',
  standalone: true,
  imports: [NzPaginationModule],
  template: `<nz-pagination [nzPageIndex]="3" [nzTotal]="50"></nz-pagination>`
})
export class NzDemoPaginationControlledComponent {}
