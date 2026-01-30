import { Component } from '@angular/core';

import { NzTransferModule } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-status',
  imports: [NzTransferModule],
  template: `
    <nz-transfer [nzDataSource]="[]" nzStatus="error" />
    <br />
    <nz-transfer [nzDataSource]="[]" nzStatus="warning" nzShowSearch />
  `
})
export class NzDemoTransferStatusComponent {}
