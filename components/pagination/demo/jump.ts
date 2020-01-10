import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-jump',
  template: `
    <nz-pagination [nzPageIndex]="2" [nzTotal]="500" nzShowQuickJumper></nz-pagination>
    <br />
    <nz-pagination [nzPageIndex]="2" [nzTotal]="500" nzShowQuickJumper nzDisabled></nz-pagination>
  `
})
export class NzDemoPaginationJumpComponent {}
