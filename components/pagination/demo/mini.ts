import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-mini',
  template: `
    <nz-pagination [(nzPageIndex)]="current" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
    <br />
    <nz-pagination [(nzPageIndex)]="current" [nzTotal]="50" [nzSize]="'small'" nzShowSizeChanger nzShowQuickJumper></nz-pagination>
    <br />
    <nz-pagination [(nzPageIndex)]="current" [nzTotal]="50" [nzSize]="'small'" [nzShowTotal]="totalTemplate"></nz-pagination>
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
  `
})
export class NzDemoPaginationMiniComponent {
  current = 1;
}
