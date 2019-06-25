import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-more',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="500"></nz-pagination>
  `
})
export class NzDemoPaginationMoreComponent {}
