import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-mini',
  template: `
    <nz-pagination [(nzPageIndex)]="_current" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
    <br>
    <nz-pagination [(nzPageIndex)]="_current" [nzTotal]="50" [nzSize]="'small'" nzShowSizeChanger nzShowQuickJumper></nz-pagination>
    <br>
    <nz-pagination [(nzPageIndex)]="_current" [nzTotal]="50" [nzSize]="'small'" nzShowTotal></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationMiniComponent {
  _current = 1;
}
