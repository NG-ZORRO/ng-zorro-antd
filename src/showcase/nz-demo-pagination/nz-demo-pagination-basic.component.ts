import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-basic',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationBasicComponent { }
