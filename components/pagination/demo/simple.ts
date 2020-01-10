import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-simple',
  template: `
    <nz-pagination [nzPageIndex]="2" [nzTotal]="50" nzSimple></nz-pagination>
  `
})
export class NzDemoPaginationSimpleComponent {}
