import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-total',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="80" nzShowTotal [nzPageSize]="20"></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationTotalComponent { }
