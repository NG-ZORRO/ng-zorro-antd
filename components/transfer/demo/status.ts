import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-transfer-status',
  template: `
    <nz-space nzDirection="vertical">
      <nz-transfer *nzSpaceItem [nzDataSource]="[]" nzStatus="error"></nz-transfer>
      <nz-transfer *nzSpaceItem [nzDataSource]="[]" nzStatus="warning" nzShowSearch></nz-transfer>
    </nz-space>
  `
})
export class NzDemoTransferStatusComponent {}
