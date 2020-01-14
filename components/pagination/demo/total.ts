import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-total',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="totalTemplate"></nz-pagination>
    <br />
    <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="rangeTemplate"></nz-pagination>
    <ng-template #totalTemplate let-total> Total {{ total }} items </ng-template>
    <ng-template #rangeTemplate let-range="range" let-total> {{ range[0] }}-{{ range[1] }} of {{ total }} items </ng-template>
  `
})
export class NzDemoPaginationTotalComponent {}
