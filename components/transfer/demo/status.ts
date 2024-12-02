import { Component } from '@angular/core';

import { NzTransferModule } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-status',
  imports: [NzTransferModule],
  template: `
    <nz-transfer [nzDataSource]="[]" nzStatus="error"></nz-transfer>
    <br />
    <nz-transfer [nzDataSource]="[]" nzStatus="warning" nzShowSearch></nz-transfer>
  `
})
export class NzDemoTransferStatusComponent {}
