import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-changer',
  template: `
    <nz-pagination [nzPageIndex]="3" [nzTotal]="500" nzShowSizeChanger [nzPageSize]="10"></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationChangerComponent {
}
