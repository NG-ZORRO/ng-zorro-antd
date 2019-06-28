import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-controlled',
  template: `
    <nz-pagination [nzPageIndex]="3" [nzTotal]="50"></nz-pagination>
  `
})
export class NzDemoPaginationControlledComponent {}
