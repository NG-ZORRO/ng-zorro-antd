import { Component } from '@angular/core';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nz-demo-pagination-total',
  imports: [NzPaginationModule],
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="totalTemplate" />
    <br />
    <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="rangeTemplate" />
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>
  `
})
export class NzDemoPaginationTotalComponent {}
